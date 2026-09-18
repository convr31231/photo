import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CursorLabel } from '../hooks/useCursor';
import { useCursor } from '../hooks/useCursor';
import { useIsTouch } from '../hooks/useMediaQuery';

interface CursorContextValue {
  setCursor: (label: CursorLabel) => void;
  resetCursor: () => void;
  enabled: boolean;
  pos: { x: number; y: number };
  label: CursorLabel;
  visible: boolean;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const isTouch = useIsTouch();
  const cursor = useCursor();
  const enabled = !isTouch;

  const value = useMemo(
    () => ({
      setCursor: cursor.setCursor,
      resetCursor: cursor.resetCursor,
      enabled,
      pos: cursor.pos,
      label: cursor.label,
      visible: cursor.visible,
    }),
    [cursor, enabled],
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursorContext() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursorContext must be used within CursorProvider');
  return ctx;
}

interface BookingContextValue {
  open: boolean;
  openBooking: (roomId?: string) => void;
  closeBooking: () => void;
  presetRoomId: string | null;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [presetRoomId, setPresetRoomId] = useState<string | null>(null);

  const openBooking = useCallback((roomId?: string) => {
    setPresetRoomId(roomId ?? null);
    setOpen(true);
    document.body.classList.add('is-locked');
  }, []);

  const closeBooking = useCallback(() => {
    setOpen(false);
    document.body.classList.remove('is-locked');
  }, []);

  const value = useMemo(
    () => ({ open, openBooking, closeBooking, presetRoomId }),
    [open, openBooking, closeBooking, presetRoomId],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
