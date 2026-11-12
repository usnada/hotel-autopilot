# SPEC.md - Project Hotel Auto-Pilot (Track B)

## 1. Tujuan Proyek
Membangun AI Agent otonom yang bekerja 24 jam penuh dengan siklus otomatis tiap 2 jam:
1. **Scrape**: Mengambil data direktori hotel valid di Bali (contoh: Kuta, Seminyak, Canggu, Ubud) menggunakan Firecrawl/parser legal.
2. **Mikir (AI Analysis)**: Menganalisis data, merumuskan sudut pandang artikel (misal: "5 Hotel Murah Dekat Pantai Kuta di Bawah 500rb"), dan menyusun struktur konten.
3. **Nulis (Content Generation)**: Menghasilkan artikel blog lengkap beserta prompt gambar yang estetis dan SEO-friendly menggunakan AI.
4. **Publish & Share**: Mengirimkan hasil artikel secara otomatis ke web platform (Next.js / WordPress `wp.puna.web.id`) dan mencatat log eksekusi.

## 2. Target Pengguna & Use Case
- Traveler yang mencari rekomendasi hotel spesifik dan akurat di Bali secara berkala.
- Juri kompetisi yang menilai kedisiplinan *Spec-Driven Development* dan pemanfaatan *AI Vibe Coding*.

## 3. Input & Output Spesifikasi
- **Input**: Query target area di Bali (misal: "Kuta", "Canggu"), parameter budget, dan interval waktu (tiap 2 jam).
- **Output**: 
  - File/database artikel blog (JSON/Markdown).
  - Postingan live di platform web/WordPress.
  - Log interaksi AI agent (*AI coding agent logs* untuk bukti deliverable).
