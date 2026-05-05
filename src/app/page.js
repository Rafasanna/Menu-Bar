'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Brands from '../components/Brands';
import PaymentMethods from '../components/PaymentMethods';
import ProductCard from '../components/ProductCard';
import { menuData } from '../data/menu';
import styles from './page.module.css';

// Mapping categories to an emoji to use as a delicate background illustration
const categoryIcons = {
  "pizzas": "🍕",
  "empanadas": "🥟",
  "entradas": "🍟",
  "papas": "🥔",
  "tablas": "🧀",
  "bruschettas": "🥖",
  "platos-principales": "🥩",
  "wok": "🥡",
  "postres": "🍰",
  "ensaladas": "🥗",
  "pastas": "🍝",
  "salsas": "🥫",
  "menu-infantil": "🧒",
  "hamburguesas": "🍔",
  "bebidas": "🥤",
  "tragos": "🍹",
  "cafeteria": "☕",
  "sin-tacc": "🌾",
  "bodega": "🍷"
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredData = menuData.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.items.length > 0);

  return (
    <main className={styles.main}>
      <Header />
      
      {/* Floating WhatsApp Delivery Button */}
      <a 
        href="https://wa.me/543442667671?text=Hola,%20me%20gustar%C3%ADa%20hacer%20un%20pedido%20para%20delivery" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.whatsappButton}
        aria-label="Pedir por WhatsApp"
      >
        <svg className={styles.whatsappIcon} viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className={styles.content}>
        {searchQuery ? (
          // If searching, show the results directly
          filteredData.length === 0 ? (
            <div className={styles.noResults}>
              No se encontraron productos para "{searchQuery}"
            </div>
          ) : (
            filteredData.map(category => (
              <div key={category.id} style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>{category.name}</h3>
                {category.items.map(item => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            ))
          )
        ) : (
          // If not searching, show the category grid
          <>
            <Brands />
            <div className={styles.categoriesGrid}>
              {menuData.map((category) => (
                <Link 
                  href={`/category/${category.id}`} 
                  key={category.id} 
                  className={styles.categoryCard}
                  data-icon={categoryIcons[category.id] || "🍽️"}
                >
                  <h2 className={styles.categoryName}>{category.name}</h2>
                </Link>
              ))}
            </div>

            {/* Store Image */}
            <div className={styles.storeImageContainer}>
              <img src="/images/media__1777945987919.jpg" alt="Bartolo Bar Exterior" className={styles.storeImage} />
            </div>
          </>
        )}
      </div>

      <PaymentMethods />

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.address}>
          <svg className={styles.addressIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          San Martín 745
        </div>
        <p>Concepción del Uruguay</p>
      </footer>
    </main>
  );
}
