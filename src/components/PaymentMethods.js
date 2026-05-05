import styles from './PaymentMethods.module.css';

export default function PaymentMethods() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>MEDIOS DE PAGO</h2>
      <div className={styles.methodsGrid}>
        
        {/* Efectivo */}
        <div className={styles.methodItem}>
          <div className={styles.iconWrapper}>
            <svg viewBox="0 0 24 24">
              <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12h.01M16 12h.01" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className={styles.methodName}>Efectivo</span>
        </div>

        {/* Tarjetas */}
        <div className={styles.methodItem}>
          <div className={styles.iconWrapper}>
            <svg viewBox="0 0 24 24">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
            </svg>
          </div>
          <span className={styles.methodName}>Tarjetas</span>
        </div>

        {/* Transferencia */}
        <div className={styles.methodItem}>
          <div className={styles.iconWrapper}>
            <svg viewBox="0 0 24 24">
              <path d="M16 11l-4-4-4 4h3v4h2v-4h3zm2 4v4H6v-4H4v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4h-2z" />
            </svg>
          </div>
          <span className={styles.methodName}>Transferencia</span>
        </div>



      </div>
    </section>
  );
}
