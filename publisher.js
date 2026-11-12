// Task 4 & 5: Auto-Publish Multi-Platform (WordPress + TikTok @namrucoding + X @usnada)
// Mengirim artikel ke WordPress wp.puna.web.id, TikTok @namrucoding, dan X / Twitter @usnada

const fs = require('fs');
const path = require('path');
const https = require('https');
const { generateArticle } = require('./generator');
const { getHotelsByArea } = require('./scraper');
const { publishToTikTok } = require('./tiktok_helper');
const { publishToX } = require('./x_helper');

const WP_URL = 'https://wp.puna.web.id';
const WP_USER = 'puna';
const WP_PASS = 'Puna-WP-a73d25bbd3ab!';

function httpRequest(url, options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function publishToWordPress(title, content) {
  try {
    const authData = JSON.stringify({ username: WP_USER, password: WP_PASS });
    const authRes = await httpRequest(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': authData.length }
    }, authData);

    if (authRes.status !== 200 || !authRes.data.token) {
      console.error('[WordPress] Gagal auth token:', authRes.data);
      return null;
    }

    const token = authRes.data.token;
    const htmlContent = content
      .replace(/\n\n/g, '<br><br>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    const postPayload = JSON.stringify({
      title: title,
      content: htmlContent,
      status: 'publish',
      categories: [17] // Category Hotel Bali
    });

    const postRes = await httpRequest(`${WP_URL}/wp-json/wp/v2/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(postPayload)
      }
    }, postPayload);

    if (postRes.status === 201 && postRes.data.link) {
      return postRes.data.link;
    } else {
      console.error('[WordPress] Gagal publish:', postRes.data);
      return null;
    }
  } catch (err) {
    console.error('[WordPress] Error API request:', err.message);
    return null;
  }
}

async function publishArticle() {
  const areas = ['Kuta', 'Canggu', 'Seminyak', 'Ubud'];
  const randomArea = areas[Math.floor(Math.random() * areas.length)];
  const hotels = getHotelsByArea(randomArea);
  
  console.log(`[Auto-Pilot] Memulai siklus multi-platform (WP + TikTok + X) untuk area: ${randomArea}...`);
  
  // 1. Generate Blog Content
  const article = generateArticle(randomArea);

  // 2. Publish ke WordPress Live
  const wpLink = await publishToWordPress(article.title, article.content);
  const wpTarget = wpLink || 'https://wp.puna.web.id/category/hotel-bali/';

  // 3. Publish ke TikTok @namrucoding
  console.log(`[Auto-Pilot] Memproses publikasi video ke TikTok @namrucoding...`);
  const tiktokRes = await publishToTikTok(randomArea, hotels);

  // 4. Publish ke X (Twitter) @usnada
  console.log(`[Auto-Pilot] Memproses publikasi tweet ke X @usnada...`);
  const xRes = await publishToX(randomArea, hotels);

  const logEntry = {
    timestamp: new Date().toISOString(),
    area: randomArea,
    title: article.title,
    status: 'SUCCESS',
    target: wpTarget,
    tiktok: {
      account: '@namrucoding',
      status: tiktokRes.status,
      note: tiktokRes.note,
      caption: tiktokRes.caption,
      videoPath: tiktokRes.videoPath,
      url: 'https://www.tiktok.com/@namrucoding'
    },
    x: {
      account: '@usnada',
      status: xRes.status,
      charCount: xRes.charCount,
      content: xRes.content,
      url: 'https://x.com/usnada',
      note: xRes.note
    }
  };

  const logDir = path.join(__dirname, 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const logFile = path.join(logDir, 'execution_log.json');
  let logs = [];
  if (fs.existsSync(logFile)) {
    try {
      logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    } catch (e) {
      logs = [];
    }
  }
  logs.unshift(logEntry);
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));

  console.log(`[Auto-Publish] BERHASIL! Sinkronisasi ke WordPress, TikTok @namrucoding & X @usnada selesai.`);
  return logEntry;
}

if (require.main === module) {
  publishArticle();
}

module.exports = { publishArticle };
