import styles from './Services.module.css';
import { services } from '../data/content';
import { formatPrice } from '../utils/pricing';
import { Reveal } from '../components/Reveal';
import { useBooking, useCursorContext } from '../hooks/useAppContext';

export function Services() {
  const { openBooking } = useBooking();
  const { setCursor, resetCursor, enabled } = useCursorContext();

  return (
    <section id="services" className={`section ${styles.section}`} aria-labelledby="services-title">
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">Услуги</p>
          <h2 id="services-title" className="editorial-title">
            История
            <br />
            начинается
            <br />
            с кадра
          </h2>
        </Reveal>

        <div className={styles.list}>
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 40} as="article" className={styles.row}>
              <div
                className={styles.thumb}
                onMouseEnter={() => enabled && setCursor('смотреть')}
                onMouseLeave={() => resetCursor()}
              >
                <img src={service.image} alt={service.name} loading="lazy" />
              </div>
              <div className={styles.content}>
                <div className={styles.titleRow}>
                  <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{service.name}</h3>
                </div>
                <p>{service.description}</p>
                <dl>
                  <div>
                    <dt>Длительность</dt>
                    <dd>{service.duration}</dd>
                  </div>
                  <div>
                    <dt>Стоимость</dt>
                    <dd>от {formatPrice(service.priceFrom)}</dd>
                  </div>
                </dl>
                <button type="button" className="btn btn--ghost" onClick={() => openBooking()}>
                  Забронировать →
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
