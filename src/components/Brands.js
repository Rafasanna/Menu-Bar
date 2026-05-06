import styles from './Brands.module.css';

export default function Brands() {
  const brands = [
    {
      name: 'Stella Artois',
      logo: '/brands/stella.svg',
    },
    {
      name: 'Corona',
      logo: '/brands/corona.svg',
    },
    {
      name: 'Patagonia',
      logo: '/brands/patagonia.svg',
    },
    {
      name: 'Pepsi',
      logo: '/brands/pepsi.svg',
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {brands.map((brand) => (
          <div key={brand.name} className={styles.card}>
            <img
              src={brand.logo}
              alt={brand.name}
              className={styles.logo}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
