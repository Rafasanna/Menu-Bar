'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import styles from './page.module.css';

export default function CategoryPage() {
  const params = useParams();
  const { id } = params;

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadCategory() {
    try {
      const response = await fetch(`/api/menu?t=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      const menuData = await response.json();

      if (Array.isArray(menuData)) {
        const foundCategory = menuData.find(c => c.id === id);
        setCategory(foundCategory || null);
      } else {
        setCategory(null);
      }
    } catch (error) {
      console.error('Error cargando categoría:', error);
      setCategory(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategory();
  }, [id]);

  if (loading) {
    return (
      <main className={styles.container}>
        <p>Cargando categoría...</p>
      </main>
    );
  }

  if (!category) {
    return (
      <main className={styles.container}>
        <Link href="/" className={styles.backButton}>
          ← Volver al menú
        </Link>
        <h1>Categoría no encontrada</h1>
      </main>
    );
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
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}