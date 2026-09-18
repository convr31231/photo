import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}

export function useIsTouch(): boolean {
  const [touch, setTouch] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none), (pointer: coarse)').matches;
  });

  useEffect(() => {
    const mql = window.matchMedia('(hover: none), (pointer: coarse)');
    const onChange = () => setTouch(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return touch;
}
