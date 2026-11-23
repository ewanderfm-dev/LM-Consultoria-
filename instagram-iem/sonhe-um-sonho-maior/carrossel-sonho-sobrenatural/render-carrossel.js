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
  const V = '#160d2e', V2 = '#2a1a52', G = '#ffd36b', L = '#c9b8ff';
  const bg = `background:radial-gradient(circle at 85% 10%,${V2} 0,transparent 50%),radial-gradient(circle at 0% 100%,${V2} 0,transparent 45%),${V}`;
  const st = (n, h, y0 = 0) => Array.from({ length: n }, (_, i) => `<circle cx="${(i * 157) % 1080}" cy="${y0 + (i * 67) % h}" r="${i % 3 + 1}" fill="#fff" opacity="${0.15 + (i % 5) / 10}"/>`).join('');
  const star = (x, y, s = 1, c = G) => `<path d="M0 -26 L7 -7 L26 0 L7 7 L0 26 L-7 7 L-26 0 L-7 -7Z" fill="${c}" transform="translate(${x} ${y}) scale(${s})"/>`;
  const sheaf = (x, y, s, c, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${[-24, -12, 0, 12, 24].map(a => `<path d="M0 0 L${a * 1.6} -150" stroke="${c}" stroke-width="7" stroke-linecap="round"/><ellipse cx="${a * 1.7}" cy="-160" rx="11" ry="26" fill="${c}" transform="rotate(${a} ${a * 1.7} -160)"/>`).join('')}<path d="M-8 0 L-24 120 M8 0 L24 120 M0 0 V125" stroke="${c}" stroke-width="7" stroke-linecap="round"/></g>`;
  const frame = (n, body) => `
<div class="post" style="${bg}">
  ${body}
  <div class="abs" style="top:80px;left:72px;color:${L};font-weight:700;letter-spacing:.28em;font-size:20px">SONHE UM SONHO MAIOR · GÊNESIS 37</div>
  <div class="abs" style="top:72px;right:72px;color:${G};font-weight:800;font-size:22px;border:2px solid ${G};border-radius:999px;padding:6px 16px">${n}/7</div>
  <div class="abs" style="left:72px;bottom:62px;color:${L};font-weight:700;letter-spacing:.16em;font-size:20px">PR. EWANDER MACEDO</div>
  <img class="abs" src="${img('logo_IEM.png')}" style="height:30px;right:72px;bottom:56px">
</div>`;
  return {
  'carrossel-02-irmaos-riram': frame(2, `
  <svg class="abs" style="inset:0" width="1080" height="1350">${st(40, 380, 140)}
    <circle cx="790" cy="300" r="70" fill="${G}"/><circle cx="560" cy="250" r="44" fill="#fff" opacity=".9"/><circle cx="582" cy="236" r="38" fill="${V}"/>
    ${Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (0.1 + i * 0.08); return star(680 + Math.cos(a) * 230, 300 + Math.sin(a) * 120 - 40, .45, L); }).join('')}
    ${sheaf(250, 560, 1.05, G, 0)}${sheaf(120, 600, .75, L, 28)}${sheaf(380, 600, .75, L, -28)}${sheaf(90, 650, .6, L, 45)}${sheaf(410, 650, .6, L, -45)}
  </svg>
  <div class="abs dms" style="top:720px;left:72px;right:72px;color:#fff;font-size:72px;line-height:1.1">Quando José contou o sonho, <i style="color:${G}">os irmãos riram.</i></div>
  <div class="abs" style="top:960px;left:72px;right:120px;color:#e4dcff;font-size:32px;line-height:1.45">Não cabia na cabeça deles que o mais novo pudesse viver algo tão diferente. Tinha mais cara de alucinação do que de revelação.</div>
  <div class="abs" style="top:1150px;left:72px;color:${G};font-weight:700;letter-spacing:.16em;font-size:21px">GÊNESIS 37:5-11</div>`),

  'carrossel-03-limites': frame(3, `
  <svg class="abs" style="inset:0" width="1080" height="1350">
    <rect x="140" y="200" width="800" height="440" rx="20" fill="none" stroke="${L}" stroke-width="4" stroke-dasharray="14 12" opacity=".7"/>
    <path d="M540 640 C 560 520, 620 360, 820 160" stroke="${G}" stroke-width="10" fill="none" stroke-linecap="round"/>
    ${star(840, 140, 1.3)}
    <circle cx="540" cy="640" r="16" fill="${G}"/>
    <text x="170" y="250" font-family="Inter" font-weight="700" font-size="24" fill="${L}" opacity=".8">LIMITES NATURAIS</text>
  </svg>
  <div class="abs dms" style="top:730px;left:72px;right:72px;color:#fff;font-size:76px;line-height:1.08">O sobrenatural <i style="color:${G}">expõe</i> os limites naturais.</div>
  <div class="abs" style="top:960px;left:72px;right:120px;color:#e4dcff;font-size:32px;line-height:1.45">Se vem de Deus, mesmo que incomode quem está paralisado, o sonho seguirá por caminhos que só Ele conhece.</div>`),

  'carrossel-04-caminho': frame(4, `
  <svg class="abs" style="left:0;top:150px" width="1080" height="560">
    <defs><linearGradient id="tr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${L}"/><stop offset="1" stop-color="${G}"/></linearGradient></defs>
    <path d="M80 250 C 160 250, 180 420, 260 420 S 350 310, 430 310 S 530 460, 610 460 S 770 400, 960 110" stroke="url(#tr)" stroke-width="10" fill="none" stroke-linecap="round"/>
    ${[[80, 250, 'sonho'], [260, 420, 'cova'], [430, 310, 'Potifar'], [610, 460, 'prisão']].map(([x, y, t]) => `<circle cx="${x}" cy="${y}" r="13" fill="${V}" stroke="${L}" stroke-width="5"/><text x="${x}" y="${y + 52}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="26" fill="${L}">${t}</text>`).join('')}
    <circle cx="960" cy="110" r="46" fill="${G}" opacity=".22"/>${star(960, 110, 1.1)}
    <text x="960" y="200" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="${G}">palácio</text>
  </svg>
  <div class="abs dms" style="top:740px;left:72px;right:72px;color:#fff;font-size:70px;line-height:1.1">Não espere que o plano de Deus siga a <i style="color:${L}">lógica natural.</i></div>
  <div class="abs" style="top:970px;left:72px;right:120px;color:#e4dcff;font-size:32px;line-height:1.45">Ele passa por cova, por prisão, por espera… <span style="color:${G};font-weight:700">e chega ao palácio.</span></div>`),

  'carrossel-05-tudo-coopera': frame(5, `
  <svg class="abs" style="inset:0" width="1080" height="1350">${st(60, 520, 140)}
    ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="540" cy="420" r="${70 + i * 48}" fill="none" stroke="${i % 2 ? L : G}" stroke-width="3" opacity="${0.75 - i * 0.11}"/>`).join('')}
    ${star(540, 420, 1.6)}
  </svg>
  <div class="abs dms" style="top:770px;left:72px;right:72px;color:#fff;font-size:84px;line-height:1.05">Tudo <i style="color:${G}">coopera</i> para o bem.</div>
  <div class="abs" style="top:960px;left:72px;right:120px;color:#e4dcff;font-size:32px;line-height:1.45">A traição, a injustiça e a prisão não pararam José. Mesmo a dor mais profunda será canalizada para que você viva o que Deus quer que você viva.</div>
  <div class="abs" style="top:1170px;left:72px;color:${G};font-weight:700;letter-spacing:.16em;font-size:21px">ROMANOS 8:28</div>`),

  'carrossel-06-persevere': frame(6, `
  <div class="abs dms" style="top:150px;left:72px;right:72px;color:#fff;font-size:76px;line-height:1.05">Uma hora <i style="color:${G}">o sonho se realiza.</i></div>
  <div class="abs" style="left:122px;top:420px;width:8px;height:560px;background:linear-gradient(${L},${G});border-radius:4px"></div>
  ${[['17 anos', 'José sonha', 'Gn 37:2'], ['30 anos', 'diante do Faraó · 13 anos depois', 'Gn 41:46'], ['+20 anos', 'a família se curva · o sonho se cumpre', 'Gn 42–45']].map(([a, b, r], i) => `
  <div class="abs" style="left:100px;top:${415 + i * 240}px;width:52px;height:52px;border-radius:50%;background:${i === 2 ? G : V};border:6px solid ${i === 2 ? G : L}"></div>
  <div class="abs" style="left:200px;top:${400 + i * 240}px;color:${i === 2 ? G : '#fff'};font-weight:800;font-size:64px;font-family:Inter">${a}</div>
  <div class="abs" style="left:200px;top:${485 + i * 240}px;color:#e4dcff;font-size:30px">${b} <span style="color:${L};font-size:22px;margin-left:10px">${r}</span></div>`).join('')}
  <div class="abs dms" style="top:1100px;left:72px;color:${G};font-size:96px"><i>Persevere!</i></div>`),

  'carrossel-07-pergunta': frame(7, `
  <img class="abs" src="${img('culto-iem.jpg')}" style="left:0;top:0;width:1080px;height:760px;object-fit:cover;object-position:80% 50%;filter:grayscale(1) contrast(1.1) brightness(.9)">
  <div class="abs" style="left:0;top:0;width:1080px;height:760px;background:${V2};mix-blend-mode:color;opacity:.9"></div>
  <div class="abs" style="left:0;right:0;top:0;height:200px;background:linear-gradient(${V},transparent)"></div>
  <div class="abs" style="left:0;right:0;top:520px;height:250px;background:linear-gradient(transparent,${V})"></div>
  <div class="abs" style="top:740px;left:72px;color:${L};font-weight:700;letter-spacing:.24em;font-size:22px">E VOCÊ?</div>
  <div class="abs dms" style="top:790px;left:72px;right:72px;color:#fff;font-size:62px;line-height:1.12">Como você tem esperado que os planos de Deus se realizem?</div>
  <div class="abs" style="top:1000px;left:72px;display:flex;gap:24px">
    <div style="border:3px solid ${L};color:${L};border-radius:999px;padding:14px 30px;font-size:32px;font-weight:700;font-family:Inter">natural</div>
    <div style="background:${G};color:${V};border-radius:999px;padding:14px 30px;font-size:32px;font-weight:800;font-family:Inter">sobrenatural</div>
  </div>
  <div class="abs" style="top:1120px;left:72px;color:#e4dcff;font-size:28px">Comente 👇 · Salve 📌 · Envie para quem precisa sonhar de novo 💬</div>`),
  };
  })(),
};
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html14'), { recursive: true });
  for (const [name, body] of Object.entries(posts)) {
    if (ONLY && !name.includes(ONLY)) continue;
    const f = path.join(S, 'html14', name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
