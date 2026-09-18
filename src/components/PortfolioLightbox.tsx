import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './PortfolioLightbox.module.css';
import type { PortfolioItem } from '../data/content';

interface Props {
  items: PortfolioItem[];
  index: number;
  open: boolean;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function PortfolioLightbox({ items, index, open, onClose, onChange }: Props) {
  const item = items[index];

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('is-locked');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [open, index, items.length, onClose, onChange]);

  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          className={styles.root}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр проекта"
        >
          <button type="button" className={styles.backdrop} onClick={onClose} aria-label="Закрыть" />
          <div className={styles.panel}>
            <div className={styles.top}>
              <p>
                <span>{String(index + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
              </p>
              <button type="button" onClick={onClose} aria-label="Закрыть галерею">
                Закрыть
              </button>
            </div>
            <motion.img
              key={item.id}
              src={item.image}
              alt={item.title}
              className={styles.image}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
            />
            <div className={styles.bottom}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
              <div className={styles.nav}>
                <button
                  type="button"
                  aria-label="Предыдущее фото"
                  onClick={() => onChange((index - 1 + items.length) % items.length)}
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Следующее фото"
                  onClick={() => onChange((index + 1) % items.length)}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
