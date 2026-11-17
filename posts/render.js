// Uso: node posts/render.js posts/2026-11-14/post.json
// Gera arte.png (1080x1350, formato retrato do LinkedIn) na mesma pasta do JSON.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const jsonPath = path.resolve(process.argv[2]);
  const post = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  // Foto local (caminho relativo ao post.json) vira data URI para carregar no render
  if (post.photo && !/^(https?:|data:)/.test(post.photo)) {
    const f = path.resolve(path.dirname(jsonPath), post.photo);
    const ext = path.extname(f).slice(1).toLowerCase().replace('jpg', 'jpeg');
    post.photo = `data:image/${ext};base64,` + fs.readFileSync(f).toString('base64');
  }
  const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
  const html = template.replace('<script>', `<script>window.POST = ${JSON.stringify(post)};`);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const out = process.argv[3] ? path.resolve(process.argv[3]) : path.join(path.dirname(jsonPath), 'arte.png');
  await page.screenshot({ path: out });
  await browser.close();
  console.log(out);
})();
