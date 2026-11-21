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
  'convite-domingo-iem': `
<div class="post" style="background:${C.moss}">
  <img class="abs" src="${img('culto-iem.jpg')}" style="inset:0;width:100%;height:100%;object-fit:cover;object-position:84% 50%;filter:saturate(.85)">
  <div class="abs" style="inset:0;background:linear-gradient(180deg,rgba(36,40,31,.55) 0%,rgba(36,40,31,.05) 22%,rgba(36,40,31,.25) 42%,rgba(36,40,31,.93) 60%,${C.moss} 74%)"></div>
  <img class="abs" src="${img('logo_IEM.png')}" style="height:50px;left:72px;top:70px">
  <div class="abs" style="top:740px;left:72px;color:${C.khaki};font-weight:800;letter-spacing:.32em;font-size:24px">NESTE DOMINGO, VENHA</div>
  ${[['Celebrar', C.butter], ['Fortalecer', C.lime], ['Profetizar', 'grad']].map(([v, c], i) => `<div class="abs gio ${c === 'grad' ? 'grad' : ''}" style="left:68px;top:${795 + i * 112}px;font-size:104px;${c === 'grad' ? '' : 'color:' + c}">${v}</div>`).join('')}
  <div class="abs" style="right:64px;top:770px;width:270px;text-align:center">
    <div style="color:${C.off};font-weight:800;letter-spacing:.3em;font-size:24px">DOMINGO</div>
    ${['10:30', '18:30'].map(t => `<div style="margin-top:22px;background:${C.butter};color:${C.moss};border-radius:20px;padding:18px 0;font-weight:800;font-size:78px;line-height:1">${t}</div>`).join('')}
    <div style="margin-top:20px;color:${C.khaki};font-weight:700;font-size:24px;line-height:1.3">culto infantil<br>no mesmo horário</div>
  </div>
  <div class="abs" style="left:72px;right:72px;bottom:110px;height:2px;background:${C.olive}"></div>
  <div class="abs" style="left:72px;bottom:56px;color:${C.off};font-weight:700;font-size:26px">📍 Rua Prof. Cardoso Fontes, 137 · Castelânea · Petrópolis</div>
  <div class="abs" style="right:72px;top:84px;color:${C.off};font-weight:800;letter-spacing:.12em;font-size:20px;opacity:.85">@EWANDERMACEDO</div>
</div>`,
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html8'), { recursive: true });
  for (const [name, body] of Object.entries(posts)) {
    const f = path.join(S, 'html8', name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
