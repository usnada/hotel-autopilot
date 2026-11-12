// Task 2: Hotel Data Scraper & Provider (Bali Areas: Kuta, Canggu, Seminyak, Ubud)
// Menggunakan struktur data tervalidasi yang siap diproses oleh AI Agent.

const fs = require('fs');
const path = require('path');

const HOTELS_DB = [
  {
    id: 'bali-kuta-01',
    name: 'Kuta Beach Budget Stay',
    area: 'Kuta',
    priceIdr: 350000,
    rating: 4.5,
    highlights: ['Dekat Pantai Kuta', 'Kolam Renang Rooftop', 'Gratis WiFi & Breakfast'],
    source: 'Firecrawl-Mock-BaliDirect'
  },
  {
    id: 'bali-canggu-02',
    name: 'Canggu Surf Hostel & Pods',
    area: 'Canggu',
    priceIdr: 280000,
    rating: 4.7,
    highlights: ['Dekat Pantai Echo', 'Coworking Space', 'Suasana Anak Muda'],
    source: 'Firecrawl-Mock-BaliDirect'
  },
  {
    id: 'bali-seminyak-03',
    name: 'Seminyak Sunset Boutique',
    area: 'Seminyak',
    priceIdr: 450000,
    rating: 4.6,
    highlights: ['Pusat Kuliner Seminyak', 'Desain Estetik', 'Dekat Cafe Populer'],
    source: 'Firecrawl-Mock-BaliDirect'
  },
  {
    id: 'bali-ubud-04',
    name: 'Ubud Jungle Retreat',
    area: 'Ubud',
    priceIdr: 420000,
    rating: 4.8,
    highlights: ['Pemandangan Sawah Hijau', 'Yoga Shala Gratis', 'Tenang & Asri'],
    source: 'Firecrawl-Mock-BaliDirect'
  },
  {
    id: 'bali-kuta-05',
    name: 'Legian Street Inn',
    area: 'Kuta',
    priceIdr: 300000,
    rating: 4.3,
    highlights: ['Jantung Hiburan Malam Kuta', 'Akses Mudah ke Pantai', 'Ekonomis'],
    source: 'Firecrawl-Mock-BaliDirect'
  }
];

function getHotelsByArea(area) {
  if (!area) return HOTELS_DB;
  return HOTELS_DB.filter(h => h.area.toLowerCase() === area.toLowerCase());
}

function exportHotelDataJson() {
  const outDir = path.join(__dirname, 'data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outFile = path.join(outDir, 'scraped_hotels.json');
  fs.writeFileSync(outFile, JSON.stringify(HOTELS_DB, null, 2));
  console.log(`[Scraper] Berhasil menyimpan ${HOTELS_DB.length} data hotel Bali ke ${outFile}`);
  return HOTELS_DB;
}

if (require.main === module) {
  exportHotelDataJson();
}

module.exports = { getHotelsByArea, exportHotelDataJson, HOTELS_DB };
