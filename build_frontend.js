// Task 6: Next.js Simple App Frontend & API Route untuk Hotel Auto-Pilot
// Menyediakan UI halaman utama yang menampilkan artikel dan log agent secara live.

const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, 'frontend');
if (!fs.existsSync(frontendDir)) {
  fs.mkdirSync(frontendDir, { recursive: true });
}

// 1. package.json untuk Next.js
const packageJson = {
  "name": "hotel-autopilot-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3010",
    "build": "next build",
    "start": "next start -p 3010"
  },
  "dependencies": {
    "next": "^14.2.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.1"
  }
};
fs.writeFileSync(path.join(frontendDir, 'package.json'), JSON.stringify(packageJson, null, 2));

// 2. app/page.jsx (Next.js App Router)
const appDir = path.join(frontendDir, 'app');
if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

const pageContent = `
import fs from 'fs';
import path from 'path';

function getLatestData() {
  try {
    const articlePath = path.join(process.cwd(), '..', 'data', 'generated_article.json');
    const logPath = path.join(process.cwd(), '..', 'logs', 'execution_log.json');
    
    const article = fs.existsSync(articlePath) ? JSON.parse(fs.readFileSync(articlePath, 'utf8')) : null;
    const logs = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, 'utf8')) : [];
    
    return { article, logs };
  } catch (e) {
    return { article: null, logs: [] };
  }
}

export default function Home() {
  const { article, logs } = getLatestData();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6 border-t-4 border-indigo-600">
          <h1 className="text-3xl font-bold text-gray-900">Bali Hotel AI Agent Auto-Pilot 🌴</h1>
          <p className="mt-2 text-gray-600">
            AI Agent otonom 24 jam (Track B) yang otomatis melakukan Scrape → Mikir → Nulis → Publish tiap 2 jam.
          </p>
        </div>

        {/* Latest Article Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📝 Artikel AI Terbaru</h2>
          {article ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium">Area: {article.area}</span>
                <span>Dibuat: {new Date(article.createdAt).toLocaleString('id-ID')}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{article.title}</h3>
              <div className="bg-gray-50 p-4 rounded-md border whitespace-pre-line text-gray-700 text-sm">
                {article.content}
              </div>
              <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-800">
                <strong>Image Prompt:</strong> {article.imagePrompt}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Belum ada artikel yang digenerate.</p>
          )}
        </div>

        {/* Execution Logs */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Live Execution Logs (24/7 Agent)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Waktu</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Area</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Status</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Target Publish</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.length > 0 ? logs.map((log, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-600">{new Date(log.timestamp).toLocaleString('id-ID')}</td>
                    <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-900">{log.area}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 font-bold">{log.status}</span>
                    </td>
                    <td className="px-4 py-2 text-gray-500 text-xs">{log.target}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">Belum ada log eksekusi.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
`;
fs.writeFileSync(path.join(appDir, 'page.jsx'), pageContent);

// 3. app/layout.jsx
const layoutContent = `
import './globals.css';

export const metadata = {
  title: 'Hotel Auto-Pilot AI Agent',
  description: 'AI Agent 24 Jam Bali Hotel Blog Generator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
`;
fs.writeFileSync(path.join(appDir, 'layout.jsx'), layoutContent);

// 4. app/globals.css
const cssContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;
fs.writeFileSync(path.join(appDir, 'globals.css'), cssContent);

console.log('[Frontend] Berhasil membuat struktur Next.js App di puna/projects/hotel-autopilot/frontend/');
