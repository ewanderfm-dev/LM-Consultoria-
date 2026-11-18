// Renders 1080x1350 Instagram posts from HTML templates.
const { chromium } = require('playwright');
const path = require('path');
const S = __dirname;
const OUT = process.argv[2];
const img = f => 'file://' + path.join(S, 'img', f);
const font = f => 'file://' + path.join(S, 'fonts/package/files', f);

const base = `
@font-face{font-family:PF;src:url(${font('playfair-display-latin-700-normal.woff2')});font-weight:700}
@font-face{font-family:PF;src:url(${font('playfair-display-latin-400-italic.woff2')});font-weight:400;font-style:italic}
@font-face{font-family:PF;src:url(${font('playfair-display-latin-700-italic.woff2')});font-weight:700;font-style:italic}
*{margin:0;padding:0;box-sizing:border-box}
:root{--navy:#0f1732;--gold:#f2c14e;--cream:#f5f1e8}
html,body{width:1080px;height:1350px;overflow:hidden;background:var(--navy);font-family:Inter,sans-serif;color:#fff}
.post{position:relative;width:1080px;height:1350px;overflow:hidden}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.logo{position:absolute;height:44px;opacity:.95}
.kicker{font-family:Inter;font-weight:600;letter-spacing:.32em;text-transform:uppercase;font-size:24px;color:var(--gold)}
.serif{font-family:PF;font-weight:700;line-height:1.08;letter-spacing:-.01em}
.hand{position:absolute;font-family:Inter;font-weight:500;font-size:24px;letter-spacing:.08em;color:rgba(255,255,255,.75)}
`;

const posts = {
  // DIA 4 — Missão (foto de adoração)
  'dia-04-missao': `
<div class="post">
  <div class="bg" style="background-image:url(${img('publico.jpg')});background-position:50% 30%"></div>
  <div class="bg" style="background:linear-gradient(180deg,rgba(15,23,50,.55) 0%,rgba(15,23,50,.2) 30%,rgba(15,23,50,.9) 60%,#0f1732 100%)"></div>
  <img class="logo" src="${img('logo_IEM.png')}" style="top:64px;left:72px">
  <div style="position:absolute;left:72px;right:72px;bottom:90px">
    <div class="kicker">Nossa missão</div>
    <div class="serif" style="font-size:88px;margin-top:28px">Transformar <span style="font-style:italic;color:var(--gold)">Petrópolis</span> e as nações.</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px 40px;margin-top:44px;font-size:30px;font-weight:500">
      <div><span style="color:var(--gold)">→</span> fazendo discípulos</div>
      <div><span style="color:var(--gold)">→</span> formando líderes</div>
      <div><span style="color:var(--gold)">→</span> multiplicando células</div>
      <div><span style="color:var(--gold)">→</span> multiplicando igrejas</div>
    </div>
    <div style="margin-top:44px;font-size:24px;font-weight:600;letter-spacing:.14em;color:rgba(255,255,255,.7)">MATEUS 28:19</div>
  </div>
</div>`,

  // DIA 5 — Classe de Conexão / primeiro passo (foto do louvor)
  'dia-05-primeiro-passo': `
<div class="post" style="background:var(--cream)">
  <div class="bg" style="background-image:url(${img('C02_0155.jpg')});bottom:auto;height:720px;background-position:40% 40%"></div>
  <div style="position:absolute;top:660px;left:0;right:0;height:60px;background:linear-gradient(180deg,transparent,var(--cream))"></div>
  <div style="position:absolute;left:72px;right:72px;top:770px;color:var(--navy)">
    <div class="kicker" style="color:#b8892a">Classe de Conexão</div>
    <div class="serif" style="font-size:84px;margin-top:24px">Toda caminhada começa com um <span style="font-style:italic;color:#b8892a">primeiro passo.</span></div>
    <div style="margin-top:32px;font-size:30px;line-height:1.45;color:#2b3554;max-width:900px">Quer conhecer a visão da IEM, ser batizado ou dar os primeiros passos na fé? Esse lugar é pra você.</div>
  </div>
  <div style="position:absolute;left:72px;bottom:64px;font-size:24px;font-weight:600;letter-spacing:.12em;color:var(--navy)">SALMOS 37:23</div>
  <div style="position:absolute;right:72px;bottom:58px;background:var(--navy);padding:12px 20px;border-radius:10px"><img src="${img('logo_IEM.png')}" style="height:30px;display:block"></div>
</div>`,

  // DIA 6 — Contagem regressiva Religar (arte tipográfica)
  'dia-06-religar-7-dias': `
<div class="post" style="background:radial-gradient(circle at 50% 38%,rgba(242,193,78,.20) 0,transparent 48%),var(--navy)">
  <svg style="position:absolute;inset:0" width="1080" height="1350" viewBox="0 0 1080 1350" fill="none">
    <g stroke="rgba(242,193,78,.16)" stroke-width="2">
      <circle cx="540" cy="520" r="300"/><circle cx="540" cy="520" r="360"/><circle cx="540" cy="520" r="420"/>
    </g>
  </svg>
  <div class="kicker" style="position:absolute;top:110px;left:0;right:0;text-align:center">Retiro Religar</div>
  <div style="position:absolute;top:270px;left:0;right:0;text-align:center">
    <div style="font-size:24px;font-weight:600;letter-spacing:.3em;color:rgba(255,255,255,.7)">FALTAM</div>
    <div class="serif" style="font-size:340px;line-height:1;color:var(--gold);margin-top:6px">7</div>
    <div class="serif" style="font-size:72px;font-style:italic;margin-top:28px">dias</div>
  </div>
  <div style="position:absolute;left:96px;right:96px;top:900px;text-align:center">
    <div class="serif" style="font-size:52px;line-height:1.2">Pare. Ouça. <span style="font-style:italic;color:var(--gold)">Reconecte-se.</span></div>
    <div style="margin-top:36px;font-size:28px;color:var(--cream)">27 e 28 de novembro · Pousada Vila do Sossego</div>
    <div style="display:inline-block;margin-top:34px;padding:14px 30px;background:var(--gold);color:var(--navy);border-radius:999px;font-size:28px;font-weight:700">Inscreva-se</div>
  </div>
  <img class="logo" src="${img('logo_IEM.png')}" style="left:50%;transform:translateX(-50%);bottom:64px;height:36px">
</div>`,
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  for (const [name, body] of Object.entries(posts)) {
    const f = path.join(S, 'html', name + '.html');
    require('fs').mkdirSync(path.join(S, 'html'), { recursive: true });
    require('fs').writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
