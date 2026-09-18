import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Reviews.module.css';
import { reviews } from '../data/content';
import { Reveal } from '../components/Reveal';

export function Reviews() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((i) => (i + 1) % reviews.length);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="reviews-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Отзывы</p>
          <h2 id="reviews-title" className="sr-only">
            Отзывы клиентов
          </h2>
        </Reveal>

        <div className={styles.slider}>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={review.id}
              className={styles.quote}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
            >
              <p>«{review.text}»</p>
              <footer>
                <cite>{review.author}</cite>
                <span>{review.role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className={styles.nav}>
            <button type="button" onClick={prev} aria-label="Предыдущий отзыв">
              ←
            </button>
            <span>
              {String(index + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={next} aria-label="Следующий отзыв">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
