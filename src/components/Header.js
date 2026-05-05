import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoCircle}>
        <span className={styles.logoCircleText}>BB</span>
      </div>
      <h1 className={styles.logoText}>Bartolo Bar</h1>
      <p className={styles.subtitle}>MENÚ DIGITAL</p>
    </header>
  );
}
