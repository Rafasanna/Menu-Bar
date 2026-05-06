import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
        const credentials = JSON.parse(
            Buffer.from(process.env.GOOGLE_PRIVATE_KEY_BASE64, 'base64').toString('utf-8')
        );

        const serviceAccountAuth = new JWT({
            email: credentials.client_email,
            key: credentials.private_key,
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

        return Response.json(result, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                Pragma: 'no-cache',
                Expires: '0',
            },
        });
    } catch (error) {
        console.error('API Error details:', error);

        return Response.json(
            {
                error: 'Error cargando menú desde Google Sheets',
                details: error.message,
            },
            { status: 500 }
        );
    }
}