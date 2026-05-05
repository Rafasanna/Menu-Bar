import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

function createSlug(text) {
    return String(text || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ñ/g, 'n')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export async function GET() {
    try {
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const doc = new GoogleSpreadsheet(
            process.env.GOOGLE_SHEET_ID,
            serviceAccountAuth
        );

        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const categories = {};

        rows.forEach(row => {
            const disponible = String(row.get('disponible') || '').toLowerCase();

            if (disponible === 'no' || disponible === 'false' || disponible === '0') {
                return;
            }

            const categoriaNombre = row.get('categoria');
            const categoriaId = createSlug(categoriaNombre);

            if (!categoriaId) return;

            if (!categories[categoriaId]) {
                categories[categoriaId] = {
                    id: categoriaId,
                    name: categoriaNombre,
                    items: [],
                };
            }

            categories[categoriaId].items.push({
                id: row.get('id'),
                name: row.get('nombre'),
                description: row.get('descripcion'),
                price: row.get('precio'),
                halfPrice: row.get('precio_media'),
                subcategory: row.get('subcategoria'),
                available: row.get('disponible'),
                order: Number(row.get('orden')) || 0,
                source: row.get('fuente'),
            });
        });

        const result = Object.values(categories).map(category => ({
            ...category,
            items: category.items.sort((a, b) => a.order - b.order),
        }));

        return Response.json(result);
    } catch (error) {
        console.error(error);
        return Response.json(
            { error: 'Error cargando menú desde Google Sheets' },
            { status: 500 }
        );
    }
}