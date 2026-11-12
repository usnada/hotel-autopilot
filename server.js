const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3115;

const server = http.createServer((req, res) => {
  const articlesPath = path.join(__dirname, 'data', 'articles.json');
  const latestArticlePath = path.join(__dirname, 'data', 'generated_article.json');
  const logPath = path.join(__dirname, 'logs', 'execution_log.json');
  
  let articles = [];
  let logs = [];

  try {
    if (fs.existsSync(articlesPath)) {
      articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    } else if (fs.existsSync(latestArticlePath)) {
      articles = [JSON.parse(fs.readFileSync(latestArticlePath, 'utf8'))];
    }
    if (fs.existsSync(logPath)) {
      logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
    }
  } catch (e) {
    console.error(e);
  }

  const latestArticle = articles.length > 0 ? articles[0] : {
    title: 'Belum ada artikel',
    content: 'Silakan tunggu siklus cron berikutnya.',
    area: '-',
    createdAt: new Date().toISOString(),
    imagePrompt: '-'
  };

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Project Hotel Auto-Pilot 🌴</title>
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    </head>
    <body class="bg-gray-100 min-h-screen py-10 px-4">
      <div class="max-w-5xl mx-auto space-y-8">
        
        <!-- Header -->
        <div class="bg-white shadow rounded-lg p-6 border-t-4 border-indigo-600">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Project Hotel Auto-Pilot 🌴</h1>
              <p class="mt-2 text-gray-600">
                Dashboard Otonom 24 Jam (Track B) — Multi-Platform: Web, WordPress, TikTok <strong>@namrucoding</strong>, & X <strong>@usnada</strong>.
              </p>
            </div>
            <div class="text-right">
              <span class="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">24/7 Active Cron</span>
              <p class="text-xs text-gray-500 mt-1">Total Arsip: <strong>${articles.length} Post</strong></p>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap gap-2 text-xs">
            <span class="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-md font-medium">🌐 Web: task.usnada.com</span>
            <span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-md font-medium">📰 WP: wp.puna.web.id</span>
            <span class="px-2.5 py-1 bg-pink-100 text-pink-800 rounded-md font-medium">🎵 TikTok: @namrucoding</span>
            <span class="px-2.5 py-1 bg-gray-100 text-gray-900 rounded-md font-medium">𝕏 X: @usnada</span>
          </div>
        </div>

        <!-- Latest Featured Article -->
        <div class="bg-white shadow rounded-lg p-6 border-l-4 border-indigo-500">
          <div class="flex justify-between items-center mb-3">
            <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold uppercase tracking-wide">🌟 Post Terbaru (Active)</span>
            <span class="text-xs text-gray-500">${new Date(latestArticle.createdAt).toLocaleString('id-ID')}</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">${latestArticle.title}</h2>
          <span class="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded font-semibold mb-3">Wilayah: ${latestArticle.area}</span>
          <div class="bg-gray-50 p-4 rounded-md border text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            ${latestArticle.content}
          </div>
          <div class="mt-3 bg-blue-50 p-3 rounded-md text-xs text-blue-900">
            <strong>🎨 AI Image Prompt:</strong> ${latestArticle.imagePrompt}
          </div>
        </div>

        <!-- All Generated Articles Archive -->
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-xl font-bold text-gray-800">📚 Semua Arsip Postingan (${articles.length} Post)</h2>
              <p class="text-xs text-gray-500 mt-1">Seluruh rekomendasi hotel tersimpan permanen dan dapat ditinjau kapan saja.</p>
            </div>
          </div>

          <div class="space-y-4">
            ${articles.map((art, idx) => `
              <details class="group border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-white transition" ${idx === 0 ? 'open' : ''}>
                <summary class="flex justify-between items-center cursor-pointer font-semibold text-gray-900 list-none">
                  <div class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">#${articles.length - idx}</span>
                    <div>
                      <span class="text-base text-gray-900 group-hover:text-indigo-600">${art.title}</span>
                      <div class="flex items-center gap-2 mt-1">
                        <span class="px-2 py-0.5 bg-gray-200 text-gray-800 text-xs rounded font-medium">${art.area}</span>
                        <span class="text-xs text-gray-400">• ${new Date(art.createdAt).toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                  <span class="text-xs text-indigo-600 font-medium group-open:rotate-180 transition-transform">▼</span>
                </summary>
                
                <div class="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  ${art.content}
                  <div class="mt-3 bg-blue-50 p-3 rounded text-xs text-blue-800">
                    <strong>Prompt Gambar:</strong> ${art.imagePrompt}
                  </div>
                </div>
              </details>
            `).join('')}
          </div>
        </div>

        <!-- Live Execution Logs -->
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">📊 Live Execution Logs (Multi-Platform Pipeline)</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left font-medium text-gray-500">Waktu</th>
                  <th class="px-4 py-2 text-left font-medium text-gray-500">Area</th>
                  <th class="px-4 py-2 text-left font-medium text-gray-500">Status</th>
                  <th class="px-4 py-2 text-left font-medium text-gray-500">WordPress</th>
                  <th class="px-4 py-2 text-left font-medium text-gray-500">TikTok</th>
                  <th class="px-4 py-2 text-left font-medium text-gray-500">X (Twitter)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                ${logs.map(log => `
                  <tr>
                    <td class="px-4 py-2 text-gray-600 whitespace-nowrap">${new Date(log.timestamp).toLocaleString('id-ID')}</td>
                    <td class="px-4 py-2 font-medium text-gray-900">${log.area}</td>
                    <td class="px-4 py-2"><span class="px-2 py-1 text-xs rounded bg-green-100 text-green-800 font-bold">${log.status}</span></td>
                    <td class="px-4 py-2 text-xs text-indigo-600"><a href="${log.target}" target="_blank" class="hover:underline">Buka WP</a></td>
                    <td class="px-4 py-2 text-xs text-pink-600">${log.tiktok ? `<a href="${log.tiktok.url}" target="_blank" class="hover:underline">${log.tiktok.account} (${log.tiktok.status})</a>` : '<span class="text-gray-400">-</span>'}</td>
                    <td class="px-4 py-2 text-xs text-gray-900 font-medium">${log.x ? `<a href="${log.x.url}" target="_blank" class="hover:underline">${log.x.account} (${log.x.charCount} char)</a>` : '<span class="text-gray-400">-</span>'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </body>
    </html>
  `);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Hotel Autopilot Dashboard running on port ' + PORT);
});
