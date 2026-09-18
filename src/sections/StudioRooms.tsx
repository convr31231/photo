import { useRef } from 'react';
import styles from './StudioRooms.module.css';
import { rooms } from '../data/content';
import { formatPrice } from '../utils/pricing';
import { Reveal } from '../components/Reveal';
import { useBooking, useCursorContext } from '../hooks/useAppContext';

export function StudioRooms() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  const { setCursor, resetCursor, enabled } = useCursorContext();

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 420, behavior: 'smooth' });
  };

  return (
    <section id="rooms" className={`section ${styles.section}`} aria-labelledby="rooms-title">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">Залы</p>
            <h2 id="rooms-title" className="display-title">
              Четыре характера
              <br />
              пространства
            </h2>
          </Reveal>
          <div className={styles.controls}>
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Прокрутить влево">
              ←
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Прокрутить вправо">
              →
            </button>
          </div>
        </div>
      </div>

      <div className={styles.trackWrap}>
        <div className={styles.track} ref={scrollerRef} tabIndex={0} aria-label="Список залов">
          {rooms.map((room, i) => (
            <article
              key={room.id}
              className={styles.card}
              onMouseEnter={() => enabled && setCursor('открыть')}
              onMouseLeave={() => resetCursor()}
            >
              <div className={styles.imageWrap}>
                <img src={room.image} alt={`Зал ${room.name}`} loading="lazy" />
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className={styles.body}>
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <dl>
                  <div>
                    <dt>Площадь</dt>
                    <dd>{room.area}</dd>
                  </div>
                  <div>
                    <dt>Вместимость</dt>
                    <dd>{room.capacity}</dd>
                  </div>
                  <div>
                    <dt>Стоимость</dt>
                    <dd>от {formatPrice(room.priceFrom)} / час</dd>
                  </div>
                </dl>
                <ul className={styles.equip}>
                  {room.equipment.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn"
                  onClick={() => openBooking(room.id)}
                >
                  Посмотреть зал
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
