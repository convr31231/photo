import styles from './Contact.module.css';
import { contacts, images } from '../data/content';
import { Reveal } from '../components/Reveal';
import { MagneticButton } from '../components/MagneticButton';
import { useBooking } from '../hooks/useAppContext';

export function Contact() {
  const { openBooking } = useBooking();

  return (
    <section id="contacts" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className="container">
        <Reveal className={styles.cta}>
          <p className="eyebrow">Контакты</p>
          <h2 id="contact-title" className="editorial-title">
            Давайте создадим
            <br />
            что-то красивое
          </h2>
          <MagneticButton className={`btn btn--dark ${styles.btn}`} onClick={() => openBooking()}>
            Забронировать съёмку
          </MagneticButton>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.info} delay={80}>
            <ul>
              <li>
                <span>Телефон</span>
                <a href={`tel:${contacts.phone.replace(/[^\d+]/g, '')}`}>{contacts.phone}</a>
              </li>
              <li>
                <span>Telegram</span>
                <a href="https://t.me/" target="_blank" rel="noreferrer">
                  {contacts.telegram}
                </a>
              </li>
              <li>
                <span>VK</span>
                <a href="https://vk.com/" target="_blank" rel="noreferrer">
                  {contacts.vk}
                </a>
              </li>
              <li>
                <span>Email</span>
                <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
              </li>
              <li>
                <span>Адрес</span>
                <p>{contacts.address}</p>
              </li>
            </ul>
          </Reveal>

          <Reveal className={styles.map} delay={140}>
            <div className={styles.mapVisual} role="img" aria-label="Схематичная карта расположения студии">
              <img src={images.contact.map} alt="" aria-hidden="true" loading="lazy" />
              <div className={styles.mapOverlay}>
                <span className={styles.pin} />
                <p>ШАБЛОН</p>
                <p>{contacts.address}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
