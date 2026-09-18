import styles from './StudioIntro.module.css';
import { images, stats } from '../data/content';
import { Reveal } from '../components/Reveal';
import { useCountUp, useInView } from '../hooks/useInView';
import { useCursorContext } from '../hooks/useAppContext';

function StatItem({ value, suffix, label, active }: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <div className={styles.stat}>
      <strong>
        {n}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

export function StudioIntro() {
  const [statsRef, statsVisible] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const { setCursor, resetCursor, enabled } = useCursorContext();

  return (
    <section id="studio" className={`section ${styles.section}`} aria-labelledby="studio-title">
      <div className="container">
        <div className={styles.grid}>
          <Reveal className={styles.copy}>
            <p className="eyebrow">Студия</p>
            <h2 id="studio-title" className="editorial-title">
              Пространство
              <br />
              для ваших
              <br />
              историй
            </h2>
            <p className={`lead ${styles.lead}`}>
              ШАБЛОН — фотостудия, в которой пространство становится частью кадра.
            </p>
            <p className={styles.text}>
              Мы создаём среду, где свет, фактуры и тишина помогают раскрыть характер
              съёмки — от камерного портрета до fashion-editorial.
            </p>
          </Reveal>

          <Reveal className={styles.visual} delay={120}>
            <figure
              className={styles.figure}
              onMouseEnter={() => enabled && setCursor('смотреть')}
              onMouseLeave={() => resetCursor()}
            >
              <img
                src={images.studio.main}
                alt="Съёмочное пространство студии ШАБЛОН"
                loading="lazy"
              />
              <figcaption>Зал WHITE · естественный свет</figcaption>
            </figure>
            <div className={styles.asideImage}>
              <img
                src={images.studio.secondary}
                alt="Деталь интерьера фотостудии"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        <div className={styles.stats} ref={statsRef}>
          {stats.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <StatItem
                value={item.value}
                suffix={item.suffix}
                label={item.label}
                active={statsVisible}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
