import { useEffect, useState, type ReactNode } from 'react';
import styles from './Reveal.module.css';
import { useInView } from '../hooks/useInView';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'p' | 'h2' | 'h3';
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inView) setVisible(true);
  }, [inView]);

  return (
    <Tag
      ref={ref as never}
      className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
