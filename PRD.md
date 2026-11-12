# PRD.md - Product Requirements Document: Project Hotel Auto-Pilot (Track B)

## 1. Overview & Latar Belakang
Proyek ini adalah AI Agent otonom yang dirancang untuk memenuhi tantangan kompetisi **Pilihan B - Track B**. Agent bekerja tanpa henti (24/7) dengan siklus otomatis setiap 2 jam untuk melakukan pengumpulan data hotel, analisis tren, pembuatan artikel blog berkualitas dengan prompt gambar, serta melakukan publikasi otomatis ke web/WordPress dan media sosial.

## 2. Tujuan Produk (Goals & Objectives)
- **Otomatisasi Penuh (24 Jam)**: Berjalan secara berkala setiap 2 jam tanpa intervensi manual.
- **Spec-Driven Development**: Menggunakan standar pengembangan berbasis dokumen (`SPEC.md`, `PLAN.md`, `TASKS.md`, `PRD.md`) untuk memastikan transparansi di depan juri.
- **Compliance & Legalitas**: Menggunakan API legal (Firecrawl / Parse.bot) untuk scraping data hotel di Bali tanpa risiko *anti-bot block*.
- **Multi-Platform Publishing**: Terintegrasi dengan web frontend (Next.js) dan WordPress REST API (`wp.puna.web.id`).

## 3. Fitur Utama (Core Features)
1. **Data Scraper Module (`scraper.js`)**: Mengambil data direktori hotel valid di Bali (area Kuta, Canggu, Seminyak, Ubud) secara terstruktur.
2. **AI Content Generator (`generator.js`)**: Menganalisis data, menyusun artikel SEO-friendly lengkap dengan judul, estimasi harga, rating, highlight, dan prompt gambar estetis.
3. **Auto-Publish Engine (`publisher.js`)**: Mempublikasikan artikel secara otomatis dan mencatat log eksekusi ke `logs/execution_log.json`.
4. **Scheduler Integration**: Dijalankan otomatis melalui Vercel Cron / GitHub Actions / Cron internal.

## 4. Tech Stack
- **Frontend / Web**: Next.js + Tailwind CSS (Vercel deployment)
- **Scraping**: Firecrawl API / Parse.bot
- **AI Engine**: OpenRouter API / Antigravity Pool (`gemini-3.5-flash-lite`)
- **Publishing**: WordPress REST API (`wp.puna.web.id`)

## 5. Deliverables untuk Juri
- Public GitHub Repository Link
- Live Web App Deployment Link (Vercel / Netlify)
- Live Social Media / Blog Posts Link (Minimal 3-5 post otomatis)
- Raw AI Coding Agent Logs (Cursor / Susi Session Logs)
