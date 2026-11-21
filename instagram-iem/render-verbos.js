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
  'arte-celebrar-fortalecer-profetizar': `
<div class="post" style="background:#fff8ee">
  <div class="abs cap" style="top:70px;left:0;right:0;text-align:center;color:#3a0b2b;font-size:26px">Último bimestre do ano</div>
  <div class="abs dms" style="top:110px;left:0;right:0;text-align:center;color:#3a0b2b;font-size:96px">É tempo de…</div>

  <div class="abs" style="left:0;right:0;top:250px;height:320px;background:#e0337b;overflow:hidden">
    <svg class="abs" style="inset:0" width="1080" height="320">${Array.from({ length: 34 }, (_, i) => { const c = ['#ffd23f', '#fff', '#7ee0ff', '#ff9f43'][i % 4]; const x = (i * 211) % 1080, y = (i * 97) % 300 + 10; return i % 2 ? `<rect x="${x}" y="${y}" width="12" height="26" rx="3" fill="${c}" opacity=".9" transform="rotate(${i * 41} ${x} ${y})"/>` : `<circle cx="${x}" cy="${y}" r="7" fill="${c}" opacity=".9"/>`; }).join('')}</svg>
    <div class="abs bebas" style="left:70px;top:40px;font-size:215px;color:#fff">CELEBRAR</div>
    <div class="abs" style="left:76px;bottom:28px;font-size:28px;font-weight:600;color:#ffe4ef">a graça e as conquistas que nos trouxeram até aqui</div>
  </div>

  <div class="abs" style="left:0;right:0;top:570px;height:320px;background:#0f5e66;overflow:hidden">
    <svg class="abs" style="right:30px;top:60px;transform:scale(.72);transform-origin:right top" width="220" height="260">
      ${[0, 1, 2, 3].map(r => [0, 1, 2].map(c => `<rect x="${c * 72 + (r % 2 ? 36 : 0) - 18}" y="${200 - r * 58}" width="66" height="50" rx="6" fill="${r === 3 ? '#ffd23f' : '#7fd6cf'}" opacity="${0.55 + r * 0.12}"/>`).join('')).join('')}
    </svg>
    <div class="abs bebas" style="left:70px;top:40px;font-size:215px;color:#fff">FORTALECER</div>
    <div class="abs" style="left:76px;bottom:28px;font-size:28px;font-weight:600;color:#c9f1ec">os projetos que Deus nos deu para começar</div>
  </div>

  <div class="abs" style="left:0;right:0;top:890px;height:320px;background:linear-gradient(90deg,#ff7a1a,#ffc93c);overflow:hidden">
    <svg class="abs" style="left:0;top:0" width="1080" height="320">
      ${[0, 1, 2, 3, 4].map(i => `<path d="M${975 + i * 26} ${80 - i * 14} Q ${1010 + i * 36} 160 ${975 + i * 26} ${240 + i * 14}" stroke="#fff" stroke-width="8" fill="none" opacity="${0.9 - i * 0.15}" stroke-linecap="round"/>`).join('')}
      <circle cx="945" cy="160" r="26" fill="#fff" opacity=".95"/>
    </svg>
    <div class="abs bebas" style="left:70px;top:40px;font-size:215px;color:#3a0b2b">PROFETIZAR</div>
    <div class="abs" style="left:76px;bottom:28px;font-size:28px;font-weight:700;color:#3a0b2b">um novo ciclo para a casa, a célula, a Igreja e a cidade</div>
  </div>

  <div class="abs" style="left:72px;bottom:56px;color:#3a0b2b;font-weight:700;letter-spacing:.16em;font-size:22px">EFÉSIOS 1 · @EWANDERMACEDO</div>
  <div class="abs" style="right:72px;bottom:44px;background:#3a0b2b;padding:10px 18px;border-radius:10px"><img src="${img('logo_IEM.png')}" style="height:28px;display:block"></div>
</div>`,
};
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html6'), { recursive: true });
  for (const [name, body] of Object.entries(posts)) {
    if (ONLY && !name.includes(ONLY)) continue;
    const f = path.join(S, 'html6', name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
