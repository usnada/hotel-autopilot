# PLAN.md - Arsitektur & Tech Stack AI Agent Hotel Auto-Pilot

## 1. Tech Stack Pilihan (Lolos Standar Juri)
- **Frontend / Web**: Next.js + Tailwind CSS (siap deploy di Vercel atau Puna Server).
- **Scraping Engine**: Firecrawl API / Parse.bot (legal, aman dari anti-bot, terstruktur).
- **AI Reasoning & Generation**: OpenRouter API / Antigravity Pool (`gemini-3.5-flash-lite` atau model cost-effective lainnya).
- **Scheduler**: Vercel Cron / GitHub Actions / Cron Job internal (berjalan otomatis tiap 2 jam).
- **Auto Publish**: WordPress REST API (`wp.puna.web.id`) / Webhook / Next.js API Routes.

## 2. Arsitektur Sistem
```
[ Cron Trigger (Tiap 2 Jam) ]
           │
           ▼
[ Firecrawl / Data Fetcher ] ──► Mengambil data hotel Bali
           │
           ▼
[ AI Agent Processor ] ──────► Menganalisis & Menulis Artikel + Prompt Gambar
           │
           ▼
[ Auto Publish Engine ] ─────► Publish ke WordPress / Web Frontend
           │
           ▼
[ Log & Deliverable Store ] ─► Menyimpan log AI coding & eksekusi cron
```

## 3. Struktur Database / Penyimpanan
- Menyimpan cache data hotel dan history artikel di SQLite atau direktori lokal `data/articles.json` agar mudah diverifikasi juri.
