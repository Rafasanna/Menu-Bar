const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config({path: '.env.local'});

function createSlug(text) {
    return String(text || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ñ/g, 'n')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

async function run() {
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
            if (disponible === 'no' || disponible === 'false' || disponible === '0') return;
            const categoriaNombre = row.get('categoria');
            const categoriaId = createSlug(categoriaNombre);
            if (!categoriaId) return;
            if (!categories[categoriaId]) {
                categories[categoriaId] = { id: categoriaId, name: categoriaNombre, items: [] };
            }
        });
        console.log(Object.keys(categories));
    } catch (e) {
        console.error(e.message);
    }
}
run();
