import { GET } from './src/app/api/menu/route.js';

async function test() {
    const res = await GET();
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
}
test();
