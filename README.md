# README.md - Project Hotel Auto-Pilot (Track B)

Proyek AI Agent otonom yang bekerja 24 jam penuh untuk melakukan scraping data hotel Bali, analisis AI, pembuatan artikel blog, serta publikasi otomatis secara berkala setiap 2 jam.


## 🌐 Live Services & Multi-Platform Publishing
- **Web Dashboard**: [https://task.usnada.com](https://task.usnada.com)
- **WordPress Live Category**: [https://wp.puna.web.id/category/hotel-bali/](https://wp.puna.web.id/category/hotel-bali/)
- **TikTok Automated Channel**: [@namrucoding](https://www.tiktok.com/@namrucoding)
- **X (Twitter) Channel**: [@usnada](https://x.com/usnada)
- **GitHub Repository**: [https://github.com/usnada/hotel-autopilot](https://github.com/usnada/hotel-autopilot)

## 🚀 Fitur Utama
- **Scraper Modul (`scraper.js`)**: Mengambil data direktori hotel valid di Bali (Kuta, Canggu, Seminyak, Ubud).
- **AI Content Generator (`generator.js`)**: Menyusun artikel blog SEO-friendly lengkap dengan prompt gambar estetis.
- **Auto-Publish Engine (`publisher.js`)**: Publikasi otomatis dan pencatatan log berkala ke `logs/execution_log.json`.
- **Frontend Dashboard (`frontend/`)**: Dashboard web Next.js + Tailwind CSS untuk menampilkan hasil artikel dan live execution logs.
- **Scheduler Otomatis**: Terintegrasi dengan sistem Cron (berjalan tiap 2 jam).

## 📁 Struktur Direktori
- `SPEC.md` — Spesifikasi fungsional & alur kerja
- `PLAN.md` — Arsitektur & Tech Stack
- `TASKS.md` — Checklist pengerjaan task
- `PRD.md` — Product Requirements Document
- `AI_CODING_LOGS.md` — Rekam jejak AI coding agent logs
- `scraper.js` — Modul Scraper Hotel Bali
- `generator.js` — Modul AI Content Generator
- `publisher.js` — Modul Auto-Publish & Log
- `frontend/` — Next.js Web App

## 📋 Deliverable Juri
1. **GitHub Repository**: Publik dan terdokumentasi lengkap.
2. **Live Web App**: Dashboard Next.js siap deploy ke Vercel.
3. **Live Logs & Posts**: Tercatat otomatis di `logs/execution_log.json`.
4. **Raw AI Coding Logs**: Terdokumentasi di `AI_CODING_LOGS.md`.
