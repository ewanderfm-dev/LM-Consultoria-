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
  ...(() => {
  const BG = ['#FAF6EE', '#F3EBDD'], INK = '#2B2620', SUB = '#5E554A', AC = '#B5791F', MUTE = '#9A8F80';
  const frame = (n, inner) => `
<div class="post" style="background:${BG[(n + 1) % 2]}">
  <div class="abs" style="top:80px;left:80px;color:${MUTE};font-weight:700;letter-spacing:.26em;font-size:20px">SONHE UM SONHO MAIOR · GÊNESIS 37</div>
  <div class="abs" style="top:78px;right:80px;color:${MUTE};font-weight:700;font-size:22px;letter-spacing:.08em">${n}/7</div>
  <div class="abs" style="left:80px;right:80px;top:170px;bottom:170px;display:flex;flex-direction:column;justify-content:center">${inner}</div>
  <div class="abs" style="left:80px;bottom:70px;color:${MUTE};font-weight:700;letter-spacing:.16em;font-size:20px">PR. EWANDER MACEDO · IGREJA EM MOVIMENTO</div>
</div>`;
  const big = (t, s = 84) => `<div class="dms" style="color:${INK};font-size:${s}px;line-height:1.1">${t}</div>`;
  const sub = t => `<div style="margin-top:44px;color:${SUB};font-size:34px;line-height:1.5">${t}</div>`;
  const ref = t => `<div style="margin-top:40px;color:${AC};font-weight:700;letter-spacing:.16em;font-size:22px">${t}</div>`;
  const em = t => `<i style="color:${AC}">${t}</i>`;
  return {
  'carrossel-01-capa': `
<div class="post" style="background:${BG[0]}">
  <div class="abs" style="top:80px;left:80px;color:${MUTE};font-weight:700;letter-spacing:.26em;font-size:20px">SONHE UM SONHO MAIOR · GÊNESIS 37</div>
  <div class="abs dms" style="top:150px;left:80px;right:80px;color:${INK};font-size:74px;line-height:1.08">Todo grande sonho, no princípio, ${em('parece loucura.')}</div>
  <img class="abs" src="${img('pastor-palco.jpg')}" style="left:0;top:420px;width:1080px;height:560px;object-fit:cover;object-position:50% 48%">
  <div class="abs dms" style="top:1035px;left:80px;right:80px;color:${INK};font-size:50px;line-height:1.15">Um sonho sobrenatural se realizará por um caminho ${em('sobrenatural.')}</div>
  <div class="abs" style="left:80px;bottom:70px;color:${MUTE};font-weight:700;letter-spacing:.16em;font-size:20px">PR. EWANDER MACEDO · IGREJA EM MOVIMENTO</div>
</div>`,
  'carrossel-02-irmaos-riram': frame(2, big(`Quando José contou o sonho, ${em('os irmãos riram.')}`) + sub('Não cabia na cabeça deles que o mais novo pudesse viver algo tão diferente. Tinha mais cara de alucinação do que de revelação.') + ref('GÊNESIS 37:5-11')),
  'carrossel-03-limites': frame(3, big(`O sobrenatural ${em('expõe')} os limites naturais.`, 90) + sub('Se vem de Deus, mesmo que incomode quem está paralisado, o sonho seguirá por caminhos que só Ele conhece.')),
  'carrossel-04-caminho': frame(4, big(`Não espere que o plano de Deus siga a ${em('lógica natural.')}`) + sub(`Ele passa por cova, por prisão, por espera… <b style="color:${INK}">e chega ao palácio.</b>`)),
  'carrossel-05-tudo-coopera': frame(5, big(`Tudo ${em('coopera')} para o bem.`, 96) + sub('A traição, a injustiça e a prisão não pararam José. Mesmo a dor mais profunda será canalizada para que você viva o que Deus quer que você viva.') + ref('ROMANOS 8:28')),
  'carrossel-06-persevere': frame(6, big(`Uma hora ${em('o sonho se realiza.')}`, 88) + sub(`Aos 17 anos, José sonhou.<br>Aos 30, estava diante do Faraó.<br>Mais de 20 anos depois, o sonho se cumpriu por completo.`) + `<div class="dms" style="margin-top:50px;color:${AC};font-size:80px"><i>Persevere!</i></div>`),
  'carrossel-07-pergunta': frame(7, `<div style="color:${AC};font-weight:700;letter-spacing:.24em;font-size:24px;margin-bottom:30px">E VOCÊ?</div>` + big(`Como você tem esperado que os planos de Deus se realizem: natural ou ${em('sobrenatural?')}`, 74) + sub('Comente aqui embaixo, salve este post e envie para quem precisa sonhar de novo.')),
  };
  })(),
};
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html15'), { recursive: true });
  for (const [name, body] of Object.entries(posts)) {
    if (ONLY && !name.includes(ONLY)) continue;
    const f = path.join(S, 'html15', name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
