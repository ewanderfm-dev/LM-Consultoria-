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
  // ───────── SÉRIE 1 · Apocalipse 4 — paleta celestial: violeta, lavanda, esmeralda, pêssego
  'dia-07-quem-voce-busca': `
<div class="post" style="background:linear-gradient(180deg,#2a1b4d 0%,#6b3f8f 42%,#e98a7a 78%,#ffcf9e 100%)">
  <svg class="abs" style="left:0;top:0" width="1080" height="1350">
    <circle cx="540" cy="1150" r="300" fill="#ffe2b8" opacity=".9"/>
    <circle cx="540" cy="1150" r="380" fill="none" stroke="#ffe2b8" stroke-width="2" opacity=".5"/>
    <circle cx="540" cy="1150" r="470" fill="none" stroke="#ffe2b8" stroke-width="2" opacity=".3"/>
    ${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 197) % 1080}" cy="${(i * 89) % 520 + 40}" r="${i % 3 + 1.5}" fill="#fff" opacity="${0.3 + (i % 5) / 10}"/>`).join('')}
    <path d="M0 1240 Q 270 1180 540 1230 T 1080 1210 V1350 H0Z" fill="#2a1b4d"/>
  </svg>
  <div class="abs cap" style="top:96px;left:0;right:0;text-align:center;color:#e6d8ff">Veja por outro ponto de vista</div>
  <div class="abs dms" style="top:200px;left:90px;right:90px;text-align:center;color:#fff;font-size:86px">Quem você busca no tempo da aflição <i style="color:#ffcf9e">determina a visão</i> que terá do seu futuro.</div>
  <div class="abs" style="top:720px;left:0;right:0;text-align:center;color:#2a1b4d;font-weight:700;letter-spacing:.2em;font-size:24px">APOCALIPSE 1:10</div>
  ${sig('#e6d8ff', 'left:0;right:0;text-align:center;bottom:40px')}
</div>`,

  'dia-08-porta-aberta': `
<div class="post" style="background:#e9e0ff">
  <svg class="abs" style="inset:0" width="1080" height="1350">
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<line x1="540" y1="520" x2="${540 + (i - 4) * 260}" y2="-40" stroke="#c9b6ff" stroke-width="3"/>`).join('')}
  </svg>
  <div class="abs" style="left:220px;top:150px;width:640px;height:780px;border-radius:320px 320px 0 0;background:#2a1b4d"></div>
  <div class="abs" style="left:245px;top:175px;width:590px;height:755px;border-radius:295px 295px 0 0;background:url(${img('pastor-ew.jpg')}) 72% 30%/auto 100%;box-shadow:inset 0 0 0 6px #f3d27a"></div>
  <div class="abs cap" style="top:70px;left:0;right:0;text-align:center;color:#6b3f8f">Veja por outro ponto de vista · Apocalipse 4:1</div>
  <div class="abs dms" style="top:975px;left:60px;right:60px;color:#2a1b4d;font-size:96px;text-align:center">Há uma <i style="color:#6b3f8f">porta aberta</i> no céu.</div>
  <div class="abs hand" style="top:1195px;left:0;right:0;text-align:center;color:#6b3f8f;font-size:50px">“Suba para cá, e mostrarei a você…”</div>
</div>`,

  'dia-09-trono': `
<div class="post" style="background:#14532d">
  <div class="abs cap" style="top:96px;left:80px;color:#a7f3d0">Veja por outro ponto de vista · Ap 4:2</div>
  <div class="abs" style="top:165px;left:84px;color:#ecfdf5;font-size:48px;font-weight:600">Deus continua no</div>
  <div class="abs bebas" style="top:250px;left:60px;font-size:470px;color:#34d399">TRONO</div>
  <svg class="abs" style="left:80px;top:690px" width="120" height="70"><path d="M5 65 L20 10 L45 40 L60 0 L75 40 L100 10 L115 65 Z" fill="#fbbf24"/></svg>
  <div class="abs" style="top:800px;left:80px;right:120px;color:#ecfdf5;font-size:44px;line-height:1.3;font-weight:600">Nada do seu contexto é capaz de tirar o Senhor do Seu lugar.</div>
  <div class="abs txt" style="top:1000px;left:80px;right:140px;color:#a7f3d0">A primeira visão dos céus é esta: Deus está assentado. E essa visão traz paz ao coração.</div>
  ${sig('#a7f3d0')}
  ${logo(34, 'right:72px;bottom:58px')}
</div>`,

  'dia-10-governo-dos-ceus': `
<div class="post" style="background:#120c24">
  <div class="duo" style="--dk:#3b1d70;inset:0;background:#c4b5fd"><img src="${img('C02_0043.jpg')}" style="object-position:50% 30%"></div>
  <div class="abs" style="inset:0;background:linear-gradient(180deg,transparent 40%,rgba(18,12,36,.92) 75%)"></div>
  <div class="abs" style="top:80px;left:80px;font-family:DMS;font-style:italic;font-size:54px;color:#fff;opacity:.95;line-height:1.15">Santo,<br>santo,<br>santo.</div>
  <div class="abs cap" style="bottom:500px;left:80px;color:#c4b5fd">Apocalipse 4:8-11</div>
  <div class="abs dms" style="bottom:180px;left:80px;right:80px;color:#fff;font-size:80px">A realidade da Terra não altera o <i style="color:#c4b5fd">governo dos céus.</i></div>
  ${sig('#c4b5fd')}
</div>`,

  'dia-11-senhor-da-historia': `
<div class="post" style="background:#ecdcb8">
  ${grain}
  <div class="abs" style="left:90px;right:90px;top:120px;bottom:120px;border:3px solid #6b4423;border-radius:6px"></div>
  <div class="abs" style="left:110px;right:110px;top:140px;bottom:140px;border:1px solid #6b4423;border-radius:4px"></div>
  <div class="abs cap" style="top:200px;left:0;right:0;text-align:center;color:#8a5a2b">Apocalipse 5:1</div>
  <div class="abs pf" style="top:290px;left:150px;right:150px;text-align:center;color:#3b2412;font-size:100px">Jesus é o Senhor da <i style="color:#a3341f">história.</i></div>
  <svg class="abs" style="left:190px;top:700px" width="700" height="90">
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${50 + i * 100}" cy="45" r="34" fill="#a3341f"/><circle cx="${50 + i * 100}" cy="45" r="20" fill="none" stroke="#7a2416" stroke-width="3"/>`).join('')}
  </svg>
  <div class="abs" style="top:820px;left:0;right:0;text-align:center;color:#6b4423;font-size:22px;letter-spacing:.3em;font-weight:700">SETE SELOS · UM SÓ DIGNO</div>
  <div class="abs" style="top:900px;left:170px;right:170px;text-align:center;color:#3b2412;font-family:PF;font-style:italic;font-size:38px;line-height:1.4">Ele tem o livro nas mãos, governa dos céus e não permitirá que nenhum dos Seus planos seja frustrado.</div>
  ${sig('#6b4423', 'left:0;right:0;text-align:center;bottom:60px')}
</div>`,

  // ───────── SÉRIE 2 · Apocalipse 21 — paleta oceano: azul-petróleo, água, areia, coral
  'dia-12-o-mar-ja-nao-existe': `
<div class="post" style="background:#f6ead2">
  <svg class="abs" style="left:0;top:0" width="1080" height="1350">
    <circle cx="820" cy="250" r="120" fill="#ff8a6b"/>
    <path d="M0 860 Q 135 800 270 860 T 540 860 T 810 860 T 1080 860 V1350 H0Z" fill="#7fd6cf"/>
    <path d="M0 960 Q 135 900 270 960 T 540 960 T 810 960 T 1080 960 V1350 H0Z" fill="#2a9d99"/>
    <path d="M0 1070 Q 135 1010 270 1070 T 540 1070 T 810 1070 T 1080 1070 V1350 H0Z" fill="#0e5e66"/>
  </svg>
  <div class="abs cap" style="top:96px;left:80px;color:#0e5e66">A visão da promessa cumprida</div>
  <div class="abs blk" style="top:330px;left:76px;font-size:150px;color:#0e5e66">E O <span style="position:relative">MAR<span style="position:absolute;left:-10px;right:-10px;top:52%;height:16px;background:#ff8a6b;transform:rotate(-4deg)"></span></span></div>
  <div class="abs blk" style="top:480px;left:76px;font-size:150px;color:#0e5e66">JÁ NÃO<br>EXISTE.</div>
  <div class="abs txt" style="top:1120px;left:80px;right:80px;color:#f6ead2;font-weight:500">O mar era o lugar do medo e do incontrolável. Na nova criação, Deus remove todo medo.</div>
  <div class="abs" style="bottom:60px;left:80px;color:#7fd6cf;font-weight:700;letter-spacing:.16em;font-size:22px">APOCALIPSE 21:1</div>
  ${sig('#7fd6cf', 'right:72px;bottom:60px')}
</div>`,

  'dia-13-promessas': `
<div class="post" style="background:#0e5e66">
  <div class="abs" style="left:0;right:0;top:0;height:720px;background:#ff8a6b"></div>
  <div class="abs cap" style="top:90px;left:80px;color:#5a1f12">2 Coríntios 1:20 · Apocalipse 21:5</div>
  <div class="abs" style="top:140px;left:84px;color:#5a1f12;font-size:44px;font-weight:600">Jesus é o</div>
  <div class="abs bebas" style="top:190px;left:60px;font-size:520px;color:#fff6e9">SIM</div>
  <div class="abs" style="top:625px;left:84px;color:#5a1f12;font-size:40px;font-weight:600">para todas as promessas de Deus.</div>
  <div class="abs dms" style="top:800px;left:80px;right:80px;color:#f6ead2;font-size:78px">Nenhuma delas ficará <i style="color:#7fd6cf">sem cumprimento.</i></div>
  <div class="abs txt" style="top:1060px;left:80px;right:120px;color:#bfe9e5">Aquele que fez a promessa é fiel para cumprir.</div>
  ${sig('#7fd6cf')}
</div>`,

  // ───────── SÉRIE 3 · Efésios 1 — paleta festiva: laranja, magenta, amarelo, roxo
  'dia-14-pela-graca': `
<div class="post" style="background:#ff7a1a">
  <div class="abs cap" style="top:80px;left:72px;color:#3a0b2b">É tempo de celebrar · Efésios 1:2</div>
  ${[0, 1, 2, 3, 4].map(i => `<div class="abs bebas" style="top:${150 + i * 175}px;left:50px;font-size:230px;${i === 2 ? 'color:#3a0b2b' : 'color:transparent;-webkit-text-stroke:3px #3a0b2b;opacity:' + (0.25 + Math.abs(2 - i) * -0.05 + 0.2)}">GRAÇA GRAÇA</div>`).join('')}
  <div class="abs" style="left:0;right:0;bottom:0;height:390px;background:#3a0b2b"></div>
  <div class="abs dms" style="bottom:170px;left:72px;right:72px;color:#fff;font-size:64px">É pela graça, e <i style="color:#ffc93c">somente pela graça,</i> que existimos e nos movemos.</div>
  ${sig('#ffc93c')}
  ${logo(32, 'right:72px;bottom:58px')}
</div>`,

  'dia-15-bencao-nos-precede': `
<div class="post" style="background:#2b0a3d">
  <div class="duo" style="--dk:#7b1650;left:0;right:0;top:0;height:860px;background:#ffb347"><img src="${img('MG_3753.jpg')}" style="object-position:45% 40%"></div>
  <svg class="abs" style="inset:0" width="1080" height="1350">
    ${Array.from({ length: 46 }, (_, i) => { const c = ['#ffc93c', '#ff4f8b', '#7ee0ff', '#fff'][i % 4]; const x = (i * 233) % 1080, y = (i * 137) % 820 + 20; return i % 2 ? `<rect x="${x}" y="${y}" width="16" height="30" rx="3" fill="${c}" transform="rotate(${i * 37} ${x} ${y})"/>` : `<circle cx="${x}" cy="${y}" r="8" fill="${c}"/>`; }).join('')}
  </svg>
  <div class="abs" style="left:0;right:0;top:820px;height:60px;background:linear-gradient(180deg,transparent,#2b0a3d)"></div>
  <div class="abs cap" style="top:900px;left:72px;color:#ff4f8b">É tempo de celebrar · Efésios 1:3-4</div>
  <div class="abs blk" style="top:950px;left:72px;right:72px;color:#fff;font-size:96px">A BÊNÇÃO <span style="color:#ffc93c">NOS PRECEDE.</span></div>
  <div class="abs txt" style="top:1170px;left:72px;right:72px;color:#f3d9ff">Não por merecimento nosso, mas porque Ele quis assim.</div>
  ${sig('#ff4f8b', 'right:72px;top:60px')}
</div>`,

  'dia-16-romper-crencas': `
<div class="post" style="background:#ffd23f">
  <div class="abs cap" style="top:90px;left:80px;color:#3a0b2b">Efésios 1:4-7 · romper crenças</div>
  <div class="abs" style="top:190px;left:80px;right:80px;background:#fff;padding:44px 48px;transform:rotate(-2deg);box-shadow:0 18px 40px rgba(0,0,0,.18)">
    ${['“Preciso conquistar tudo sozinho.”', '“Não mereço ser abençoado.”', '“Deus está distante de mim.”'].map(t => `<div style="position:relative;font-size:46px;font-weight:600;color:#6b6b6b;margin:18px 0">${t}<span style="position:absolute;left:-12px;right:-12px;top:50%;height:8px;background:#e0337b;transform:rotate(-2deg)"></span></div>`).join('')}
  </div>
  <div class="abs hand" style="top:640px;left:100px;font-size:64px;color:#e0337b;transform:rotate(-4deg)">a verdade é:</div>
  <div class="abs dms" style="top:730px;left:80px;right:80px;color:#3a0b2b;font-size:96px">Você é filho amado, <i style="color:#c2185b">escolhido</i> e abençoado.</div>
  <div class="abs txt" style="top:1060px;left:80px;right:140px;color:#3a0b2b">Rompa com toda crença que te coloca abaixo de onde Deus já te colocou.</div>
  ${sig('#3a0b2b')}
</div>`,

  'dia-17-celebrar-fortalecer-profetizar': `
<div class="post" style="background:#5b2a86">
  <div class="abs" style="left:150px;right:150px;top:230px;height:880px;background:#fff;border-radius:28px;box-shadow:0 30px 60px rgba(0,0,0,.35);overflow:hidden">
    <div style="background:#e0337b;height:230px;position:relative">
      <div style="position:absolute;top:-6px;left:150px;width:26px;height:70px;background:#3a0b2b;border-radius:13px"></div>
      <div style="position:absolute;top:-6px;right:150px;width:26px;height:70px;background:#3a0b2b;border-radius:13px"></div>
      <div class="bebas" style="color:#fff;font-size:190px;text-align:center;padding-top:40px">DEZEMBRO</div>
    </div>
    <div style="padding:50px 60px 0">
      <div class="dms" style="font-size:56px;color:#3a0b2b">É tempo de…</div>
      ${[['Celebrar', 'a graça que nos trouxe até aqui'], ['Fortalecer', 'os projetos que Deus nos deu'], ['Profetizar', 'um novo ciclo para a casa e a cidade']].map(([a, b]) => `
      <div style="display:flex;gap:28px;align-items:center;margin-top:44px">
        <div style="width:64px;height:64px;border:5px solid #e0337b;border-radius:14px;display:flex;align-items:center;justify-content:center;flex:none"><svg width="40" height="40"><path d="M6 21 L16 31 L35 9" stroke="#ff7a1a" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div><div style="font-size:42px;font-weight:800;color:#3a0b2b">${a}</div><div style="font-size:26px;color:#7a5a8a;margin-top:4px">${b}</div></div>
      </div>`).join('')}
      <div style="margin-top:60px;font-weight:700;letter-spacing:.2em;font-size:22px;color:#e0337b">EFÉSIOS 1:15-19</div>
    </div>
  </div>
  ${sig('#e6c7ff', 'left:0;right:0;text-align:center;bottom:70px')}
</div>`,

  // ───────── SÉRIE 4 · Saúde emocional no lar — paleta terrosa: terracota, sálvia, creme, marrom
  'dia-18-eu-e-minha-casa': `
<div class="post" style="background:#c8553d">
  ${grain}
  <div class="abs" style="left:150px;top:110px;width:780px;background:#fbf6ee;padding:28px 28px 110px;transform:rotate(-3deg);box-shadow:0 25px 50px rgba(0,0,0,.3)">
    <div style="height:600px;background:url(${img('cel-7.jpg')}) 50% 8%/cover"></div>
    <div class="hand" style="position:absolute;bottom:26px;left:0;right:0;text-align:center;font-size:56px;color:#4a2c21">nossa casa, nossa célula ♥</div>
  </div>
  <div class="abs" style="left:470px;top:84px;width:150px;height:50px;background:rgba(246,239,228,.75);transform:rotate(-6deg)"></div>
  <div class="abs dms" style="top:930px;left:80px;right:80px;color:#fbf6ee;font-size:84px">“Eu e a minha casa <i style="color:#f2d4a7">serviremos ao Senhor.</i>”</div>
  <div class="abs" style="top:1150px;left:80px;color:#f2d4a7;font-weight:700;letter-spacing:.18em;font-size:22px">JOSUÉ 24:15</div>
  ${sig('#f2d4a7', 'right:72px;top:1150px')}
</div>`,

  'dia-19-clareza-coragem': `
<div class="post" style="background:#f6efe4">
  <div class="abs" style="left:0;top:0;width:540px;height:1350px;background:#dfe3cf"></div>
  <div class="abs cap" style="top:90px;left:0;right:0;text-align:center;color:#4a2c21">Saúde emocional no lar</div>
  <div class="abs" style="top:200px;left:0;width:540px;text-align:center;color:#8a9a5b;font-size:28px;font-weight:700;letter-spacing:.2em">VOCÊ ESPERA</div>
  <div class="abs" style="top:200px;left:540px;width:540px;text-align:center;color:#c8553d;font-size:28px;font-weight:700;letter-spacing:.2em">DEUS PEDE</div>
  <div class="abs bebas" style="top:300px;left:0;width:540px;text-align:center;font-size:150px;color:#8a9a5b;opacity:.55;filter:blur(1.5px)">CLAREZA</div>
  <div class="abs bebas" style="top:300px;left:540px;width:540px;text-align:center;font-size:150px;color:#c8553d">CORAGEM</div>
  
  <div class="abs dms" style="top:640px;left:90px;right:90px;text-align:center;color:#4a2c21;font-size:76px">Onde você está esperando <i style="color:#8a9a5b">clareza</i> quando Deus está pedindo <i style="color:#c8553d">coragem?</i></div>
  <div class="abs" style="top:1040px;left:0;right:0;text-align:center;color:#4a2c21;font-weight:700;letter-spacing:.2em;font-size:22px">JOSUÉ 1:9</div>
  ${sig('#4a2c21', 'left:0;right:0;text-align:center;bottom:60px')}
</div>`,

  'dia-20-mascaras': `
<div class="post" style="background:#8a9a5b">
  <svg class="abs" style="left:290px;top:150px" width="500" height="380" viewBox="0 0 500 380">
    <path d="M30 80 C 30 40, 120 20, 250 20 C 380 20, 470 40, 470 80 C 470 230, 390 350, 250 350 C 110 350, 30 230, 30 80 Z" fill="#f6efe4"/>
    <ellipse cx="160" cy="150" rx="58" ry="34" fill="#8a9a5b"/><ellipse cx="340" cy="150" rx="58" ry="34" fill="#8a9a5b"/>
    <path d="M190 260 Q 250 300 310 260" stroke="#c8553d" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M30 90 L -10 60 M470 90 L 510 60" stroke="#f6efe4" stroke-width="8"/>
  </svg>
  <svg class="abs" style="left:780px;top:470px" width="120" height="120"><path d="M10 110 L110 10" stroke="#4a2c21" stroke-width="10" stroke-linecap="round"/><path d="M60 110 L110 60" stroke="#4a2c21" stroke-width="10" stroke-linecap="round"/></svg>
  <div class="abs cap" style="top:620px;left:0;right:0;text-align:center;color:#f6efe4">Lucas 19:1-10</div>
  <div class="abs pf" style="top:680px;left:80px;right:80px;text-align:center;color:#2f3a1c;font-size:100px">Em casa, as máscaras <i style="color:#f6efe4">não cabem.</i></div>
  <div class="abs txt" style="top:1080px;left:110px;right:110px;text-align:center;color:#f6efe4">Foi em casa, onde a verdade aparece, que Zaqueu foi transformado.</div>
  ${sig('#2f3a1c', 'left:0;right:0;text-align:center;bottom:60px')}
</div>`,

  'dia-21-praticas-lar': `
<div class="post" style="background:#c9a77c">
  ${grain}
  <div class="abs" style="left:110px;right:110px;top:110px;bottom:130px;background:#fbf6ee;box-shadow:0 20px 40px rgba(0,0,0,.25);transform:rotate(1.5deg);background-image:repeating-linear-gradient(180deg,transparent 0 69px,#e7d8c4 69px 71px)">
    <div style="position:absolute;left:90px;top:0;bottom:0;width:3px;background:#e9a090"></div>
    <div class="hand" style="padding:50px 60px 0 130px;font-size:84px;color:#c8553d">Lar saudável:</div>
    ${[['Confessar dores', 'filhos que podem falar, pais que pedem perdão'], ['Aprender junto', 'ninguém é autossuficiente'], ['Orar com a Palavra', 'um mover profético na sua casa']].map(([a, b]) => `
    <div style="padding:64px 60px 0 130px;display:flex;gap:22px">
      <svg width="54" height="54" style="flex:none;margin-top:8px"><rect x="4" y="4" width="46" height="46" rx="6" fill="none" stroke="#4a2c21" stroke-width="4"/><path d="M12 28 L24 40 L48 6" stroke="#8a9a5b" stroke-width="7" fill="none" stroke-linecap="round"/></svg>
      <div><div class="hand" style="font-size:64px;color:#4a2c21">${a}</div><div style="font-size:26px;color:#7a5a4a;margin-top:2px">${b}</div></div>
    </div>`).join('')}
    <div style="position:absolute;bottom:50px;left:130px;font-weight:700;letter-spacing:.18em;font-size:22px;color:#c8553d">TIAGO 5:16</div>
  </div>
  ${sig('#4a2c21', 'left:0;right:0;text-align:center;bottom:52px')}
</div>`,

  'dia-22-consistencia': `
<div class="post" style="background:#f6efe4">
  <svg class="abs" style="inset:0" width="1080" height="1350"><defs><clipPath id="house"><path d="M190 380 L540 110 L890 380 V800 H190 Z"/></clipPath></defs>
    <path d="M170 390 L540 85 L910 390" fill="none" stroke="#c8553d" stroke-width="22" stroke-linejoin="round"/>
    <image href="${img('kids.jpg')}" x="190" y="110" width="700" height="875" preserveAspectRatio="xMidYMid slice" clip-path="url(#house)"/>
    ${Array.from({ length: 30 }, (_, i) => `<circle cx="${100 + (i % 15) * 63}" cy="${860 + Math.floor(i / 15) * 36}" r="10" fill="${i < 22 ? '#8a9a5b' : '#dfe3cf'}"/>`).join('')}
  </svg>
  <div class="abs blk" style="top:960px;left:80px;right:80px;color:#4a2c21;font-size:74px">CONSISTÊNCIA<br><span style="color:#c8553d">SUPERA INTENSIDADE.</span></div>
  <div class="abs txt" style="top:1180px;left:80px;right:200px;color:#4a2c21;font-size:27px">Pequenas práticas diárias constroem confiança e vínculos.</div>
  ${sig('#8a9a5b', 'right:72px;top:60px')}
</div>`,

  // ───────── SÉRIE 5 · Saúde mental no trabalho — paleta verde: folha, limão, preto, branco
  'dia-23-permanecer': `
<div class="post" style="background:#173d24">
  <svg class="abs" style="inset:0" width="1080" height="1350">
    <path d="M980 -20 C 760 180, 900 380, 700 520 S 520 820, 300 900" stroke="#c6f432" stroke-width="10" fill="none" stroke-linecap="round"/>
    ${[[900, 120, 30], [820, 300, -40], [760, 470, 20], [620, 610, -30], [480, 780, 25]].map(([x, y, r]) => `<path d="M${x} ${y} c 40 -60 120 -60 150 0 c -40 50 -110 60 -150 0z" fill="#3f8f4f" transform="rotate(${r} ${x} ${y})"/>`).join('')}
    ${[[380, 900], [330, 950], [420, 950], [370, 1000], [460, 1000], [410, 1050]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="28" fill="#7b3fa0"/>`).join('')}
  </svg>
  <div class="abs cap" style="top:96px;left:80px;color:#c6f432">Saúde mental no trabalho · João 15:5</div>
  <div class="abs blk" style="top:180px;left:76px;color:#fff;font-size:98px">FRUTO<br>NASCE DE<br><span style="color:#c6f432">PERMA-<br>NÊNCIA</span></div>
  <div class="abs txt" style="top:1110px;left:80px;right:560px;color:#d7f5c1;font-size:28px">não de esforço isolado. Ritmos fixos de oração e descanso.</div>
  ${sig('#c6f432')}
</div>`,

  'dia-24-poda': `
<div class="post" style="background:#ffffff">
  <svg class="abs" style="left:0;top:120px" width="1080" height="560">
    <path d="M60 300 C 300 290, 520 330, 1020 250" stroke="#173d24" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path d="M380 305 C 420 220, 470 190, 520 150" stroke="#173d24" stroke-width="10" fill="none" stroke-linecap="round"/>
    ${[[520, 150, -30], [700, 270, 20], [860, 250, -20], [240, 300, 30]].map(([x, y, r]) => `<path d="M${x} ${y} c 40 -60 120 -60 150 0 c -40 50 -110 60 -150 0z" fill="#3f8f4f" transform="rotate(${r} ${x} ${y})"/>`).join('')}
    <path d="M430 170 L 470 260" stroke="#ff3b3b" stroke-width="5" stroke-dasharray="12 10"/>
    <g transform="translate(470 330) rotate(-25)"><circle cx="0" cy="0" r="26" fill="none" stroke="#111" stroke-width="7"/><circle cx="0" cy="70" r="26" fill="none" stroke="#111" stroke-width="7"/><path d="M20 15 L130 -40 M20 55 L130 110" stroke="#111" stroke-width="9" stroke-linecap="round"/></g>
  </svg>
  <div class="abs cap" style="top:90px;left:80px;color:#3f8f4f">Saúde mental no trabalho · João 15:2</div>
  <div class="abs blk" style="top:720px;left:76px;right:76px;color:#111;font-size:100px">A PODA É CUIDADO DO PAI, <span style="background:#c6f432;padding:0 10px">NÃO REJEIÇÃO.</span></div>
  <div class="abs txt" style="top:1080px;left:80px;right:160px;color:#333">Diante de um feedback difícil, pergunte: o que Deus está cultivando em mim?</div>
  ${sig('#3f8f4f')}
</div>`,

  'dia-25-quem-sou': `
<div class="post" style="background:#0d0d0d">
  <div class="abs cap" style="top:96px;left:80px;color:#c6f432">Saúde mental no trabalho · Romanos 5:1</div>
  <div class="abs blk" style="top:220px;left:80px;color:#fff;font-size:120px">QUEM<br>EU SOU</div>
  <div class="abs" style="top:430px;right:80px;font-family:Blk;font-size:420px;line-height:1;color:#c6f432">≠</div>
  <div class="abs blk" style="top:760px;left:80px;color:#555;font-size:120px">O QUE EU<br>ENTREGO</div>
  <div class="abs" style="top:1050px;left:80px;right:160px;color:#e5e5e5;font-family:PF;font-style:italic;font-size:36px;line-height:1.4">Justificados pela fé, temos paz com Deus. O seu valor não depende do seu desempenho.</div>
  ${sig('#c6f432')}
</div>`,

  'dia-26-escuta': `
<div class="post" style="background:#e9f7d4">
  <div class="abs" style="left:0;right:0;top:0;height:700px;background:url(${img('cel-3.jpg')}) 50% 35%/cover"></div>
  ${[['SEM CELULAR', -6, 90, 600, '#c6f432'], ['SEM INTERROMPER', 4, 420, 650, '#ffffff'], ['REPITA O QUE OUVIU', -3, 160, 720, '#111111']].map(([t, r, x, y, c]) => `<div class="abs blk" style="left:${x}px;top:${y}px;transform:rotate(${r}deg);background:${c};color:${c === '#111111' ? '#c6f432' : '#111'};font-size:44px;padding:16px 26px;border-radius:8px;box-shadow:0 10px 24px rgba(0,0,0,.25)">${t}</div>`).join('')}
  <div class="abs cap" style="top:870px;left:80px;color:#3f8f4f">Saúde mental no trabalho · Atos 2:46-47</div>
  <div class="abs dms" style="top:920px;left:80px;right:60px;color:#173d24;font-size:80px">Escuta de <i style="color:#3f8f4f">contato total.</i></div>
  <div class="abs txt" style="top:1040px;left:80px;right:120px;color:#173d24">Relacionamentos gerados na graça sustentam. A célula é espaço de escuta e cuidado.</div>
  ${sig('#3f8f4f')}
</div>`,
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html4'), { recursive: true });
  for (const [name, body] of Object.entries(posts)) {
    if (ONLY && !name.includes(ONLY)) continue;
    const f = path.join(S, 'html4', name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
