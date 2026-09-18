import { useCallback, useEffect, useState } from 'react';

export type CursorLabel = 'default' | 'смотреть' | 'забронировать' | 'открыть' | 'скрыть';

export function useCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState<CursorLabel>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const setCursor = useCallback((next: CursorLabel) => setLabel(next), []);
  const resetCursor = useCallback(() => setLabel('default'), []);

  return { pos, label, visible, setCursor, resetCursor };
}
