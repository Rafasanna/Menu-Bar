import styles from './Brands.module.css';

export default function Brands() {
  return (
    <section className={styles.container}>
      <img src="/brands/stella.svg" alt="Stella Artois" className={styles.logo} />
      <img src="/brands/patagonia.svg" alt="Patagonia" className={styles.logo} />
      <img src="/brands/corona.svg" alt="Corona" className={styles.logo} />
      <img src="/brands/pepsi.svg" alt="Pepsi" className={styles.logo} />
    </section>
  );
}
