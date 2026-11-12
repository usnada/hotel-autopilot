// Task 3: AI Content Generator (Blog Article & Image Prompt Generator)
// Menganalisis data hotel dan merumuskan artikel menarik beserta prompt gambar.

const fs = require('fs');
const path = require('path');
const { getHotelsByArea } = require('./scraper');

function generateArticle(area = 'Kuta') {
  const hotels = getHotelsByArea(area);
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID');
  const title = `5 Hotel Terbaik & Murah di ${area} Bali di Bawah 500rb (${dateStr})`;
  
  let content = `${title}\n\n`;
  content += `Sedang merencanakan liburan ke Bali tanpa bikin dompet jebol? Khususnya di daerah **${area}**, berikut adalah rekomendasi akomodasi pilihan dengan harga di bawah Rp500.000 per malam yang sudah dikurasi khusus untuk Anda!\n\n`;

  hotels.forEach((hotel, idx) => {
    content += `${idx + 1}. ${hotel.name}\n`;
    content += `- **Estimasi Harga**: Rp${hotel.priceIdr.toLocaleString('id-ID')} / malam\n`;
    content += `- **Rating**: ⭐ ${hotel.rating} / 5.0\n`;
    content += `- **Keunggulan**: ${hotel.highlights.join(', ')}\n\n`;
  });

  content += `---\n*Artikel ini dibuat secara otomatis oleh AI Agent Hotel Auto-Pilot (Track B) setiap 2 jam untuk memberikan update akomodasi terbaik di Bali.*`;

  const imagePrompt = `Cinematic travel photography of a cozy boutique hotel room in ${area} Bali, warm tropical sunlight, aesthetic minimalist interior, lush green plants, high quality, 4k.`;

  const articleId = `art-${now.getTime()}`;
  const articleData = {
    id: articleId,
    title,
    area,
    content,
    imagePrompt,
    createdAt: now.toISOString()
  };

  const outDir = path.join(__dirname, 'data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Simpan ke generated_article.json (untuk backward compatibility artikel terakhir)
  const latestFile = path.join(outDir, 'generated_article.json');
  fs.writeFileSync(latestFile, JSON.stringify(articleData, null, 2));

  // 2. Simpan akumulatif ke articles.json (agar SEMUA post tetap tersimpan & tidak hilang)
  const allArticlesFile = path.join(outDir, 'articles.json');
  let articles = [];
  if (fs.existsSync(allArticlesFile)) {
    try {
      articles = JSON.parse(fs.readFileSync(allArticlesFile, 'utf8'));
    } catch (e) {
      articles = [];
    }
  }

  // Tambahkan post baru di paling atas
  articles.unshift(articleData);
  fs.writeFileSync(allArticlesFile, JSON.stringify(articles, null, 2));

  console.log(`[AI Generator] Berhasil merumuskan artikel untuk area ${area}. Total arsip: ${articles.length} postingan.`);
  return articleData;
}

if (require.main === module) {
  generateArticle('Kuta');
}

module.exports = { generateArticle };
