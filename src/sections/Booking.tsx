import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Booking.module.css';
import { rooms } from '../data/content';
import { calcBookingPrice, formatPrice } from '../utils/pricing';
import { useBooking } from '../hooks/useAppContext';
import { MagneticButton } from '../components/MagneticButton';

const TIMES = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '18:00', '19:00'];
const HOURS = [1, 2, 3, 4];
const SHOOT_TYPES = [
  { id: 'rental', label: 'Аренда зала' },
  { id: 'portrait', label: 'Портрет' },
  { id: 'love', label: 'Love Story' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'content', label: 'Контент' },
];

const STEPS = ['Выберите зал', 'Выберите дату', 'Выберите время', 'Подтвердите'];

export function Booking() {
  const { open, closeBooking, presetRoomId } = useBooking();
  const [step, setStep] = useState(0);
  const [roomId, setRoomId] = useState(rooms[0].id);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(TIMES[0]);
  const [hours, setHours] = useState(2);
  const [shootType, setShootType] = useState('portrait');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setSuccess(false);
    if (presetRoomId) setRoomId(presetRoomId as typeof roomId);
  }, [open, presetRoomId]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBooking();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeBooking]);

  const room = rooms.find((r) => r.id === roomId) ?? rooms[0];
  const total = useMemo(
    () => calcBookingPrice({ roomPriceFrom: room.priceFrom, hours, shootType }),
    [room.priceFrom, hours, shootType],
  );

  const canNext =
    (step === 0 && Boolean(roomId)) ||
    (step === 1 && Boolean(date)) ||
    (step === 2 && Boolean(time) && hours > 0) ||
    (step === 3 && name.trim() && phone.trim() && email.trim());

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canNext) return;
    setSuccess(true);
  };

  if (!open) return null;

  return (
    <div className={styles.root} role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <button type="button" className={styles.backdrop} onClick={closeBooking} aria-label="Закрыть форму" />
      <div className={styles.panel}>
        <div className={styles.top}>
          <div>
            <p className={styles.eyebrow}>Онлайн-бронирование</p>
            <h2 id="booking-title">Забронировать съёмку</h2>
          </div>
          <button type="button" className={styles.close} onClick={closeBooking} aria-label="Закрыть">
            Закрыть
          </button>
        </div>

        {success ? (
          <div className={styles.success}>
            <h3>Заявка отправлена</h3>
            <p>Мы свяжемся с вами для подтверждения бронирования.</p>
            <MagneticButton className="btn btn--dark" onClick={closeBooking}>
              Готово
            </MagneticButton>
          </div>
        ) : (
          <>
            <ol className={styles.progress} aria-label="Шаги бронирования">
              {STEPS.map((label, i) => (
                <li key={label} className={i === step ? styles.current : i < step ? styles.done : ''}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {label}
                </li>
              ))}
            </ol>

            <form onSubmit={submit} className={styles.form}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={styles.step}
                >
                  {step === 0 && (
                    <div className={styles.rooms}>
                      {rooms.map((r) => (
                        <label key={r.id} className={`${styles.room} ${roomId === r.id ? styles.selected : ''}`}>
                          <input
                            type="radio"
                            name="room"
                            checked={roomId === r.id}
                            onChange={() => setRoomId(r.id)}
                          />
                          <img src={r.image} alt="" aria-hidden="true" />
                          <span>
                            <strong>{r.name}</strong>
                            <em>
                              {r.area} · от {formatPrice(r.priceFrom)}/час
                            </em>
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {step === 1 && (
                    <div className={styles.field}>
                      <label htmlFor="booking-date">Дата</label>
                      <input
                        id="booking-date"
                        type="date"
                        value={date}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className={styles.stack}>
                      <fieldset>
                        <legend>Время</legend>
                        <div className={styles.chips}>
                          {TIMES.map((t) => (
                            <label key={t} className={`${styles.chip} ${time === t ? styles.selected : ''}`}>
                              <input
                                type="radio"
                                name="time"
                                checked={time === t}
                                onChange={() => setTime(t)}
                              />
                              {t}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend>Продолжительность</legend>
                        <div className={styles.chips}>
                          {HOURS.map((h) => (
                            <label key={h} className={`${styles.chip} ${hours === h ? styles.selected : ''}`}>
                              <input
                                type="radio"
                                name="duration"
                                checked={hours === h}
                                onChange={() => setHours(h)}
                              />
                              {h} ч
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend>Тип съёмки</legend>
                        <div className={styles.chips}>
                          {SHOOT_TYPES.map((s) => (
                            <label
                              key={s.id}
                              className={`${styles.chip} ${shootType === s.id ? styles.selected : ''}`}
                            >
                              <input
                                type="radio"
                                name="shoot"
                                checked={shootType === s.id}
                                onChange={() => setShootType(s.id)}
                              />
                              {s.label}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  )}

                  {step === 3 && (
                    <div className={styles.stack}>
                      <div className={styles.summary}>
                        <p>
                          {room.name} · {date || '—'} · {time} · {hours} ч
                        </p>
                        <strong>{formatPrice(total)}</strong>
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="booking-name">Имя</label>
                        <input
                          id="booking-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                          required
                        />
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="booking-phone">Телефон</label>
                        <input
                          id="booking-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          autoComplete="tel"
                          required
                        />
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="booking-email">Email</label>
                        <input
                          id="booking-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          required
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className={styles.actions}>
                {step > 0 ? (
                  <button type="button" className="btn" onClick={() => setStep((s) => s - 1)}>
                    Назад
                  </button>
                ) : (
                  <span />
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    className="btn btn--dark"
                    disabled={!canNext}
                    onClick={() => setStep((s) => s + 1)}
                  >
                    Далее
                  </button>
                ) : (
                  <MagneticButton className="btn btn--dark" type="submit">
                    Забронировать
                  </MagneticButton>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function BookingSection() {
  const { openBooking } = useBooking();

  return (
    <section id="booking" className={`section ${styles.section}`} aria-labelledby="booking-section-title">
      <div className="container">
        <div className={styles.teaser}>
          <p className="eyebrow">Бронирование</p>
          <h2 id="booking-section-title" className="editorial-title">
            Забронируйте
            <br />
            пространство
          </h2>
          <p className="lead">
            Пошаговый интерфейс: зал → дата → время → подтверждение. Без лишних полей.
          </p>
          <MagneticButton className="btn btn--dark" onClick={() => openBooking()}>
            Начать бронирование
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
