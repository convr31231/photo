import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './BeforeAfter.module.css';
import { images } from '../data/content';
import { clamp } from '../utils/pricing';
import { Reveal } from '../components/Reveal';

export function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const [width, setWidth] = useState(0);
  const dragging = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const update = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(clamp(next, 4, 96));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    update(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    update(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <section className={`section ${styles.section}`} aria-labelledby="ba-title">
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">Сравнение</p>
          <h2 id="ba-title" className="editorial-title">
            До / После
          </h2>
          <p className="lead">Проведите разделитель, чтобы увидеть разницу в свете и обработке.</p>
        </Reveal>

        <Reveal delay={100}>
          <div
            ref={wrapRef}
            className={styles.slider}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role="img"
            aria-label="Сравнение фотографий до и после. Перетащите разделитель."
          >
            <img src={images.beforeAfter.after} alt="После обработки" className={styles.after} draggable={false} />
            <div className={styles.beforeClip} style={{ width: `${pos}%` }}>
              <img
                src={images.beforeAfter.before}
                alt="До обработки"
                className={styles.before}
                style={{ width: width ? `${width}px` : '100%' }}
                draggable={false}
              />
            </div>
            <div className={styles.handle} style={{ left: `${pos}%` }}>
              <span className={styles.line} />
              <span className={styles.knob} aria-hidden="true">
                ‹ ›
              </span>
            </div>
            <span className={styles.labelLeft}>До</span>
            <span className={styles.labelRight}>После</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
