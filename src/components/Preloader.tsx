import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let alive = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 200 : 1200;
    const t0 = Date.now();

    const tick = window.setInterval(() => {
      if (!alive) return;
      setProgress(Math.min(100, Math.round(((Date.now() - t0) / duration) * 100)));
    }, 40);

    return () => {
      alive = false;
      window.clearInterval(tick);
    };
  }, []);

  return (
    <div className={styles.root} aria-busy="true" aria-label="Загрузка сайта">
      <div className={styles.inner}>
        <p className={styles.brand}>ШАБЛОН</p>
        <p className={styles.counter}>{String(progress).padStart(2, '0')} / 100</p>
        <p className={styles.caption}>Загрузка визуального пространства</p>
        <div className={styles.bar}>
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
