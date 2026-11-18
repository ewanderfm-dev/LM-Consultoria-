// Série baseada nas lições e slides do Pr. Ewander — gera PNGs 1080x1350.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const S = __dirname;
const OUT = process.argv[2];
const ONLY = process.argv[3];
const img = f => 'file://' + path.join(S, 'img', f);
const font = f => 'file://' + path.join(S, 'fonts/package/files', f);

const base = `
@font-face{font-family:PF;src:url(${font('playfair-display-latin-700-normal.woff2')});font-weight:700}
@font-face{font-family:PF;src:url(${font('playfair-display-latin-400-italic.woff2')});font-weight:400;font-style:italic}
@font-face{font-family:PF;src:url(${font('playfair-display-latin-700-italic.woff2')});font-weight:700;font-style:italic}
*{margin:0;padding:0;box-sizing:border-box}
:root{--navy:#0f1732;--gold:#f2c14e;--gold2:#b8892a;--cream:#f5f1e8;--ink:#2b3554}
html,body{width:1080px;height:1350px;overflow:hidden;background:var(--navy);font-family:Inter,sans-serif;color:#fff}
.post{position:relative;width:1080px;height:1350px;overflow:hidden}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.kicker{font-weight:600;letter-spacing:.3em;text-transform:uppercase;font-size:23px}
.serif{font-family:PF;font-weight:700;line-height:1.08;letter-spacing:-.01em}
em{font-style:italic}
.dark{color:#fff}.dark .kicker,.dark em,.dark .ref{color:var(--gold)}
.light{color:var(--navy);background:var(--cream)}.light .kicker,.light em,.light .ref{color:var(--gold2)}
.ref{font-weight:600;letter-spacing:.14em;font-size:24px;text-transform:uppercase}
.sub{font-size:30px;line-height:1.45}
.dark .sub{color:rgba(255,255,255,.88)}.light .sub{color:var(--ink)}
.q{font-family:PF;font-style:italic;font-size:36px;line-height:1.4}
.handle{font-weight:500;font-size:23px;letter-spacing:.08em;opacity:.7}
.badge{background:var(--navy);padding:12px 20px;border-radius:10px;display:inline-block}
.badge img{height:30px;display:block}
`;
const logo = (h = 40) => `<img src="${img('logo_IEM.png')}" style="height:${h}px;display:block">`;
const waves = (c) => `<svg style="position:absolute;inset:0" width="1080" height="1350" viewBox="0 0 1080 1350" fill="none"><g stroke="${c}" stroke-width="2"><path d="M-40 1150 C 260 1010, 520 1210, 1120 930"/><path d="M-40 1200 C 280 1060, 540 1260, 1120 980"/><path d="M-40 1250 C 300 1110, 560 1310, 1120 1030"/></g></svg>`;
const footer = (theme) => `
  <div class="handle" style="position:absolute;left:84px;bottom:70px">@ewandermacedo</div>
  <div style="position:absolute;right:84px;bottom:58px">${theme === 'light' ? `<div class="badge">${logo(30)}</div>` : logo(36)}</div>`;

const T = {
  // Foto em tela cheia, texto embaixo
  photo: p => `
<div class="post dark">
  <div class="bg" style="background-image:url(${img(p.photo)});background-position:${p.pos || '50% 30%'}"></div>
  <div class="bg" style="background:linear-gradient(180deg,rgba(15,23,50,.45) 0%,rgba(15,23,50,.1) 25%,rgba(15,23,50,.88) 56%,#0f1732 100%)"></div>
  <div style="position:absolute;top:64px;left:72px">${logo(42)}</div>
  <div style="position:absolute;left:72px;right:72px;bottom:90px">
    <div class="kicker">${p.kicker}</div>
    <div class="serif" style="font-size:${p.size || 84}px;margin-top:26px">${p.title}</div>
    ${p.sub ? `<div class="sub" style="margin-top:30px;max-width:900px">${p.sub}</div>` : ''}
    <div class="ref" style="margin-top:34px">${p.ref}</div>
  </div>
</div>`,

  // Foto em cima, fundo creme
  creamPhoto: p => `
<div class="post light">
  <div class="bg" style="background-image:url(${img(p.photo)});bottom:auto;height:${p.h || 700}px;background-position:${p.pos || '50% 50%'}"></div>
  <div style="position:absolute;top:${(p.h || 700) - 60}px;left:0;right:0;height:60px;background:linear-gradient(180deg,transparent,var(--cream))"></div>
  <div style="position:absolute;left:72px;right:72px;top:${(p.h || 700) + 50}px">
    <div class="kicker">${p.kicker}</div>
    <div class="serif" style="font-size:${p.size || 76}px;margin-top:22px">${p.title}</div>
    ${p.sub ? `<div class="sub" style="margin-top:26px;max-width:900px">${p.sub}</div>` : ''}
  </div>
  <div class="ref" style="position:absolute;left:72px;bottom:66px;color:var(--navy)">${p.ref}</div>
  <div style="position:absolute;right:72px;bottom:56px"><div class="badge">${logo(30)}</div></div>
</div>`,

  // Tipográfico azul-marinho
  navy: p => `
<div class="post dark" style="background:radial-gradient(circle at 80% 15%,rgba(242,193,78,.2) 0,transparent 45%),radial-gradient(circle at 8% 95%,rgba(90,120,220,.22) 0,transparent 50%),var(--navy)">
  ${waves('rgba(242,193,78,.16)')}
  <div class="kicker" style="position:absolute;left:84px;top:110px">${p.kicker}</div>
  <div style="position:absolute;left:84px;right:84px;top:170px;bottom:150px;display:flex;flex-direction:column;justify-content:center">
    <div class="serif" style="font-size:${p.size || 110}px;line-height:1.03">${p.title}</div>
    <div style="width:120px;height:4px;background:var(--gold);margin:56px 0 36px"></div>
    ${p.sub ? `<div class="q" style="color:var(--cream);max-width:860px">${p.sub}</div>` : ''}
    <div class="ref" style="margin-top:22px">${p.ref}</div>
  </div>
  ${footer('dark')}
</div>`,

  // Tipográfico creme com aspas grandes
  cream: p => `
<div class="post light">
  ${waves('rgba(184,137,42,.18)')}
  <div class="kicker" style="position:absolute;left:84px;top:110px">${p.kicker}</div>
  <div style="position:absolute;left:84px;right:84px;top:170px;bottom:150px;display:flex;flex-direction:column;justify-content:center">
    <div class="serif" style="font-size:240px;line-height:.6;height:120px;margin-left:-18px;color:var(--gold);opacity:.55">“</div>
    <div class="serif" style="font-size:${p.size || 96}px;line-height:1.05">${p.title}</div>
    ${p.sub ? `<div class="sub" style="margin-top:40px;max-width:860px">${p.sub}</div>` : ''}
    <div class="ref" style="margin-top:34px">${p.ref}</div>
  </div>
  ${footer('light')}
</div>`,

  // Lista numerada (3 pontos)
  list: p => `
<div class="post ${p.theme || 'dark'}" style="${(p.theme || 'dark') === 'dark' ? 'background:radial-gradient(circle at 85% 10%,rgba(242,193,78,.18) 0,transparent 45%),var(--navy)' : ''}">
  <div class="kicker" style="position:absolute;left:84px;top:110px">${p.kicker}</div>
  <div style="position:absolute;left:84px;right:84px;top:170px;bottom:150px;display:flex;flex-direction:column;justify-content:center">
    <div class="serif" style="font-size:${p.size || 92}px;line-height:1.05">${p.title}</div>
    <div style="margin-top:64px;display:flex;flex-direction:column;gap:40px">
      ${p.items.map((it, i) => `
      <div style="display:flex;gap:34px;align-items:flex-start">
        <div class="serif" style="font-size:72px;line-height:.9;min-width:70px;color:${(p.theme || 'dark') === 'dark' ? 'var(--gold)' : 'var(--gold2)'}">${i + 1}</div>
        <div><div style="font-size:38px;font-weight:700;line-height:1.2">${it[0]}</div><div class="sub" style="font-size:27px;margin-top:8px">${it[1]}</div></div>
      </div>`).join('')}
    </div>
    <div class="ref" style="margin-top:56px">${p.ref}</div>
  </div>
  ${footer(p.theme || 'dark')}
</div>`,
};

const VEJA = 'Veja por outro ponto de vista';
const PROM = 'A visão da promessa cumprida';
const CELE = 'É tempo de celebrar';
const LAR = 'Saúde emocional no lar';
const TRAB = 'Saúde mental no trabalho';

const posts = [
  ['dia-07-quem-voce-busca', 'navy', { kicker: VEJA, size: 92, title: 'Quem você busca no tempo da aflição <em>determina a visão</em> que terá do seu futuro.', sub: '“No dia do Senhor, eu estava em Espírito e ouvi atrás de mim uma forte voz, como de trombeta.”', ref: 'Apocalipse 1:10' }],
  ['dia-08-porta-aberta', 'photo', { photo: 'pastor-ew.jpg', pos: '62% 40%', kicker: VEJA, size: 100, title: 'Há uma <em>porta aberta</em> no céu.', sub: '“Suba para cá, e mostrarei a você o que deve acontecer depois dessas coisas.”', ref: 'Apocalipse 4:1' }],
  ['dia-09-trono', 'cream', { kicker: VEJA, size: 92, title: 'Nada do seu contexto é capaz de tirar o Senhor do <em>Seu trono.</em>', sub: 'A primeira visão dos céus é esta: Deus está assentado. E essa visão traz paz ao coração.', ref: 'Apocalipse 4:2' }],
  ['dia-10-governo-dos-ceus', 'creamPhoto', { photo: 'C02_0043.jpg', pos: '50% 35%', kicker: VEJA, size: 74, title: 'A realidade da Terra não altera o <em>governo dos céus.</em>', sub: 'Deus continua no trono, e toda a criação O adora por Sua beleza e santidade.', ref: 'Apocalipse 4:8-11' }],
  ['dia-11-senhor-da-historia', 'navy', { kicker: VEJA, size: 128, top: 250, title: 'Jesus é o <em>Senhor da história.</em>', sub: 'Ele tem o livro nas mãos, governa dos céus e não permitirá que nenhum dos Seus planos seja frustrado.', ref: 'Apocalipse 5:1' }],
  ['dia-12-o-mar-ja-nao-existe', 'photo', { photo: 'publico-3.jpg', pos: '50% 30%', kicker: PROM, size: 108, title: 'E o mar <em>já não existe.</em>', sub: 'O mar era o lugar do medo e do incontrolável. Na nova criação, Deus remove todo medo.', ref: 'Apocalipse 21:1' }],
  ['dia-13-promessas', 'cream', { kicker: PROM, size: 90, title: 'Nenhuma das promessas de Deus ficará <em>sem cumprimento.</em>', sub: 'Aquele que fez a promessa é fiel para cumprir. Fortaleça as mãos frouxas e os joelhos vacilantes.', ref: 'Apocalipse 21:5-6' }],
  ['dia-14-pela-graca', 'navy', { kicker: CELE, size: 100, title: 'É pela graça, e <em>somente pela graça,</em> que existimos e nos movemos.', sub: '“Graça e paz a vocês da parte de Deus, nosso Pai, e do Senhor Jesus Cristo.”', ref: 'Efésios 1:2' }],
  ['dia-15-bencao-nos-precede', 'photo', { photo: 'MG_3753.jpg', pos: '45% 40%', kicker: CELE, size: 104, title: 'A bênção de Deus <em>nos precede.</em>', sub: 'Não por merecimento nosso, mas porque Ele quis assim.', ref: 'Efésios 1:3-4' }],
  ['dia-16-romper-crencas', 'creamPhoto', { photo: 'cel-1.jpg', pos: '50% 0%', h: 640, kicker: CELE, size: 70, title: 'Rompa com toda crença que te coloca <em>abaixo</em> de onde Deus já te colocou.', sub: 'Você não precisa conquistar tudo com a força do seu braço. Você é filho amado.', ref: 'Efésios 1:4-7' }],
  ['dia-17-celebrar-fortalecer-profetizar', 'list', { kicker: 'Último mês do ano', size: 88, title: 'Dezembro é tempo de…', items: [['Celebrar', 'as conquistas e a graça que nos trouxe até aqui.'], ['Fortalecer', 'os projetos que Deus nos deu para começar.'], ['Profetizar', 'um novo ciclo para a casa, a célula e a cidade.']], ref: 'Efésios 1:15-19' }],
  ['dia-18-eu-e-minha-casa', 'creamPhoto', { photo: 'cel-7.jpg', pos: '50% 8%', kicker: LAR, size: 76, title: '“Eu e a minha casa <em>serviremos ao Senhor.</em>”', sub: 'Josué não podia mudar a cultura ao seu redor, mas decidiu qual cultura dirigiria a sua casa.', ref: 'Josué 24:15' }],
  ['dia-19-clareza-coragem', 'navy', { kicker: LAR, size: 100, title: 'Onde você está esperando <em>clareza</em> quando Deus está pedindo <em>coragem?</em>', ref: 'Josué 1:9' }],
  ['dia-20-mascaras', 'cream', { kicker: LAR, size: 104, title: 'Em casa, as máscaras <em>não cabem.</em>', sub: 'Zaqueu estava no alto da árvore, num lugar de privilégio. Foi em casa, onde a verdade é patente, que ele foi transformado.', ref: 'Lucas 19:1-10' }],
  ['dia-21-praticas-lar', 'list', { theme: 'light', kicker: LAR, size: 80, title: '3 práticas para um lar <em>saudável</em>', items: [['Confesse dores e distorções', 'Filhos que podem falar. Pais que pedem perdão.'], ['Aprenda junto', 'Ninguém é autossuficiente. Tenha amigos que confrontam em amor.'], ['Ore com a Palavra', 'Faça da oração um mover profético na sua casa.']], ref: 'Tiago 5:16' }],
  ['dia-22-consistencia', 'photo', { photo: 'kids.jpg', pos: '50% 30%', kicker: LAR, size: 100, title: 'Consistência supera <em>intensidade.</em>', sub: 'Pequenas práticas diárias constroem confiança, segurança emocional e vínculos.', ref: '2 Samuel 6:11' }],
  ['dia-23-permanecer', 'photo', { photo: 'MG_1825.jpg', pos: '22% 50%', kicker: TRAB, size: 92, title: 'Fruto nasce de <em>permanência,</em> não de esforço isolado.', sub: '“Quem permanece em mim, e eu nele, esse dá muito fruto.”', ref: 'João 15:5' }],
  ['dia-24-poda', 'cream', { kicker: TRAB, size: 104, title: 'A poda é cuidado do Pai, <em>não rejeição.</em>', sub: 'Diante de um feedback difícil, pergunte: o que Deus está cultivando em mim?', ref: 'João 15:2' }],
  ['dia-25-quem-sou', 'navy', { kicker: TRAB, size: 116, title: 'Quem eu sou<br>≠ <em>o que eu entrego.</em>', sub: 'Justificados pela fé, temos paz com Deus. O seu valor não depende do seu desempenho.', ref: 'Romanos 5:1' }],
  ['dia-26-escuta', 'creamPhoto', { photo: 'cel-3.jpg', pos: '50% 40%', h: 640, kicker: TRAB, size: 74, title: 'Escuta de <em>contato total.</em>', sub: 'Sem celular. Sem interromper. Repetindo o que ouviu. Relacionamentos gerados na graça sustentam.', ref: 'Atos 2:46-47' }],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html'), { recursive: true });
  for (const [name, tpl, p] of posts) {
    if (ONLY && !name.includes(ONLY)) continue;
    const f = path.join(S, 'html', name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${T[tpl](p)}</body></html>`);
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
