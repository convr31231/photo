import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';
import { useCursorContext } from '../hooks/useAppContext';

const LABELS: Record<string, string> = {
  смотреть: 'СМОТРЕТЬ',
  забронировать: 'ЗАБРОНИРОВАТЬ',
  открыть: 'ОТКРЫТЬ',
};

export function CustomCursor() {
  const { enabled, pos, label, visible } = useCursorContext();
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-custom-cursor');
      return;
    }
    document.documentElement.classList.add('has-custom-cursor');
    return () => document.documentElement.classList.remove('has-custom-cursor');
  }, [enabled]);

  useEffect(() => {
    const el = elRef.current;
    if (!el || !enabled) return;
    el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
  }, [pos, enabled]);

  if (!enabled) return null;

  const expanded = label !== 'default' && label !== 'скрыть';
  const text = LABELS[label] ?? '';

  return (
    <div
      ref={elRef}
      className={`${styles.cursor} ${visible ? styles.visible : ''} ${expanded ? styles.expanded : ''} ${
        label === 'скрыть' ? styles.hidden : ''
      }`}
      aria-hidden="true"
    >
      <span className={styles.dot} />
      {text ? <span className={styles.label}>{text}</span> : null}
    </div>
  );
}
