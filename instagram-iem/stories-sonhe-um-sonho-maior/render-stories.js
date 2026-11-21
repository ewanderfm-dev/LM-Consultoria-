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
html,body{width:1080px;height:1920px;overflow:hidden;font-family:Nunito,sans-serif}
.post{position:relative;width:1080px;height:1920px;overflow:hidden}
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

const W = 1080, H = 1920;
const stars = (n, h, op = 1, y0 = 0) => Array.from({ length: n }, (_, i) => `<circle cx="${(i * 157) % 1080}" cy="${y0 + (i * 89) % h}" r="${i % 3 + 1.2}" fill="#F1F2F2" opacity="${(0.25 + (i % 5) / 8) * op}"/>`).join('');
const sheaf = (x, y, s, c, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${[-24, -12, 0, 12, 24].map(a => `<path d="M0 0 L${a * 1.6} -150" stroke="${c}" stroke-width="7" stroke-linecap="round"/><ellipse cx="${a * 1.7}" cy="-160" rx="11" ry="26" fill="${c}" transform="rotate(${a} ${a * 1.7} -160)"/>`).join('')}<path d="M-8 0 L-24 120 M8 0 L24 120 M0 0 V125" stroke="${c}" stroke-width="7" stroke-linecap="round"/><rect x="-30" y="-14" width="60" height="16" rx="6" fill="${C.peach}"/></g>`;
const lg = (pos, h = 36) => `<img class="abs" src="${img('logo_IEM.png')}" style="height:${h}px;${pos}">`;
// selo "amanhã" presente em todos os stories
const selo = (bg, fg) => `<div class="abs" style="top:250px;left:50%;transform:translateX(-50%);background:${bg};color:${fg};font-weight:800;letter-spacing:.22em;font-size:24px;padding:14px 30px;border-radius:999px;white-space:nowrap">AMANHÃ · 10:30 E 18:30</div>`;
const ctr = 'left:80px;right:80px;text-align:center';

const posts = {
  'story-01-voce-ainda-sonha': `
<div class="post" style="background:radial-gradient(circle at 50% 40%,${C.moss2} 0,${C.moss} 70%)">
  <svg class="abs" style="inset:0" width="${W}" height="${H}">${stars(120, 1900)}<circle cx="760" cy="520" r="70" fill="${C.butter}"/><circle cx="790" cy="500" r="62" fill="${C.moss2}" opacity=".0"/></svg>
  ${lg('left:50%;transform:translateX(-50%);top:250px', 40)}
  <div class="abs gio" style="top:720px;${ctr};color:${C.off};font-size:150px;line-height:1">Você ainda</div>
  <div class="abs gio grad" style="top:880px;${ctr};font-size:200px;line-height:1">sonha?</div>
  <div class="abs" style="top:1220px;${ctr};color:${C.khaki};font-weight:700;font-size:38px">Amanhã tem uma Palavra para você.</div>
  <div class="abs" style="top:1300px;${ctr};color:${C.olive2};font-weight:800;letter-spacing:.2em;font-size:24px">↓ RESPONDA NA ENQUETE ↓</div>
</div>`,

  'story-02-fim-de-ano': `
<div class="post" style="background:${C.off}">
  ${selo(C.moss, C.butter)}
  <div class="abs gio" style="top:430px;left:80px;right:80px;color:${C.moss};font-size:104px;line-height:1.02">Estamos chegando ao fim do ano…</div>
  ${[['o corre', 'do que precisa ser concluído antes que o ano acabe'], ['a frustração', 'do que não mudou ao longo dos anos'], ['a expectativa', 'de que o novo ciclo traga uma realidade melhor']].map(([a, b], i) => `
  <div class="abs" style="left:80px;right:80px;top:${820 + i * 230}px;border-left:10px solid ${[C.olive, C.peach, C.butter][i]};padding-left:34px">
    <div style="font-weight:800;font-size:58px;color:${C.moss}">${a}</div>
    <div style="font-weight:700;font-size:34px;color:${C.olive};margin-top:6px">${b}</div>
  </div>`).join('')}
  <div class="abs" style="top:1560px;left:80px;color:${C.olive2};font-weight:800;font-size:34px">Você se identifica? 👀</div>
</div>`,

  'story-03-tres-movimentos': `
<div class="post" style="background:${C.moss}">
  ${selo(C.butter, C.moss)}
  <div class="abs" style="top:430px;${ctr};color:${C.khaki};font-weight:700;font-size:40px">Temos sido chamados a três movimentos:</div>
  ${[['Celebrar', C.butter], ['Fortalecer', C.lime], ['Profetizar', 'grad']].map(([v, c], i) => `<div class="abs gio ${c === 'grad' ? 'grad' : ''}" style="top:${560 + i * 240}px;${ctr};font-size:170px;line-height:1;${c === 'grad' ? '' : 'color:' + c}">${v}</div>`).join('')}
  <div class="abs" style="top:1350px;${ctr};color:${C.off};font-weight:700;font-size:40px;line-height:1.35">E amanhã a Palavra vai no sentido do…</div>
  <div class="abs gio grad" style="top:1450px;${ctr};font-size:110px">profetizar.</div>
</div>`,

  'story-04-cronos-kairos': `
<div class="post" style="background:${C.lime}">
  ${selo(C.moss, C.butter)}
  <svg class="abs" style="left:240px;top:420px" width="600" height="600"><g transform="translate(300 300)">
    <circle r="250" fill="none" stroke="${C.moss}" stroke-width="12"/>
    ${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="-228" x2="0" y2="-200" stroke="${C.moss}" stroke-width="10" transform="rotate(${i * 30})"/>`).join('')}
    <line y2="-150" stroke="${C.moss}" stroke-width="14" stroke-linecap="round" transform="rotate(330)"/><line y2="-200" stroke="${C.moss}" stroke-width="8" stroke-linecap="round" transform="rotate(60)"/>
    <circle r="16" fill="${C.moss}"/></g></svg>
  <div class="abs gio" style="top:1080px;${ctr};color:${C.moss};font-size:88px;line-height:1.02">A vida não se estabelece só no <i>Cronos</i>.</div>
  <div class="abs" style="top:1420px;${ctr};color:${C.moss2};font-weight:700;font-size:40px;line-height:1.35">Há tempo para todas as coisas, tempo para cada propósito de Deus.</div>
  <div class="abs" style="top:1600px;${ctr};color:${C.olive};font-weight:800;letter-spacing:.18em;font-size:26px">ECLESIASTES 3:1</div>
</div>`,

  'story-05-o-que-e-profetizar': `
<div class="post" style="background:${C.moss}">
  ${selo(C.butter, C.moss)}
  <div class="abs" style="left:80px;right:80px;top:400px;bottom:300px;border:3px solid ${C.olive};border-radius:36px"></div>
  <div class="abs" style="top:470px;left:140px;color:${C.khaki};font-weight:800;letter-spacing:.24em;font-size:26px">O QUE É…</div>
  <div class="abs gio grad" style="top:540px;left:136px;font-size:122px">profetizar?</div>
  <div class="abs" style="top:760px;left:140px;right:140px;color:${C.off};font-size:56px;line-height:1.35;font-weight:700">É declarar a <span style="color:${C.butter}">Palavra</span>, o <span style="color:${C.butter}">propósito</span> e a <span style="color:${C.butter}">vontade</span> de Deus sobre a realidade em que estamos.</div>
  <div class="abs" style="top:1300px;left:140px;width:160px;height:4px;background:${C.lime}"></div>
  <div class="abs" style="top:1340px;left:140px;right:140px;color:${C.lime};font-size:40px;line-height:1.35;font-weight:700">Qual realidade precisa ouvir a voz de Deus na sua vida?</div>
</div>`,

  'story-06-desafio': `
<div class="post" style="background:linear-gradient(180deg,${C.moss} 0%,${C.moss2} 100%)">
  ${selo(C.butter, C.moss)}
  <div class="abs" style="top:450px;${ctr};color:${C.khaki};font-weight:700;font-size:42px;line-height:1.35">Num tempo em que o país passa por um dos quadros econômicos mais difíceis da história…</div>
  <div class="abs" style="top:780px;${ctr};color:${C.off};font-weight:800;letter-spacing:.2em;font-size:32px">QUERO TE DESAFIAR A</div>
  <div class="abs gio grad" style="top:840px;${ctr};font-size:230px;line-height:1">sonhar.</div>
  <svg class="abs" style="left:0;top:1300px" width="${W}" height="420">${[140, 300, 460, 620, 780, 940].map((x, i) => sheaf(x, 300, .85, i === 2 || i === 3 ? C.butter : C.khaki, i < 3 ? 6 : -6)).join('')}</svg>
</div>`,

  'story-07-tunica': `
<div class="post" style="background:${C.butter}">
  ${selo(C.moss, C.butter)}
  <svg class="abs" style="left:300px;top:390px" width="480" height="640" viewBox="0 0 480 640">
    <defs><clipPath id="tun"><path d="M170 20 Q240 60 310 20 L470 120 L420 230 L370 205 L400 630 H80 L110 205 L60 230 L10 120 Z"/></clipPath></defs>
    <g clip-path="url(#tun)">${[C.moss2, C.lime, C.peach, C.olive, C.off, C.lime, C.moss2, C.peach, C.khaki, C.olive2, C.lime].map((c, i) => `<rect x="0" y="${i * 60}" width="480" height="60" fill="${c}"/>`).join('')}</g>
    <path d="M170 20 Q240 60 310 20 L470 120 L420 230 L370 205 L400 630 H80 L110 205 L60 230 L10 120 Z" fill="none" stroke="${C.moss}" stroke-width="6"/></svg>
  <div class="abs" style="top:1080px;${ctr};color:${C.moss2};font-weight:800;letter-spacing:.2em;font-size:26px">JOSÉ · 17 ANOS · GÊNESIS 37</div>
  <div class="abs gio" style="top:1140px;${ctr};color:${C.moss};font-size:84px;line-height:1.05">Há sonhos de Deus sobre você que já são evidentes, mesmo sem você entender.</div>
</div>`,

  'story-08-loucura': `
<div class="post" style="background:${C.moss}">
  ${selo(C.butter, C.moss)}
  <svg class="abs" style="inset:0" width="${W}" height="${H}">${stars(70, 700, .9, 380)}
    <circle cx="540" cy="760" r="120" fill="${C.butter}"/><circle cx="300" cy="620" r="56" fill="${C.off}"/><circle cx="325" cy="600" r="50" fill="${C.moss}"/>
    ${Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (0.12 + i * 0.076); return `<path d="M0 -18 L5 -5 L18 0 L5 5 L0 18 L-5 5 L-18 0 L-5 -5Z" fill="${C.lime}" transform="translate(${540 + Math.cos(a) * 270} ${760 + Math.sin(a) * 270})"/>`; }).join('')}</svg>
  <div class="abs gio" style="top:1060px;${ctr};color:${C.off};font-size:84px;line-height:1.05">Todo grande sonho, no princípio, <span class="grad">parece loucura.</span></div>
  <div class="abs" style="top:1500px;${ctr};color:${C.khaki};font-weight:700;font-size:38px;line-height:1.35">Mas, se vem de Deus, seguirá por caminhos que só Ele conhece.</div>
</div>`,

  'story-09-convite': `
<div class="post" style="background:${C.moss}">
  <img class="abs" src="${img('culto-iem.jpg')}" style="left:0;top:0;width:${W}px;height:1100px;object-fit:cover;object-position:80% 50%">
  <div class="abs" style="left:0;right:0;top:600px;height:520px;background:linear-gradient(180deg,transparent,${C.moss})"></div>
  <div class="abs" style="top:240px;left:50%;transform:translateX(-50%);background:rgba(36,40,31,.85);padding:16px 30px;border-radius:999px"><img src="${img('logo_IEM.png')}" style="height:40px;display:block"></div>
  <div class="abs" style="top:930px;${ctr};color:${C.khaki};font-weight:800;letter-spacing:.3em;font-size:28px">AMANHÃ, DOMINGO</div>
  <div class="abs gio" style="top:985px;${ctr};color:${C.off};font-size:72px;line-height:1.05">Sonhe um novo sonho,<br><span class="grad">sonhe um sonho maior</span></div>
  <div class="abs" style="top:1320px;left:0;right:0;display:flex;justify-content:center;gap:40px">${['10:30', '18:30'].map(t => `<div style="background:${C.butter};color:${C.moss};border-radius:24px;padding:20px 44px;font-weight:800;font-size:92px;line-height:1">${t}</div>`).join('')}</div>
  <div class="abs" style="top:1500px;${ctr};color:${C.lime};font-weight:700;font-size:32px">culto infantil no mesmo horário</div>
  <div class="abs" style="top:1560px;${ctr};color:${C.off};font-weight:700;font-size:32px">📍 Rua Prof. Cardoso Fontes, 137 · Castelânea</div>
</div>`,

  'story-10-te-espero': `
<div class="post" style="background:${C.moss}">
  <img class="abs" src="${img('ewander.jpg')}" style="left:0;top:0;width:${W}px;height:1350px;object-fit:cover;object-position:50% 15%">
  <div class="abs" style="left:0;right:0;top:800px;height:560px;background:linear-gradient(180deg,transparent,${C.moss})"></div>
  <div class="abs" style="top:240px;left:60px;background:rgba(36,40,31,.85);padding:16px 30px;border-radius:999px"><img src="${img('logo_IEM.png')}" style="height:38px;display:block"></div>
  <div class="abs gio grad" style="top:1240px;${ctr};font-size:150px">Te espero!</div>
  <div class="abs" style="top:1420px;${ctr};color:${C.off};font-weight:700;font-size:40px">Amanhã · 10:30 e 18:30</div>
  <div class="abs" style="top:1490px;${ctr};color:${C.khaki};font-weight:700;font-size:34px">Marque aqui quem você vai levar 👇</div>
</div>`,
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html10'), { recursive: true });
  for (const [name, body] of Object.entries(posts)) {
    const f = path.join(S, 'html10', name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
