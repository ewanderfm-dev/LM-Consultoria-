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
  // DIA 1 — Retiro Religar (foto do pastor + convite)
  'dia-01-religar': `
<div class="post">
  <div class="bg" style="background-image:url(${img('ewander.jpg')});background-position:50% 18%;filter:saturate(.85)"></div>
  <div class="bg" style="background:linear-gradient(180deg,rgba(15,23,50,.15) 0%,rgba(15,23,50,.35) 38%,rgba(15,23,50,.94) 64%,#0f1732 100%)"></div>
  <img class="logo" src="${img('logo_IEM.png')}" style="top:64px;left:72px">
  <div style="position:absolute;left:72px;right:72px;bottom:96px">
    <div class="kicker">Retiro Religar · 27 e 28 nov</div>
    <div class="serif" style="font-size:84px;margin-top:30px">Às vezes, tudo o que precisamos é <span style="font-style:italic;color:var(--gold)">pausar</span> para ouvir a voz de Deus de novo.</div>
    <div style="display:flex;gap:18px;margin-top:48px;font-size:28px;font-weight:500">
      <span style="padding:14px 26px;border:2px solid var(--gold);border-radius:999px">Pousada Vila do Sossego</span>
      <span style="padding:14px 26px;background:var(--gold);color:var(--navy);border-radius:999px;font-weight:700">Inscrições abertas</span>
    </div>
  </div>
</div>`,

  // DIA 2 — Arte tipográfica criada (sem foto)
  'dia-02-o-melhor-de-deus': `
<div class="post" style="background:radial-gradient(circle at 78% 18%,rgba(242,193,78,.22) 0,transparent 45%),radial-gradient(circle at 10% 95%,rgba(90,120,220,.25) 0,transparent 50%),var(--navy)">
  <svg style="position:absolute;inset:0" width="1080" height="1350" viewBox="0 0 1080 1350" fill="none">
    <g stroke="rgba(242,193,78,.18)" stroke-width="2">
      <path d="M-40 1120 C 260 980, 520 1180, 1120 900"/>
      <path d="M-40 1170 C 280 1030, 540 1230, 1120 950"/>
      <path d="M-40 1220 C 300 1080, 560 1280, 1120 1000"/>
    </g>
  </svg>
  <div style="position:absolute;left:96px;top:120px" class="kicker">Em movimento</div>
  <div style="position:absolute;left:96px;right:96px;top:250px">
    <div class="serif" style="font-size:150px;line-height:1.0">O melhor<br>de Deus<br><span style="font-style:italic;color:var(--gold)">ainda está<br>por vir.</span></div>
    <div style="width:120px;height:4px;background:var(--gold);margin:64px 0 40px"></div>
    <div style="font-family:PF;font-style:italic;font-size:38px;line-height:1.4;color:var(--cream);max-width:820px">“Aquele que começou boa obra em vós há de completá-la até ao Dia de Cristo Jesus.”</div>
    <div style="margin-top:20px;font-size:26px;font-weight:600;letter-spacing:.14em;color:var(--gold)">FILIPENSES 1:6</div>
  </div>
  <div class="hand" style="left:96px;bottom:80px">@ewandermacedo</div>
  <img class="logo" src="${img('logo_IEM.png')}" style="right:96px;bottom:72px;height:38px">
</div>`,

  // DIA 3 — Igreja em células (foto de célula)
  'dia-03-relacionamentos': `
<div class="post" style="background:var(--cream)">
  <div class="bg" style="background-image:url(${img('cel-5.jpg')});bottom:auto;height:760px;background-position:50% 60%"></div>
  <div style="position:absolute;top:700px;left:0;right:0;height:60px;background:linear-gradient(180deg,transparent,var(--cream))"></div>
  <div style="position:absolute;left:72px;right:72px;top:800px;color:var(--navy)">
    <div class="kicker" style="color:#b8892a">Uma igreja em células</div>
    <div class="serif" style="font-size:76px;margin-top:26px">O poder de Deus se manifesta através dos <span style="font-style:italic;color:#b8892a">relacionamentos.</span></div>
    <div style="margin-top:34px;font-size:30px;line-height:1.45;color:#2b3554;max-width:880px">Ninguém foi feito para caminhar sozinho. Tem uma casa aberta, uma mesa posta e uma família esperando por você.</div>
  </div>
  <div style="position:absolute;left:72px;bottom:64px;font-size:24px;font-weight:600;letter-spacing:.12em;color:var(--navy)">ATOS 2:46</div>
  <div style="position:absolute;right:72px;bottom:58px;background:var(--navy);padding:12px 20px;border-radius:10px"><img src="${img('logo_IEM.png')}" style="height:30px;display:block"></div>
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
