// Série v2 — paletas e estilos variados por série. Gera PNGs 1080x1350.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const S = __dirname;
const OUT = process.argv[2];
const ONLY = process.argv[3];
const img = f => 'file://' + path.join(S, 'img', f);
const f1 = f => 'file://' + path.join(S, 'fonts/package/files', f);
const f2 = (pkg, f) => 'file://' + path.join(S, 'fonts2', 'fontsource-' + pkg, 'package/files', f);

const base = `
@font-face{font-family:PF;src:url(${f1('playfair-display-latin-700-normal.woff2')});font-weight:700}
@font-face{font-family:PF;src:url(${f1('playfair-display-latin-700-italic.woff2')});font-weight:700;font-style:italic}
@font-face{font-family:PF;src:url(${f1('playfair-display-latin-400-italic.woff2')});font-weight:400;font-style:italic}
@font-face{font-family:Bebas;src:url(${f2('bebas-neue-5.3.0', 'bebas-neue-latin-400-normal.woff2')})}
@font-face{font-family:DMS;src:url(${f2('dm-serif-display-5.3.0', 'dm-serif-display-latin-400-normal.woff2')})}
@font-face{font-family:DMS;font-style:italic;src:url(${f2('dm-serif-display-5.3.0', 'dm-serif-display-latin-400-italic.woff2')})}
@font-face{font-family:Hand;src:url(${f2('caveat-5.3.0', 'caveat-latin-700-normal.woff2')})}
@font-face{font-family:Blk;src:url(${f2('archivo-black-5.3.0', 'archivo-black-latin-400-normal.woff2')})}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;font-family:Inter,sans-serif}
.post{position:relative;width:1080px;height:1350px;overflow:hidden}
.abs{position:absolute}
.cover{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.bebas{font-family:Bebas;line-height:.86;letter-spacing:.01em}
.dms{font-family:DMS;line-height:1.05}
.pf{font-family:PF;font-weight:700;line-height:1.06}
.hand{font-family:Hand;line-height:1.05}
.blk{font-family:Blk;line-height:.95;letter-spacing:-.02em}
.cap{font-weight:700;letter-spacing:.28em;text-transform:uppercase;font-size:22px}
.txt{font-size:30px;line-height:1.45}
.duo{position:absolute;overflow:hidden}
.duo img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.15);mix-blend-mode:multiply;display:block}
.duo::after{content:'';position:absolute;inset:0;background:var(--dk);mix-blend-mode:lighten}
`;
const sig = (c, pos = 'left:72px;bottom:64px') => `<div class="abs" style="${pos};font-weight:600;font-size:22px;letter-spacing:.1em;color:${c}">@ewandermacedo</div>`;
const logo = (h, pos) => `<img class="abs" src="${img('logo_IEM.png')}" style="height:${h}px;${pos}">`;
const grain = `<svg class="abs" style="inset:0;opacity:.18;mix-blend-mode:multiply" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .5 0"/></filter><rect width="1080" height="1350" filter="url(#n)"/></svg>`;

const posts = {
  'frase-loucura-sobrenatural': `
<div class="post" style="background:#160d2e">
  <img class="abs" src="${img('pastor-palco.jpg')}" style="left:0;top:250px;width:1080px;height:1440px;object-fit:cover;filter:saturate(.9)">
  <div class="abs" style="inset:0;background:linear-gradient(180deg,#160d2e 0%,#160d2e 30%,rgba(22,13,46,.6) 42%,rgba(22,13,46,0) 55%,rgba(22,13,46,0) 66%,rgba(22,13,46,.9) 82%,#160d2e 92%)"></div>
  <svg class="abs" style="inset:0" width="1080" height="1350">
    ${Array.from({ length: 55 }, (_, i) => `<circle cx="${(i * 157) % 1080}" cy="${(i * 67) % 420 + 20}" r="${i % 3 + 1}" fill="#fff" opacity="${0.2 + (i % 5) / 9}"/>`).join('')}
    <g transform="translate(940 110)"><path d="M0 -26 L7 -7 L26 0 L7 7 L0 26 L-7 7 L-26 0 L-7 -7Z" fill="#ffd36b"/></g>
  </svg>
  <div class="abs" style="top:80px;left:72px;color:#c9b8ff;font-weight:700;letter-spacing:.28em;font-size:20px">SONHE UM SONHO MAIOR · GÊNESIS 37</div>
  <div class="abs dms" style="top:140px;left:72px;right:110px;color:#fff;font-size:78px;line-height:1.08">Todo grande sonho, no princípio, <i style="color:#ffd36b">parece loucura.</i></div>
  <div class="abs" style="bottom:150px;left:72px;right:72px">
    <div style="width:90px;height:5px;background:#ffd36b;border-radius:3px;margin-bottom:26px"></div>
    <div class="dms" style="color:#fff;font-size:52px;line-height:1.15">Um sonho <i style="color:#c9b8ff">sobrenatural</i> se realizará por um caminho <i style="color:#ffd36b">sobrenatural.</i></div>
  </div>
  <div class="abs" style="left:72px;bottom:62px;color:#c9b8ff;font-weight:700;letter-spacing:.16em;font-size:20px">PR. EWANDER MACEDO</div>
  <img class="abs" src="${img('logo_IEM.png')}" style="height:30px;right:72px;bottom:56px">
</div>`,
};
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html13'), { recursive: true });
  for (const [name, body] of Object.entries(posts)) {
    if (ONLY && !name.includes(ONLY)) continue;
    const f = path.join(S, 'html13', name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
