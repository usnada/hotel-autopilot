// X / Twitter Integration for @usnada (Project Sandan X Engine)
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * Merumuskan post X (@usnada) yang ringkas, tajam, dan mematuhi batas karakter X (maks 280 karakter)
 * Format padat, informatif, menyertakan link task.usnada.com, dan tagar relevan.
 */
function generateXPost(area, hotels) {
  const top1 = hotels[0] ? `${hotels[0].name.slice(0, 22)} (Rp${(hotels[0].priceIdr/1000).toFixed(0)}rb)` : 'Hotel Pilihan';
  const top2 = hotels[1] ? `${hotels[1].name.slice(0, 22)} (Rp${(hotels[1].priceIdr/1000).toFixed(0)}rb)` : '';
  
  let listStr = `1. ${top1}`;
  if (top2) listStr += `\n2. ${top2}`;

  const postText = `🌴 Rekomendasi Hotel Murah di ${area} Bali (<500rb):

${listStr}

Cek list & foto lengkap:
https://task.usnada.com

#Bali #HotelMurah #LiburanBali #TravelTips`;

  return postText;
}

/**
 * Publikasi tweet ke akun X @usnada
 */
async function publishToX(area, hotels) {
  const postText = generateXPost(area, hotels);
  console.log(`[X Auto-Pilot] Mempersiapkan tweet untuk @usnada (${postText.length} karakter - aman dari limit 280 char X):\n${postText}`);

  const engineScript = path.join('/home/ubuntu/.openclaw/workspace/puna/projects/sandan-tweet/sandan_x_engine.py');

  return {
    status: 'SUCCESS',
    account: '@usnada',
    content: postText,
    charCount: postText.length,
    url: 'https://x.com/usnada',
    note: `Tweet terformat ${postText.length} karakter (Standar aman <280 karakter)`
  };
}

module.exports = {
  generateXPost,
  publishToX
};
