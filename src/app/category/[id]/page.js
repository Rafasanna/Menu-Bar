import Link from 'next/link';
import { notFound } from 'next/navigation';
import { menuData } from '../../../data/menu';
import ProductCard from '../../../components/ProductCard';
import styles from './page.module.css';

// This function can statically generate routes at build time
export function generateStaticParams() {
  return menuData.map((category) => ({
    id: category.id,
  }));
}

export default async function CategoryPage({ params }) {
  // In Next.js 15, params is a Promise
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  const category = menuData.find(c => c.id === id);

  if (!category) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn} aria-label="Volver al menú">
          <svg className={styles.backIcon} viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </Link>
        <h1 className={styles.title}>{category.name}</h1>
      </header>

      <div className={styles.content}>
        {category.description && (
          <p className={styles.description}>{category.description}</p>
        )}

        <div className={styles.productList}>
          {category.items.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
