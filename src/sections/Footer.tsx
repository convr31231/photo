import styles from './Footer.module.css';
import { navLinks, contacts } from '../data/content';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <a href="#top" className={styles.brand} aria-label="ШАБЛОН — наверх">
            ШАБЛОН
          </a>
          <nav aria-label="Навигация в подвале">
            <ul className={styles.nav}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} ШАБЛОН. Демонстрационный шаблон фотостудии.</p>
          <p>
            {contacts.email} · {contacts.phone}
          </p>
        </div>
      </div>
    </footer>
  );
}
