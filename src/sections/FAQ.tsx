import { useState } from 'react';
import styles from './FAQ.module.css';
import { faq } from '../data/content';
import { Reveal } from '../components/Reveal';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faq[0].id);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="faq-title">
      <div className="container">
        <div className={styles.grid}>
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="display-title">
              Частые
              <br />
              вопросы
            </h2>
          </Reveal>

          <div className={styles.list}>
            {faq.map((item, i) => {
              const open = openId === item.id;
              return (
                <Reveal key={item.id} delay={i * 40} className={styles.item}>
                  <h3>
                    <button
                      type="button"
                      className={styles.trigger}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${item.id}`}
                      id={`faq-btn-${item.id}`}
                      onClick={() => setOpenId(open ? null : item.id)}
                    >
                      <span>{item.question}</span>
                      <span className={styles.icon} aria-hidden="true">
                        {open ? '−' : '+'}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    className={`${styles.panel} ${open ? styles.open : ''}`}
                  >
                    <p>{item.answer}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
