'use client';

import styles from './CategoryNav.module.css';

export default function CategoryNav({ categories, activeCategory, onCategoryClick }) {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.scrollArea}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
            onClick={() => onCategoryClick(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
