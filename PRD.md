# 📄 Product Requirements Document (PRD)
## Project Hotel Auto-Pilot (Track B)
**Version:** 2.0.0  
**Status:** Live & Production Ready  
**Owner:** K. Usnada (@usnada)  
**Maintained by:** Susi & Puna Team  
**Last Updated:** November 2026  

---

## 1. Executive Summary & Product Vision
**Project Hotel Auto-Pilot** adalah sistem AI Agent otonom yang beroperasi 24 jam penuh (24/7) tanpa intervensi manusia untuk memenuhi tantangan kompetisi **Pilihan B - Track B (Autonomous 24h AI Content & Multi-Platform Publishing)**.

Sistem bekerja secara siklis setiap 2 jam untuk:
1. Mengumpulkan data direktori akomodasi ramah anggaran (*budget hotels* di bawah Rp500.000) di Bali (Kuta, Canggu, Seminyak, Ubud).
2. Melakukan penalaran AI untuk menyusun artikel blog komprehensif, rekomendasi bernilai tinggi, dan prompt gambar estetis.
3. Mempublikasikan konten secara terpadu ke berbagai channel:
   - **Web Portal Resmi**: `https://task.usnada.com` (dan `task.puna.web.id`)
   - **WordPress CMS**: `https://wp.puna.web.id` (Kategori: Hotel Bali)
   - **TikTok Channel**: `@namrucoding` (Video vertikal 9:16 + Caption ramah algoritma)
   - **X / Twitter**: `@usnada` (Microblogging informatif <280 karakter)
4. Mengarsipkan seluruh postingan secara akumulatif dan persisten agar tidak ada histori yang hilang.

---

## 2. Problem Statement & User Personas
### 2.1. Masalah yang Diselesaikan
- **Traveler & Digital Nomad**: Kesulitan menemukan akomodasi murah berkualitas di Bali tanpa harus menyisir puluhan situs OTA secara manual setiap hari.
- **Content Creator & Marketer**: Beban kerja tinggi untuk memproduksi konten lintas platform (Blog, Web, Video TikTok, dan Tweet X) secara konsisten dan teratur setiap 2 jam.
- **Standar Penilaian Juri Kompetisi**: Membutuhkan bukti nyata penerapan *Spec-Driven Development* dan *Autonomous AI Vibe Coding* yang dapat diverifikasi secara transparan.

### 2.2. Target Persona
- **Budget Traveler / Backpacker**: Mencari rekomendasi penginapan di bawah Rp500.000 dengan rating tinggi dan lokasi strategis.
- **Juri & Auditor Kompetisi**: Menilai kepatuhan spesifikasi, kemandirian sistem, stabilitas cron 24 jam, dan arsip riwayat eksekusi.

---

## 3. Goals & Success Metrics (KPIs)

| Metrik Kunci | Target | Realisasi Saat Ini |
|---|---|---|
| **Otonomi Eksekusi** | Berjalan 100% tanpa campur tangan manual | ✅ Berjalan via cron 2 jam di background |
| **Multi-Platform Sync** | Minimal 3 platform terintegrasi | ✅ 4 Platform (Web, WP, TikTok, X) |
| **Persistensi Data** | Semua postingan masa lalu tetap tersimpan | ✅ Tersimpan akumulatif di `data/articles.json` |
| **Kecepatan Respons Portal** | Waktu muat < 1 detik | ✅ Didukung Cloudflare Edge CDN & Nginx Reverse Proxy |
| **Kepatuhan Aturan Platform** | 0 pelanggaran format/karakter | ✅ X <280 char, TikTok 9:16 video + caption teroptimasi |

---

## 4. Alur Kerja Sistem (Pipeline Architecture)

```
[ Cron Scheduler (Tiap 2 Jam) ]
                │
                ▼
   [ Data Scraper (scraper.js) ] ────────► Filter Hotel Bali < Rp500rb
                │
                ▼
[ AI Content Engine (generator.js) ] ───► Artikel SEO + Prompt Gambar + Arsip articles.json
                │
                ▼
[ Multi-Publisher (publisher.js) ]
       ├──► 1. WordPress REST API (wp.puna.web.id)
       ├──► 2. TikTok Studio via Chromium (tiktok_helper.js @namrucoding)
       ├──► 3. X / Twitter via Chromium (x_helper.js @usnada)
       └──► 4. Web Portal Live Dashboard (task.usnada.com)
                │
                ▼
[ Execution Logger (execution_log.json) & Notifikasi Telegram ]
```

---

## 5. Spesifikasi Fitur Detail

### 5.1. Modul Scraper & Kurasi Data (`scraper.js`)
- Mengambil dataset hotel di 4 area utama: **Kuta**, **Canggu**, **Seminyak**, dan **Ubud**.
- Filter harga ketat: **≤ Rp500.000 / malam**.
- Parameter output terstruktur: `id`, `name`, `area`, `priceIdr`, `rating`, `highlights`, `source`.

### 5.2. AI Content Generator & Archiver (`generator.js`)
- Merumuskan judul berbasis tanggal real-time `(DD/MM/YYYY)`.
- Menyusun artikel lengkap dengan estimasi harga, rating bintang, dan keunggulan akomodasi.
- Merumuskan prompt fotografi hotel 4K bergaya sinematik.
- **Penyimpanan Akumulatif**: Menambahkan postingan baru ke daftar teratas `data/articles.json` serta memperbarui `generated_article.json` untuk backward-compatibility.

### 5.3. Multi-Platform Auto-Publish Engine (`publisher.js`)
1. **WordPress REST API**:
   - Autentikasi aman JWT Token (`wp-json/jwt-auth/v1/token`).
   - Publikasi artikel dengan tag HTML rapi ke Kategori **Hotel Bali** (ID: `17`).
2. **TikTok Auto-Poster (`tiktok_helper.js`)**:
   - Menghasilkan video vertikal 9:16 (1080x1920) H.264 via FFmpeg.
   - Menyusun caption padat (<350 karakter) lengkap dengan hook, top rekomendasi, link web, dan hashtag `#HotelBali #fyp`.
   - Otomasi unggah ke akun `@namrucoding`.
3. **X (Twitter) Auto-Poster (`x_helper.js`)**:
   - Format microblogging ringkas (<280 karakter).
   - Menyertakan tautan langsung `https://task.usnada.com` dan tagar perjalanan.
   - Eksekusi unggah otomatis ke akun `@usnada`.

### 5.4. Live Web Dashboard (`server.js`)
- Dijalankan di port internal `3115` dan di-proxy ke domain resmi.
- Menampilkan:
  - Header status agent & total arsip postingan.
  - Seksi *Featured Article* untuk postingan teranyar.
  - Seksi *Accordion Archives* untuk membuka dan membaca semua artikel lama.
  - Tabel *Live Execution Logs* untuk audit audit trail publikasi multi-platform.

---

## 6. Tech Stack & Spesifikasi Infrastruktur

| Komponen | Teknologi / Layanan | Konfigurasi |
|---|---|---|
| **Runtime & Server** | Node.js v22 LTS / Express | Port `3115` dikelola PM2 (`hotel-autopilot-3115`) |
| **Reverse Proxy** | Nginx 1.24 (Ubuntu) | SSL Let's Encrypt + Auto HTTP to HTTPS |
| **DNS & CDN** | Cloudflare Anycast CDN | Domain: `task.usnada.com` & `task.puna.web.id` (Proxied) |
| **Automasi Browser** | Chromium Headless + CDP (Port `9222`) | Docker `puna-chrome-web` |
| **Video Processing** | FFmpeg 6.1 (libx264, 1080x1920) | Output MP4 25fps vertical format |
| **CMS Target** | WordPress 6.x (`wp.puna.web.id`) | JWT Authentication + WP REST API v2 |
| **Version Control** | Git & GitHub | `https://github.com/usnada/hotel-autopilot` |

---

## 7. Deliverables untuk Juri & Penguji

1. **GitHub Repository Publik**:  
   👉 `https://github.com/usnada/hotel-autopilot`
2. **Live Web App Portal**:  
   👉 `https://task.usnada.com` (Cadangan: `https://task.puna.web.id`)
3. **Live CMS Postings**:  
   👉 `https://wp.puna.web.id/category/hotel-bali/`
4. **Live Social Media Channels**:  
   👉 TikTok: `https://www.tiktok.com/@namrucoding`  
   👉 X / Twitter: `https://x.com/usnada`
5. **Spec-Driven Documents**:  
   - `PRD.md` (Dokumen ini)
   - `SPEC.md` (Spesifikasi fungsional)
   - `PLAN.md` (Rencana arsitektur & milestone)
   - `TASKS.md` (Checklist pengerjaan task)
   - `AI_CODING_LOGS.md` (Bukti log sesi coding AI otonom)
