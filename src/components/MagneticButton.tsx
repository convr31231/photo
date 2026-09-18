import { useState, type ReactNode, type MouseEvent } from 'react';
import styles from './MagneticButton.module.css';
import { useIsTouch, usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { useCursorContext } from '../hooks/useAppContext';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  href?: string;
  cursorLabel?: 'забронировать' | 'открыть' | 'смотреть';
  strength?: number;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  href,
  cursorLabel = 'забронировать',
  strength = 0.28,
  ariaLabel,
}: MagneticButtonProps) {
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const { setCursor, resetCursor, enabled } = useCursorContext();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (isTouch || reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * strength, y: y * strength });
  };

  const onLeave = () => {
    setOffset({ x: 0, y: 0 });
    if (enabled) resetCursor();
  };

  const onEnter = () => {
    if (enabled) setCursor(cursorLabel);
  };

  const style = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
  };

  const classes = `${styles.root} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={onEnter}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
