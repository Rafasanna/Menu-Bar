import styles from './Brands.module.css';

export default function Brands() {
  return (
    <div className={styles.brandsContainer}>
      <div className={`${styles.brand} ${styles.stella}`}>
        <img src="/images/stella.svg" alt="Stella Artois logo" className={styles.brandImage} />
      </div>
      
      <div className={`${styles.brand} ${styles.corona}`}>
        <img src="/images/corona.svg" alt="Corona logo" className={styles.brandImage} />
      </div>

      <div className={`${styles.brand} ${styles.patagonia}`}>
        <img src="/images/patagonia_logo.png" alt="Patagonia logo" className={styles.brandImage} />
        <span>Patagonia</span>
      </div>

      <div className={`${styles.brand} ${styles.pepsi}`}>
        <img src="/images/pepsi.svg" alt="Pepsi logo" className={styles.brandImage} />
      </div>
    </div>
  );
}
