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
html,body{width:1080px;overflow:hidden;font-family:Inter,sans-serif}
.post{position:relative;width:1080px;height:100vh;overflow:hidden}
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
  ...(() => {
  const BG = '#4A6644', INK = '#F7F3EA', SUB = '#DCE5D3', SAGE = '#CFE3B8', SAGE_BG = '#F7F3EA', MUTE = '#B9C9AE';
  const content = (H, s) => `
<div class="post" style="background:${BG}">
  <div class="abs" style="top:${s.top}px;left:80px;right:80px">
    <div style="color:${SAGE};font-weight:700;letter-spacing:.28em;font-size:${s.k}px">É NESTE FIM DE SEMANA</div>
    <div style="margin-top:${s.g1}px;color:${SUB};font-size:${s.r}px;letter-spacing:.06em">Retiro</div>
    <div class="dms" style="color:${INK};font-size:${s.t}px;line-height:.95;margin-top:-6px">Religar</div>
    <div class="dms" style="margin-top:${s.g2}px;color:${INK};font-size:${s.q}px;line-height:1.15">Às vezes, tudo o que precisamos é <i style="color:${SAGE}">pausar</i> para ouvir a voz de Deus novamente.</div>
    <div style="margin-top:${s.g3}px;color:${SUB};font-size:${s.p}px;line-height:1.5">Um tempo para desacelerar, refletir e permitir que Deus realinhe o coração.</div>
  </div>
  <div class="abs" style="left:80px;right:80px;bottom:${s.bb}px;background:${SAGE_BG};border-radius:24px;padding:${s.pad}px 44px">
    <div style="color:#2F4A2B;font-weight:800;font-size:${s.d}px">27 e 28 de novembro</div>
    <div style="color:#5F7A55;font-weight:700;font-size:${s.d2}px;margin-top:8px">sexta e sábado · Pousada Vila do Sossego</div>
  </div>
  <div class="abs" style="left:80px;bottom:${s.fb}px;color:${MUTE};font-weight:700;letter-spacing:.16em;font-size:20px">PR. EWANDER MACEDO · IGREJA EM MOVIMENTO</div>
</div>`;
  return {
    'religar-feed': content(1350, { top: 110, k: 22, g1: 70, r: 40, t: 170, g2: 60, q: 56, g3: 34, p: 31, bb: 140, pad: 34, d: 46, d2: 30, fb: 64 }),
    'religar-story': content(1920, { top: 300, k: 26, g1: 90, r: 48, t: 210, g2: 80, q: 66, g3: 44, p: 36, bb: 330, pad: 42, d: 54, d2: 34, fb: 260 }),
  };
  })(),
};
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html16'), { recursive: true });
  for (const [name, body] of Object.entries(posts)) {
    if (ONLY && !name.includes(ONLY)) continue;
    const f = path.join(S, 'html16', name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.setViewportSize({ width: 1080, height: name.includes('story') ? 1920 : 1350 });
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
