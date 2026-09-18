import { useMemo, useState } from 'react';
import styles from './Prices.module.css';
import { prices } from '../data/content';
import { Reveal } from '../components/Reveal';
import { MagneticButton } from '../components/MagneticButton';
import { calcShootPrice, formatPrice } from '../utils/pricing';
import { useBooking } from '../hooks/useAppContext';

type ShootType = 'portrait' | 'love' | 'fashion' | 'content';

export function Prices() {
  const { openBooking } = useBooking();
  const [type, setType] = useState<ShootType>('portrait');
  const [hours, setHours] = useState<1 | 2 | 3 | 4>(2);
  const [extras, setExtras] = useState({
    makeup: false,
    photographer: false,
    equipment: false,
    stylist: false,
  });

  const total = useMemo(
    () => calcShootPrice({ type, hours, extras }),
    [type, hours, extras],
  );

  const toggle = (key: keyof typeof extras) => {
    setExtras((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="prices" className={`section ${styles.section}`} aria-labelledby="prices-title">
      <div className="container">
        <div className={styles.grid}>
          <Reveal>
            <p className="eyebrow">Цены</p>
            <h2 id="prices-title" className="display-title">
              Прозрачный
              <br />
              прайс
            </h2>
            <p className={`lead ${styles.note}`}>
              Цифры демонстрационные — в шаблоне их легко заменить на актуальные.
            </p>

            <ul className={styles.priceList}>
              {prices.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <strong>{item.priceLabel}</strong>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className={styles.calc} as="div">
            <h3 id="calculator">Рассчитать стоимость</h3>
            <p className={styles.calcLead}>Калькулятор съёмки — стоимость обновляется сразу.</p>

            <fieldset className={styles.fieldset}>
              <legend>Тип съёмки</legend>
              {(
                [
                  ['portrait', 'Портрет'],
                  ['love', 'Love Story'],
                  ['fashion', 'Fashion'],
                  ['content', 'Контент'],
                ] as const
              ).map(([value, label]) => (
                <label key={value} className={styles.option}>
                  <input
                    type="radio"
                    name="shoot-type"
                    checked={type === value}
                    onChange={() => setType(value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>Продолжительность</legend>
              {([1, 2, 3, 4] as const).map((h) => (
                <label key={h} className={styles.option}>
                  <input
                    type="radio"
                    name="hours"
                    checked={hours === h}
                    onChange={() => setHours(h)}
                  />
                  <span>
                    {h} {h === 1 ? 'час' : h < 5 ? 'часа' : 'часов'}
                  </span>
                </label>
              ))}
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>Дополнительно</legend>
              {(
                [
                  ['makeup', 'Визажист'],
                  ['photographer', 'Фотограф'],
                  ['equipment', 'Доп. оборудование'],
                  ['stylist', 'Стилист'],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={extras[key]}
                    onChange={() => toggle(key)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>

            <div className={styles.result}>
              <p>Ориентировочная стоимость:</p>
              <strong>{formatPrice(total)}</strong>
            </div>

            <MagneticButton className="btn btn--dark" onClick={() => openBooking()}>
              Забронировать
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
