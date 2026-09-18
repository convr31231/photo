import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Blog.module.css';
import { blogPosts, type BlogPost } from '../data/content';
import { Reveal } from '../components/Reveal';
import { useCursorContext } from '../hooks/useAppContext';

export function Blog() {
  const [active, setActive] = useState<BlogPost | null>(null);
  const { setCursor, resetCursor, enabled } = useCursorContext();

  useEffect(() => {
    if (!active) return;
    document.body.classList.add('is-locked');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="blog-title">
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">Идеи</p>
          <h2 id="blog-title" className="editorial-title">
            Идеи для съёмки
          </h2>
        </Reveal>

        <div className={styles.grid}>
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 70} as="article" className={styles.card}>
              <button
                type="button"
                className={styles.cardBtn}
                onClick={() => setActive(post)}
                onMouseEnter={() => enabled && setCursor('открыть')}
                onMouseLeave={() => resetCursor()}
                aria-label={`Читать: ${post.title}`}
              >
                <div className={styles.image}>
                  <img src={post.image} alt="" aria-hidden="true" loading="lazy" />
                </div>
                <div className={styles.meta}>
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-title"
          >
            <button type="button" className={styles.backdrop} onClick={() => setActive(null)} aria-label="Закрыть" />
            <motion.article
              className={styles.article}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <button type="button" className={styles.close} onClick={() => setActive(null)}>
                Закрыть
              </button>
              <img src={active.image} alt="" aria-hidden="true" />
              <p className={styles.articleMeta}>
                {active.category} · {active.readTime}
              </p>
              <h3 id="article-title">{active.title}</h3>
              {active.content.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
