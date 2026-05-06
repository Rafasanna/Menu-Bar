import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '../../../components/ProductCard';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function getMenuData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/menu?t=${Date.now()}`,
      {
        cache: 'no-store',
      }
    );

    return response.json();
  } catch (error) {
    console.error('Error cargando categorías:', error);
    return [];
  }
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const menuData = await getMenuData();

  const category = menuData.find(c => c.id === id);

  if (!category) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← Volver al menú
      </Link>

      <div className={styles.header}>
        <h1>{category.name}</h1>
      </div>

      <div className={styles.productsGrid}>
        {category.items.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </main>
  );
}