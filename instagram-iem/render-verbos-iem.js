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
html,body{width:1080px;height:1350px;overflow:hidden;font-family:Nunito,sans-serif}
.post{position:relative;width:1080px;height:1350px;overflow:hidden}
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

const posts = {
  'arte-celebrar-fortalecer-profetizar-iem': `
<div class="post" style="background:radial-gradient(circle at 85% 8%,${C.moss2} 0,transparent 45%),radial-gradient(circle at 10% 100%,${C.moss2} 0,transparent 50%),${C.moss}">
  <svg class="abs" style="inset:0" width="1080" height="1350">
    ${wave(1240, C.olive, .5)}${wave(1262, C.olive, .35)}${wave(1284, C.olive, .2)}
  </svg>
  <img class="abs" src="${img('logo_IEM.png')}" style="height:54px;left:50%;transform:translateX(-50%);top:80px">
  <div class="abs" style="top:190px;left:0;right:0;text-align:center;color:${C.khaki};font-weight:800;letter-spacing:.34em;font-size:26px">ÚLTIMO BIMESTRE DO ANO</div>
  <div class="abs" style="top:240px;left:0;right:0;text-align:center;color:${C.off};font-weight:400;font-size:52px">É tempo de</div>
  ${verbs.map(([v, d, c], i) => `
  <div class="abs" style="left:80px;right:80px;top:${335 + i * 288}px;text-align:center">
    <div class="gio ${c === 'grad' ? 'grad' : ''}" style="font-size:160px;${c === 'grad' ? '' : 'color:' + c}">${v}</div>
    <div style="margin-top:6px;font-size:30px;color:${C.khaki};font-weight:700">${d}</div>
  </div>
  ${i < 2 ? `<svg class="abs" style="left:440px;top:${335 + i * 288 + 250}px" width="200" height="30"><path d="M0 15 Q 25 0 50 15 T 100 15 T 150 15 T 200 15" stroke="${C.olive2}" stroke-width="3" fill="none"/></svg>` : ''}`).join('')}
  <div class="abs" style="bottom:120px;left:0;right:0;text-align:center;color:${C.olive2};font-weight:800;letter-spacing:.22em;font-size:22px">EFÉSIOS 1 · @EWANDERMACEDO</div>
</div>`,
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html7'), { recursive: true });
  for (const [name, body] of Object.entries(posts)) {
    const f = path.join(S, 'html7', name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
