import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Portfolio.module.css';
import {
  portfolio,
  portfolioCategories,
  type PortfolioCategory,
  type PortfolioItem,
} from '../data/content';
import { Reveal } from '../components/Reveal';
import { PortfolioLightbox } from '../components/PortfolioLightbox';
import { useCursorContext } from '../hooks/useAppContext';

export function Portfolio() {
  const [category, setCategory] = useState<PortfolioCategory>('все');
  const [active, setActive] = useState<PortfolioItem | null>(null);
  const { setCursor, resetCursor, enabled } = useCursorContext();

  const items = useMemo(() => {
    if (category === 'все') return portfolio;
    return portfolio.filter((p) => p.category === category);
  }, [category]);

  const activeIndex = active ? items.findIndex((i) => i.id === active.id) : -1;

  return (
    <section id="portfolio" className={`section ${styles.section}`} aria-labelledby="portfolio-title">
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">Портфолио</p>
          <h2 id="portfolio-title" className="display-title">
            Кадры, которые
            <br />
            хочется пересматривать
          </h2>
        </Reveal>

        <div className={styles.filters} role="tablist" aria-label="Категории портфолио">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={category === cat}
              className={`${styles.filter} ${category === cat ? styles.active : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.masonry}>
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                layout
                className={`${styles.item} ${item.span ? styles[item.span] : ''}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.24) }}
                onClick={() => setActive(item)}
                onMouseEnter={() => enabled && setCursor('смотреть')}
                onMouseLeave={() => resetCursor()}
                aria-label={`Открыть проект «${item.title}»`}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className={styles.meta}>
                  <strong>{item.title}</strong>
                  <em>{item.category}</em>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <PortfolioLightbox
        items={items}
        index={activeIndex}
        open={Boolean(active)}
        onClose={() => setActive(null)}
        onChange={(next) => setActive(items[next] ?? null)}
      />
    </section>
  );
}
