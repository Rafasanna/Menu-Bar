import './globals.css';

export const metadata = {
  title: 'Bartolo Bar | Menú Digital',
  description: 'Menú digital moderno de Bartolo Bar. Cervezas, Pizzas, Hamburguesas y más.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
