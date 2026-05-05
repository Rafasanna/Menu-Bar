import styles from './ProductCard.module.css';

export default function ProductCard({ item }) {
  // Format price as ARS if it's a number, otherwise use the string (like for half/full pizza)
  let formattedPrice;
  
  if (item.priceStr) {
    formattedPrice = item.priceStr;
  } else if (item.price) {
    formattedPrice = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(item.price);
  }

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.name}>{item.name}</h3>
        {item.description && (
          <p className={styles.description}>{item.description}</p>
        )}
      </div>
      <div className={styles.priceContainer}>
        {formattedPrice && (
          <span className={styles.price}>{formattedPrice}</span>
        )}
      </div>
    </div>
  );
}
