import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Header.module.css';
import { navLinks } from '../data/content';
import { MagneticButton } from './MagneticButton';
import { useBooking } from '../hooks/useAppContext';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', menuOpen);
    return () => document.body.classList.remove('is-locked');
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a href="#top" className={styles.logo} aria-label="ШАБЛОН — на главную">
            ШАБЛОН
          </a>

          <nav className={styles.nav} aria-label="Основная навигация">
            {navLinks.slice(0, 5).map((link) => (
              <a key={link.id} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <MagneticButton
              className={`btn btn--dark ${styles.book}`}
              onClick={() => openBooking()}
              ariaLabel="Забронировать съёмку"
            >
              Бронь
            </MagneticButton>

            <button
              type="button"
              className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className={styles.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Мобильное меню"
          >
            <div className={styles.menuTop}>
              <span className={styles.menuBrand}>ШАБЛОН</span>
              <button type="button" className={styles.menuClose} onClick={closeMenu} aria-label="Закрыть">
                Закрыть
              </button>
            </div>
            <nav className={styles.menuNav}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  className={styles.menuLink}
                  onClick={closeMenu}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <MagneticButton
              className={`btn btn--light ${styles.menuCta}`}
              onClick={() => {
                closeMenu();
                openBooking();
              }}
            >
              Забронировать
            </MagneticButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
