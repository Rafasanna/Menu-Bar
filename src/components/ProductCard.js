import styles from './ProductCard.module.css';

export default function ProductCard({ item }) {
  let formattedPrice = '';

  if (item.price) {
    const numericPrice = Number(
      String(item.price)
        .replace(/\$/g, '')
        .replace(/\./g, '')
        .replace(/,/g, '')
        .trim()
    );

    if (!isNaN(numericPrice)) {
      formattedPrice = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
      }).format(numericPrice);
    } else {
      formattedPrice = item.price;
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.name}>{item.name}</h3>

        {item.description && (
          <p className={styles.description}>
            {item.description}
          </p>
        )}
      </div>

      <div className={styles.priceContainer}>
        {formattedPrice && (
          <span className={styles.price}>
            {formattedPrice}
          </span>
        )}
      </div>
    </div>
  );
}