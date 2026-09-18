import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import { heroNav, images } from '../data/content';
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { useCursorContext } from '../hooks/useAppContext';

interface HeroProps {
  ready: boolean;
}

export function Hero({ ready }: HeroProps) {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const { setCursor, resetCursor, enabled } = useCursorContext();
  const rootRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [auto, setAuto] = useState(0);

  useEffect(() => {
    if (!isMobile || reduced) return;
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.008;
      setAuto(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, reduced]);

  const onMove = (e: React.MouseEvent) => {
    if (isMobile || reduced || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  };

  const parallaxX = isMobile ? Math.sin(auto) * 12 : mouse.x * 28;
  const parallaxY = isMobile ? Math.cos(auto * 0.8) * 10 : mouse.y * 20;
  const textX = isMobile ? Math.sin(auto * 0.6) * 6 : mouse.x * -14;
  const textY = isMobile ? Math.cos(auto * 0.5) * 4 : mouse.y * -10;
  const overlayOpacity = isMobile
    ? 0.25 + Math.sin(auto) * 0.1
    : 0.15 + Math.abs(mouse.x) * 0.45 + Math.abs(mouse.y) * 0.25;

  return (
    <section
      id="top"
      ref={rootRef}
      className={styles.hero}
      onMouseMove={onMove}
      onMouseEnter={() => enabled && setCursor('смотреть')}
      onMouseLeave={() => {
        resetCursor();
        setMouse({ x: 0, y: 0 });
      }}
      aria-label="Главный экран"
    >
      <div className={styles.media}>
        <motion.img
          src={isMobile ? images.hero.mobile : images.hero.main}
          alt="Интерьер фотостудии ШАБЛОН"
          className={styles.image}
          style={{
            transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0) scale(1.08)`,
          }}
          initial={ready ? false : { opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1.08 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          loading="eager"
          fetchPriority="high"
        />
        <img
          src={images.hero.overlay}
          alt=""
          aria-hidden="true"
          className={styles.overlayImage}
          style={{
            opacity: overlayOpacity,
            transform: `translate3d(${parallaxX * -0.6}px, ${parallaxY * -0.5}px, 0) scale(1.12)`,
          }}
        />
        <div className={styles.veil} />
      </div>

      <div className={styles.topMeta}>
        <span>МОСКВА · ФОТОСТУДИЯ</span>
        <nav className={styles.miniNav} aria-label="Быстрая навигация">
          {heroNav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <motion.div
        className={styles.center}
        style={{ transform: `translate3d(${textX}px, ${textY}px, 0)` }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className={styles.brand}>ШАБЛОН</h1>
        <p className={styles.tagline}>Фотостудия для историй, которые хочется пересматривать</p>
      </motion.div>

      <motion.div
        className={styles.bottom}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p className={styles.words}>
          <span>Свет.</span>
          <span>Пространство.</span>
          <span>История.</span>
        </p>
        <a href="#studio" className={styles.scroll} aria-label="К разделу о студии">
          <span />
          Смотреть
        </a>
      </motion.div>
    </section>
  );
}
