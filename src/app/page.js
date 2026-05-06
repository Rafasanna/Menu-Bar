'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Brands from '../components/Brands';
import PaymentMethods from '../components/PaymentMethods';
import ProductCard from '../components/ProductCard';
import styles from './page.module.css';

const categoryIcons = {
  pizzas: '🍕',
  empanadas: '🥟',
  entradas: '🍟',
  'nuestras-papas': '🥔',
  tablas: '🧀',
  bruschettas: '🥖',
  'platos-principales': '🥩',
  wok: '🥡',
  postres: '🍰',
  ensaladas: '🥗',
  pastas: '🍝',
  salsas: '🥫',
  'menu-infantil': '🧒',
  hamburguesas: '🍔',
  bebidas: '🥤',
  tragos: '🍹',
  cafeteria: '☕',
  'productos-sin-tacc': '🌾',
  'la-bodega-del-general': '🍷'
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

 async function loadMenu() {
  try {
    const response = await fetch(`/api/menu?t=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

   const data = await response.json();

const normalizedData = Array.isArray(data)
  ? data
  : Array.isArray(data.data)
    ? data.data
    : [];

console.log('MENU DATA:', normalizedData);

setMenuData(normalizedData);

  } catch (error) {
    console.error('Error cargando el menú:', error);
    setMenuData([]);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  loadMenu();
}, []);
  const filteredData = menuData
    .map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }))
    .filter(category => category.items.length > 0);

  if (loading) {
    return (
      <main className={styles.main}>
        <Header />
        <div className={styles.content}>
          <p>Cargando menú...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Header />

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
          filteredData.length === 0 ? (
            <div className={styles.noResults}>
              No se encontraron productos para "{searchQuery}"
            </div>
          ) : (
            filteredData.map(category => (
              <div key={category.id} style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  {category.name}
                </h3>

                {category.items.map(item => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            ))
          )
        ) : (
          <>
            <Brands />

            <div className={styles.categoriesGrid}>
              {menuData.map((category, index) => {
                const categoryImages = {
                  "pizzas": "cat_pizzas_1777948745116.png",
                  "empanadas": "cat_empanadas_1777948758530.png",
                  "entradas": "cat_entradas_1777948773334.png",
                  "nuestras-papas": "cat_papas_1777948787796.png",
                  "tablas": "cat_tablas_1777948801638.png",
                  "bruschettas": "cat_bruschettas_1777948816039.png",
                  "platos-principales": "cat_platos_principales_1777948864878.png",
                  "wok": "cat_wok_1777948880648.png",
                  "postres": "cat_postres_1777948894562.png",
                  "ensaladas": "cat_ensaladas_1777948908523.png",
                  "pastas": "cat_pastas_1777948921839.png",
                  "salsas": "cat_salsas_1777948935935.png",
                  "menu-infantil": "cat_menu_infantil_1777949008511.png",
                  "hamburguesas": "cat_hamburguesas_1777949023178.png",
                  "bebidas": "cat_bebidas_1777949036877.png",
                  "tragos": "cat_tragos_1777949052420.png",
                  "cafeteria": "cat_cafeteria_1777987847830.png",
                  "productos-sin-tacc": "cat_sin_tacc_1777987861994.png",
                  "la-bodega-del-general": "cat_bodega_1777987876493.png"
                };
                return (
                  <Link 
                    href={`/category/${category.id}`} 
                    key={category.id} 
                    className={styles.categoryCard}
                    data-icon={!categoryImages[category.id] ? (categoryIcons[category.id] || "🍽️") : ""}
                    style={{ 
                      animationDelay: `${index * 0.05}s`,
                      backgroundImage: categoryImages[category.id] 
                        ? `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%), url('/images/${categoryImages[category.id]}')`
                        : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <h2 className={styles.categoryName}>{category.name}</h2>
                  </Link>
                );
              })}
            </div>

            <div className={styles.storeImageContainer}>
              <img
                src="/images/media__1777945987919.jpg"
                alt="Bartolo Bar Exterior"
                className={styles.storeImage}
              />
            </div>
          </>
        )}
      </div>

      <p className={styles.disclaimer}>
        * Las imágenes son ilustrativas *
      </p>

      <PaymentMethods />

       
      <footer className={styles.footer}>
        <div>
          <div className={styles.address}>
            <svg className={styles.addressIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            San Martín 745
          </div>

          <p>Concepción del Uruguay</p>
        </div>

        <div className={styles.creatorCredits}>
          Creado y desarrollado por{' '}
          <a
            href="https://instagram.com/rafaelasanna_"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.creatorLink}
          >
            Rafaela Sanna
          </a>
        </div>
      </footer>
      
    </main>
  );
}