import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export async function getMenuFromGoogleSheets() {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

  await doc.loadInfo();

  const sheet = doc.sheetsByTitle["Menu"];
  const rows = await sheet.getRows();

  return rows.map((row) => ({
    id: row.get("id"),
    categoria: row.get("categoria"),
    subcategoria: row.get("subcategoria"),
    nombre: row.get("nombre"),
    descripcion: row.get("descripcion"),
    precio: row.get("precio"),
    mediaPizza: row.get("mediaPizza"),
    disponible: row.get("disponible"),
    orden: row.get("orden"),
  }));
}

export function transformData(rows) {
  const categories = {};

  rows.forEach(row => {
    const categoria = row.categoria.toLowerCase();

    if (!categories[categoria]) {
      categories[categoria] = {
        id: categoria,
        name: row.categoria,
        items: []
      };
    }

    categories[categoria].items.push({
      id: row.id,
      name: row.nombre,
      description: row.descripcion,
      price: row.precio
    });
  });

  return Object.values(categories);
}