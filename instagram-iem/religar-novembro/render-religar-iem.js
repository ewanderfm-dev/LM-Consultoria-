// Arte "Celebrar, Fortalecer, Profetizar" na identidade visual da IEM (cores e fontes do site).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const S = __dirname;
const OUT = process.argv[2];
const img = f => 'file://' + path.join(S, 'img', f);
const F = f => 'file://' + path.join(S, 'fonts3', f);

// Paleta oficial (variáveis globais do site igrejaemmovimento.com.br)
const C = { moss: '#24281F', moss2: '#3E4532', olive: '#5D6453', olive2: '#787A57', khaki: '#CCC88C', lime: '#D0E6A5', butter: '#FFDD94', peach: '#FFBC7D', off: '#F1F2F2' };

const base = `
@font-face{font-family:Giovanna;src:url(${F('202Giovanna.woff2')})}
@font-face{font-family:Nunito;src:url(${F('package/files/nunito-latin-400-normal.woff2')});font-weight:400}
@font-face{font-family:Nunito;src:url(${F('package/files/nunito-latin-700-normal.woff2')});font-weight:700}
@font-face{font-family:Nunito;src:url(${F('package/files/nunito-latin-800-normal.woff2')});font-weight:800}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;overflow:hidden;font-family:Nunito,sans-serif}
.post{position:relative;width:1080px;height:100vh;overflow:hidden}
.abs{position:absolute}
.gio{font-family:Giovanna;line-height:1}
.grad{background:linear-gradient(90deg,${C.lime},${C.butter});-webkit-background-clip:text;color:transparent}
`;

const wave = (y, color, op = 1, amp = 14) => `<path d="M0 ${y} ${Array.from({ length: 12 }, (_, i) => `Q ${i * 90 + 45} ${y + (i % 2 ? amp : -amp)} ${(i + 1) * 90} ${y}`).join(' ')}" stroke="${color}" stroke-width="3" fill="none" opacity="${op}"/>`;

const verbs = [
  ['Celebrar', 'a graça e as conquistas que nos trouxeram até aqui', C.butter],
  ['Fortalecer', 'os projetos que Deus nos deu para começar', C.lime],
  ['Profetizar', 'um novo ciclo para a casa, a célula, a Igreja e a cidade', 'grad'],
];

const GOLD = 'linear-gradient(100deg,#FFE7A8 0%,#E9C46A 45%,#C9A042 100%)';
const gold = `background:${GOLD};-webkit-background-clip:text;color:transparent`;
const art = (s) => `
<div class="post" style="background:radial-gradient(circle at 80% 12%,${C.olive} 0,transparent 55%),radial-gradient(circle at 10% 100%,${C.moss2} 0,transparent 60%),${C.moss2}">
  <div class="abs" style="inset:${s.inset}px;border:2px solid rgba(233,196,106,.45);border-radius:28px"></div>
  <img class="abs" src="${img('logo_IEM.png')}" style="height:${s.logo}px;left:50%;transform:translateX(-50%);top:${s.top}px">
  <div class="abs" style="top:${s.top + s.g0}px;left:0;right:0;text-align:center;color:${C.khaki};font-weight:800;letter-spacing:.34em;font-size:${s.k}px">É NESTE FIM DE SEMANA</div>
  <div class="abs" style="top:${s.top + s.g0 + s.g1}px;left:0;right:0;text-align:center;color:#E9C46A;font-weight:700;letter-spacing:.5em;font-size:${s.r}px">RETIRO</div>
  <div class="abs gio" style="top:${s.top + s.g0 + s.g1 + s.g2}px;left:0;right:0;text-align:center;font-size:${s.t}px;${gold}">Religar</div>
  <div class="abs" style="top:${s.qy}px;left:${s.side}px;right:${s.side}px;text-align:center;color:${C.off};font-weight:700;font-size:${s.q}px;line-height:1.4">Às vezes, tudo o que precisamos é <span style="${gold}">pausar</span> para ouvir a voz de Deus novamente.</div>
  <div class="abs" style="top:${s.dy}px;left:0;right:0;display:flex;justify-content:center">
    <div style="border:2px solid #E9C46A;border-radius:999px;padding:${s.pad}px 46px;text-align:center">
      <div style="${gold};font-weight:800;font-size:${s.d}px;letter-spacing:.04em">27 E 28 DE NOVEMBRO</div>
    </div>
  </div>
  <div class="abs" style="top:${s.dy + s.g3}px;left:0;right:0;text-align:center;color:${C.khaki};font-weight:700;font-size:${s.d2}px">sexta e sábado · Pousada Vila do Sossego</div>
</div>`;
const posts = {
  'religar-iem-feed': art({ inset: 40, logo: 44, top: 210, g0: 110, k: 22, g1: 60, r: 26, g2: 50, t: 230, qy: 740, side: 120, q: 40, dy: 960, pad: 18, d: 40, g3: 120, d2: 30 }),
  'religar-iem-story': art({ inset: 48, logo: 50, top: 300, g0: 130, k: 26, g1: 80, r: 30, g2: 60, t: 205, qy: 900, side: 110, q: 48, dy: 1200, pad: 22, d: 46, g3: 140, d2: 34 }),
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html17'), { recursive: true });
  for (const [name, body] of Object.entries(posts)) {
    const f = path.join(S, 'html17', name + '.html');
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
