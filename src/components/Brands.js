import styles from './Brands.module.css';

export default function Brands() {
  return (
    <div className={styles.brandsContainer}>
      <div className={`${styles.brand} ${styles.stella}`}>
        Stella Artois
      </div>
      
      <div className={`${styles.brand} ${styles.corona}`}>
        <img src="/images/corona_logo.png" alt="Corona logo" className={styles.brandImage} />
        Corona
      </div>

      <div className={`${styles.brand} ${styles.patagonia}`}>
        <img src="/images/patagonia_logo.png" alt="Patagonia logo" className={styles.brandImage} />
        Patagonia
      </div>

      <div className={`${styles.brand} ${styles.pepsi}`}>
        <div className={styles.pepsiCircle}></div>
        pepsi
      </div>
    </div>
  );
}
