import styles from './Brands.module.css';

export default function Brands() {
  return (
    <div className={styles.brandsContainer}>
      <div className={`${styles.brand} ${styles.stella}`}>
        Stella Artois
      </div>
      
      <div className={`${styles.brand} ${styles.corona}`}>
        Corona
      </div>

      <div className={`${styles.brand} ${styles.patagonia}`}>
        Patagonia
      </div>

      <div className={`${styles.brand} ${styles.pepsi}`}>
        <div className={styles.pepsiCircle}></div>
        pepsi
      </div>
    </div>
  );
}
