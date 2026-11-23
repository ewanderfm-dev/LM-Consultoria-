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
  'frase-loucura-impulso': `
<div class="post" style="background:radial-gradient(circle at 85% 10%,${C.moss2} 0,transparent 50%),${C.moss}">
  <div class="abs" style="top:70px;left:72px;color:${C.khaki};font-weight:800;letter-spacing:.28em;font-size:21px">SONHE UM SONHO MAIOR · GÊNESIS 37</div>
  <svg class="abs" style="left:0;top:120px" width="1080" height="520">
    <defs><linearGradient id="tr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.olive}"/><stop offset=".6" stop-color="${C.lime}"/><stop offset="1" stop-color="${C.butter}"/></linearGradient></defs>
    <path d="M70 250 C 150 250, 170 400, 250 400 S 340 300, 420 300 S 520 440, 600 440 S 760 380, 960 90" stroke="url(#tr)" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="1 0"/>
    ${[[70, 250, 'sonho'], [250, 400, 'cova'], [420, 300, 'Potifar'], [600, 440, 'prisão']].map(([x, y, t]) => `<circle cx="${x}" cy="${y}" r="13" fill="${C.moss}" stroke="${C.khaki}" stroke-width="5"/><text x="${x}" y="${y + 52}" text-anchor="middle" font-family="Nunito" font-weight="700" font-size="26" fill="${C.khaki}">${t}</text>`).join('')}
    <g transform="translate(960 90)"><circle r="46" fill="${C.butter}" opacity=".25"/><path d="M0 -30 L8 -8 L30 0 L8 8 L0 30 L-8 8 L-30 0 L-8 -8Z" fill="${C.butter}"/></g>
    <text x="960" y="180" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="26" fill="${C.butter}">palácio</text>
  </svg>
  <div class="abs gio" style="top:650px;left:72px;right:60px;color:${C.off};font-size:64px;line-height:1.1">Mesmo a loucura dos<br>homens pode ser<br>transformada em <span class="grad">impulso</span><br>para o sonho que<br>Deus sonhou para<br>cada um de nós.</div>
  <div class="abs" style="top:1130px;left:72px;color:${C.lime};font-weight:800;letter-spacing:.16em;font-size:22px">ROMANOS 8:28</div>
  <div class="abs" style="left:72px;bottom:56px;color:${C.olive2};font-weight:800;letter-spacing:.14em;font-size:21px">@EWANDERMACEDO</div>
  <img class="abs" src="${img('logo_IEM.png')}" style="height:32px;right:72px;bottom:52px">
</div>`,
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html11'), { recursive: true });
  for (const [name, body] of Object.entries(posts)) {
    const f = path.join(S, 'html11', name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
