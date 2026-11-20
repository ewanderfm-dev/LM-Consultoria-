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
  // ───────── 11–14/12 · Saúde mental no trabalho (novos ângulos)
  'dia-27-tres-tensoes': `
<div class="post" style="background:#1f2a44">
  <div class="abs cap" style="top:90px;left:80px;color:#f4b942">Saúde mental no trabalho</div>
  <div class="abs dms" style="top:150px;left:80px;right:80px;color:#fff;font-size:76px">Não dá para eliminar as tensões. <i style="color:#f4b942">Dá para gerenciar.</i></div>
  ${[['ENTREGA', 'LIMITE', -6], ['COLABORAÇÃO', 'CONFLITO', 5], ['VALOR', 'RESULTADO', -4]].map(([a, b, r], i) => `
  <div class="abs" style="left:110px;right:110px;top:${520 + i * 230}px;height:200px">
    <svg class="abs" style="left:0;top:0" width="860" height="200">
      <path d="M430 175 L395 200 H465 Z" fill="#f4b942"/>
      <g transform="rotate(${r} 430 170)"><rect x="20" y="160" width="820" height="12" rx="6" fill="#f4b942"/></g>
    </svg>
    <div class="abs blk" style="left:30px;top:${80 + r * 6}px;font-size:46px;color:#fff;transform:rotate(${r}deg);transform-origin:430px 90px">${a}</div>
    <div class="abs blk" style="right:30px;top:${80 - r * 6}px;font-size:46px;color:#9fb3d9;transform:rotate(${r}deg);transform-origin:-400px 90px">${b}</div>
  </div>`).join('')}
  ${sig('#f4b942')}
</div>`,

  'dia-28-fruto-meta': `
<div class="post" style="background:#e6f4ea">
  <div class="abs" style="left:60px;top:150px;width:460px;height:640px;background:#fff;border-radius:24px;box-shadow:0 10px 30px rgba(0,0,0,.08)">
    <div class="cap" style="padding:36px 36px 0;color:#6b7280">Meta</div>
    <svg width="460" height="480" style="position:absolute;bottom:40px;left:0">${[120, 200, 160, 300, 380].map((h, i) => `<rect x="${50 + i * 75}" y="${440 - h}" width="50" height="${h}" rx="6" fill="#9ca3af"/>`).join('')}</svg>
    <div class="blk" style="position:absolute;bottom:30px;left:36px;font-size:40px;color:#374151">número</div>
  </div>
  <div class="abs" style="right:60px;top:150px;width:460px;height:640px;background:#1f6f43;border-radius:24px">
    <div class="cap" style="padding:36px 36px 0;color:#bbf7d0">Fruto</div>
    <svg width="460" height="480" style="position:absolute;bottom:40px;left:0">
      <path d="M230 460 C 230 360, 200 300, 240 200 S 230 100, 250 60" stroke="#bbf7d0" stroke-width="10" fill="none" stroke-linecap="round"/>
      ${[[240, 330, -40], [235, 240, 30], [245, 150, -30]].map(([x, y, r]) => `<path d="M${x} ${y} c 40 -60 120 -60 150 0 c -40 50 -110 60 -150 0z" fill="#4ade80" transform="rotate(${r} ${x} ${y})"/>`).join('')}
      <circle cx="200" cy="120" r="22" fill="#fb7185"/><circle cx="170" cy="150" r="22" fill="#fb7185"/>
    </svg>
    <div class="blk" style="position:absolute;bottom:30px;left:36px;font-size:40px;color:#fff">processo</div>
  </div>
  <div class="abs" style="top:430px;left:500px;width:80px;height:80px;border-radius:50%;background:#111;color:#fff;font-family:Blk;font-size:44px;display:flex;align-items:center;justify-content:center">≠</div>
  <div class="abs dms" style="top:860px;left:80px;right:80px;color:#14532d;font-size:78px">Aprenda a distinguir <i style="color:#1f6f43">fruto</i> de meta.</div>
  <div class="abs txt" style="top:1060px;left:80px;right:140px;color:#14532d">Metas medem números. Fruto fala de quem você está se tornando.</div>
  <div class="abs" style="bottom:64px;right:72px;font-weight:700;letter-spacing:.16em;font-size:22px;color:#1f6f43">JOÃO 15:8</div>
  ${sig('#1f6f43')}
</div>`,

  'dia-29-errou': `
<div class="post" style="background:#fff4e0">
  <div class="abs cap" style="top:90px;left:80px;color:#b42318">Saúde mental no trabalho</div>
  <div class="abs blk" style="top:150px;left:76px;font-size:140px;color:#1d1d1d">ERROU?</div>
  ${[['1', 'REPARE', '#b42318', -4], ['2', 'APRENDA', '#f59e0b', 3], ['3', 'SIGA', '#16a34a', -2]].map(([n, t, c, r], i) => `
  <div class="abs" style="left:${90 + i * 40}px;top:${380 + i * 210}px;transform:rotate(${r}deg);display:flex;align-items:center;gap:26px;background:${c};padding:22px 44px 22px 26px;border-radius:999px;box-shadow:0 12px 26px rgba(0,0,0,.18)">
    <div style="width:110px;height:110px;border-radius:50%;background:#fff;color:${c};font-family:Blk;font-size:66px;display:flex;align-items:center;justify-content:center">${n}</div>
    <div class="blk" style="color:#fff;font-size:92px">${t}</div>
  </div>`).join('')}
  <div class="abs dms" style="top:1040px;left:80px;right:80px;color:#1d1d1d;font-size:60px">…sem <i style="color:#b42318">autoacusação.</i></div>
  <div class="abs" style="top:1130px;left:80px;font-weight:700;letter-spacing:.16em;font-size:22px;color:#b42318">ROMANOS 8:1</div>
  ${sig('#b42318')}
</div>`,

  'dia-30-controle': `
<div class="post" style="background:#dbeafe">
  <svg class="abs" style="inset:0" width="1080" height="1350">
    <circle cx="540" cy="560" r="400" fill="#93c5fd"/>
    <circle cx="540" cy="560" r="220" fill="#1d4ed8"/>
  </svg>
  <div class="abs cap" style="top:80px;left:0;right:0;text-align:center;color:#1e3a8a">Saúde mental no trabalho · 1 Pedro 5:7</div>
  <div class="abs hand" style="top:470px;left:0;right:0;text-align:center;font-size:64px;color:#fff">o que eu<br>controlo</div>
  <div class="abs hand" style="top:220px;left:0;right:0;text-align:center;font-size:52px;color:#1e3a8a">o que eu entrego a Deus</div>
  ${[['prazos dos outros', 250, 760], ['opinião alheia', 650, 800], ['o resultado final', 190, 400], ['a economia', 720, 360]].map(([t, x, y]) => `<div class="abs" style="left:${x}px;top:${y}px;font-size:26px;font-weight:600;color:#1e3a8a;background:#eff6ff;padding:8px 16px;border-radius:999px">${t}</div>`).join('')}
  <div class="abs dms" style="top:1000px;left:80px;right:80px;text-align:center;color:#1e3a8a;font-size:66px">Nomeie o que foge ao seu controle e <i style="color:#1d4ed8">entregue em oração.</i></div>
  ${sig('#1e3a8a', 'left:0;right:0;text-align:center;bottom:50px')}
</div>`,

  // ───────── 15–21/12 · Saúde emocional no lar (novos ângulos)
  'dia-31-papeis': `
<div class="post" style="background:#f3ead8">
  <svg class="abs" style="left:0;top:0" width="1080" height="1350">
    <circle cx="260" cy="420" r="170" fill="#d7263d"/>
    <rect x="455" y="250" width="340" height="340" fill="#1b4f9c"/>
    <path d="M870 590 L1010 250 L1150 590 Z" fill="#f4c20d" transform="translate(-130 0)"/>
    <rect x="0" y="680" width="1080" height="14" fill="#111"/>
  </svg>
  <div class="abs blk" style="top:110px;left:80px;font-size:34px;color:#111">PAPÉIS DIFERENTES</div>
  <div class="abs blk" style="top:760px;left:80px;right:80px;font-size:120px;color:#111">VALOR<br><span style="color:#d7263d">IGUAL.</span></div>
  <div class="abs txt" style="top:1040px;left:80px;right:180px;color:#111">Deus nos fez diferentes em papéis e responsabilidades, mas iguais em essência diante Dele.</div>
  <div class="abs" style="bottom:64px;right:72px;font-weight:700;letter-spacing:.16em;font-size:22px;color:#1b4f9c">GÊNESIS 1:27</div>
  ${sig('#111')}
</div>`,

  'dia-32-adoecimento': `
<div class="post" style="background:#2b2b2b">
  <div class="abs cap" style="top:90px;left:80px;color:#ff8a3d">Saúde emocional no lar · 2 Samuel 13</div>
  <div class="abs dms" style="top:150px;left:80px;right:80px;color:#fff;font-size:72px">O adoecimento de uma família <i style="color:#ff8a3d">não acontece de uma vez.</i></div>
  ${['Ouvir conselho ímpio', 'Deixar a carne prevalecer', 'Encobrir a ferida', 'Um abismo chama outro', 'A distorção vira padrão'].map((t, i) => `
  <div class="abs" style="left:${80 + i * 130}px;top:${470 + i * 120}px;width:${920 - i * 130}px;height:110px;background:${['#5a5a5a', '#6b4a3a', '#8a4a2a', '#b5521f', '#ff8a3d'][i]};display:flex;align-items:center;padding-left:30px;gap:20px">
    <span class="blk" style="font-size:44px;color:rgba(255,255,255,.5)">${i + 1}</span><span style="font-size:32px;font-weight:700;color:#fff">${t}</span>
  </div>`).join('')}
  <div class="abs hand" style="top:1100px;left:80px;right:80px;font-size:58px;color:#ffd0b0">Em qual degrau dá para interromper na sua casa?</div>
  ${sig('#ff8a3d')}
</div>`,

  'dia-33-compensacoes': `
<div class="post" style="background:#2d2a32">
  <div class="abs" style="left:250px;top:90px;width:580px;height:1060px;background:#fbfbf7;font-family:'JetBrains Mono',monospace;color:#222;padding:50px 46px;transform:rotate(-2deg);box-shadow:0 30px 60px rgba(0,0,0,.4);-webkit-mask:linear-gradient(#000,#000) top/100% calc(100% - 20px) no-repeat,radial-gradient(circle 12px at 50% 100%,transparent 11px,#000 12px) bottom/30px 20px repeat-x">
    <div style="text-align:center;font-weight:800;font-size:30px">CUPOM DA ALMA</div>
    <div style="text-align:center;font-size:20px;margin-top:6px">1 Samuel 1 · a família de Ana</div>
    <div style="border-top:3px dashed #222;margin:28px 0"></div>
    ${[['Mais compras', '1x'], ['Mais trabalho', '1x'], ['Mais telas', '1x'], ['Mais aparência', '1x'], ['Silêncio sobre a dor', '1x']].map(([a, b]) => `<div style="display:flex;justify-content:space-between;font-size:28px;margin:16px 0"><span>${a}</span><span>${b}</span></div>`).join('')}
    <div style="border-top:3px dashed #222;margin:28px 0"></div>
    <div style="display:flex;justify-content:space-between;font-size:34px;font-weight:800"><span>TOTAL</span><span>R$ 0,00</span></div>
    <div style="font-size:24px;margin-top:10px">Cura recebida: nenhuma</div>
    <div style="border-top:3px dashed #222;margin:28px 0"></div>
    <div class="dms" style="font-family:DMS;font-size:52px;line-height:1.1;text-align:center">Compensações<br>que não<br><i style="color:#d7263d">compensam.</i></div>
    <div style="text-align:center;font-size:20px;margin-top:30px">Deus tem cura para a sua casa.</div>
    <div style="margin:26px auto 0;width:300px;height:60px;background:repeating-linear-gradient(90deg,#222 0 4px,transparent 4px 7px,#222 7px 9px,transparent 9px 14px)"></div>
  </div>
  ${sig('#d1c7e0', 'left:0;right:0;text-align:center;bottom:40px')}
</div>`,

  'dia-34-nao-se-conforme': `
<div class="post" style="background:#0f766e">
  <svg class="abs" style="left:90px;top:120px" width="900" height="720">
    ${Array.from({ length: 48 }, (_, i) => { const x = (i % 8) * 112 + 56, y = Math.floor(i / 8) * 118 + 60; return i === 29 ? `<rect x="${x - 36}" y="${y - 36}" width="72" height="72" rx="12" fill="#fb7185" transform="rotate(45 ${x} ${y})"/>` : `<circle cx="${x}" cy="${y}" r="36" fill="#5eead4" opacity=".55"/>`; }).join('')}
  </svg>
  <div class="abs cap" style="top:870px;left:80px;color:#ccfbf1">Romanos 12:2</div>
  <div class="abs dms" style="top:920px;left:80px;right:80px;color:#fff;font-size:86px">Não se conforme com <i style="color:#fecdd3">o padrão deste mundo.</i></div>
  <div class="abs txt" style="top:1130px;left:80px;right:160px;color:#ccfbf1;font-size:27px">Transforme-se pela renovação da mente, a começar pela sua casa.</div>
  ${sig('#ccfbf1', 'right:72px;top:60px')}
</div>`,

  'dia-35-margem': `
<div class="post" style="background:#fbe9ec">
  <div class="abs" style="left:230px;right:230px;top:0;bottom:0;background:#fff"></div>
  <div class="abs" style="left:230px;top:0;bottom:0;width:3px;background:#e11d48;opacity:.5"></div>
  <div class="abs" style="right:230px;top:0;bottom:0;width:3px;background:#e11d48;opacity:.5"></div>
  <div class="abs hand" style="left:40px;top:300px;width:170px;font-size:40px;color:#9f1239;transform:rotate(-8deg)">espaço para respirar →</div>
  <div class="abs hand" style="right:40px;top:860px;width:170px;font-size:40px;color:#9f1239;transform:rotate(6deg)">← espaço para ouvir</div>
  <div class="abs cap" style="top:140px;left:270px;right:270px;color:#be123c;font-size:20px">Saúde emocional no lar</div>
  <div class="abs pf" style="top:220px;left:270px;right:270px;color:#4c0519;font-size:96px">Deixe <i style="color:#e11d48">margem.</i></div>
  <div class="abs" style="top:560px;left:270px;right:270px;color:#4c0519;font-size:34px;line-height:1.5">Famílias adoecem quando os pais vivem no limite emocional.<br><br>Agenda cheia, nervos à flor da pele e nenhum espaço para o imprevisto: isso não é força, é risco.</div>
  <div class="abs" style="bottom:120px;left:270px;font-weight:700;letter-spacing:.16em;font-size:22px;color:#be123c">MARCOS 6:31</div>
  ${sig('#9f1239', 'left:270px;bottom:64px')}
</div>`,

  'dia-36-tu-so-nao-podes': `
<div class="post" style="background:#fde047">
  ${[['cel-1.jpg', 90, 120, 300, '50% 10%'], ['cel-3.jpg', 420, 80, 260, '50% 30%'], ['cel-5.jpg', 700, 150, 300, '50% 50%'], ['publico-3.jpg', 160, 420, 260, '50% 30%'], ['cel-7.jpg', 450, 360, 330, '50% 15%'], ['MG_1825.jpg', 790, 470, 240, '30% 50%']].map(([f, x, y, d, p]) => `<div class="abs" style="left:${x}px;top:${y}px;width:${d}px;height:${d}px;border-radius:50%;background:url(${img(f)}) ${p}/cover;border:8px solid #fff;box-shadow:0 10px 24px rgba(0,0,0,.18)"></div>`).join('')}
  <div class="abs blk" style="top:770px;left:76px;right:60px;font-size:104px;color:#1c1917">SOZINHO<br><span style="color:#fff;-webkit-text-stroke:3px #1c1917">NÃO DÁ.</span></div>
  <div class="abs" style="top:1040px;left:80px;right:120px;font-family:PF;font-style:italic;font-size:36px;line-height:1.35;color:#1c1917">“Isto é pesado demais para ti; tu só não o podes fazer.”</div>
  <div class="abs" style="top:1160px;left:80px;font-weight:700;letter-spacing:.16em;font-size:22px;color:#1c1917">ÊXODO 18:18</div>
  ${sig('#1c1917', 'right:72px;top:1160px')}
</div>`,

  'dia-37-torre-de-vigia': `
<div class="post" style="background:linear-gradient(180deg,#062a33 0%,#0b3d47 60%,#0e4b55 100%)">
  <svg class="abs" style="inset:0" width="1080" height="1350">
    <path d="M760 340 L1080 200 L1080 520 Z" fill="#fcd34d" opacity=".25"/>
    <path d="M760 340 L0 150 L0 560 Z" fill="#fcd34d" opacity=".15"/>
    <path d="M700 1100 L730 380 H790 L820 1100 Z" fill="#e2e8f0"/>
    ${[500, 650, 800, 950].map(y => `<rect x="${715 + (y - 380) * 0.04}" y="${y}" width="${90 - (y - 380) * 0.02}" height="40" fill="#e11d48"/>`).join('')}
    <rect x="715" y="300" width="90" height="80" fill="#fcd34d"/>
    <path d="M705 300 L760 240 L815 300 Z" fill="#1e293b"/>
    <path d="M0 1100 Q 270 1060 540 1100 T 1080 1090 V1350 H0Z" fill="#031b21"/>
    ${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 173) % 1080}" cy="${(i * 61) % 300 + 30}" r="2" fill="#fff" opacity=".6"/>`).join('')}
  </svg>
  <div class="abs cap" style="top:640px;left:80px;color:#fcd34d">1 Samuel 1:9-18</div>
  <div class="abs dms" style="top:690px;left:80px;width:560px;color:#fff;font-size:76px">Ana <i style="color:#fcd34d">não se conformou.</i></div>
  <div class="abs txt" style="top:900px;left:80px;width:560px;color:#cbd5e1;font-size:28px">Deus procura intercessores na torre de vigia em favor da casa.</div>
  ${sig('#fcd34d', 'left:80px;bottom:80px')}
</div>`,

  // ───────── 22–25/12 · A visão da promessa cumprida + Natal
  'dia-38-toda-lagrima': `
<div class="post" style="background:#eef6ff">
  <svg class="abs" style="left:290px;top:120px" width="500" height="680" viewBox="0 0 500 680"><defs><linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfdbfe"/><stop offset="1" stop-color="#2563eb"/></linearGradient></defs>
    <path d="M250 0 C 250 0, 480 320, 480 450 A 230 230 0 0 1 20 450 C 20 320, 250 0, 250 0 Z" fill="url(#t)"/>
    <path d="M140 430 Q 150 520 230 560" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" opacity=".7"/>
    <path d="M60 300 L440 640" stroke="#eef6ff" stroke-width="26" stroke-linecap="round"/>
  </svg>
  <div class="abs cap" style="top:880px;left:0;right:0;text-align:center;color:#1d4ed8">Apocalipse 21:4</div>
  <div class="abs pf" style="top:930px;left:80px;right:80px;text-align:center;color:#1e3a8a;font-size:84px">Ele enxugará <i style="color:#2563eb">toda lágrima.</i></div>
  <div class="abs txt" style="top:1130px;left:120px;right:120px;text-align:center;color:#1e40af;font-size:27px">Não haverá mais morte, nem pranto, nem dor.</div>
  ${sig('#1d4ed8', 'left:0;right:0;text-align:center;bottom:50px')}
</div>`,

  'dia-39-terra-desolada': `
<div class="post" style="background:#fff">
  <div class="abs" style="left:0;top:0;width:540px;height:860px;background:#c9a27a">
    <svg width="540" height="860">${Array.from({ length: 14 }, (_, i) => `<path d="M${(i * 83) % 540} ${(i * 131) % 860} l ${30 + i % 3 * 20} ${40 + i % 4 * 15} l -20 40 l 50 30" stroke="#8b6a47" stroke-width="5" fill="none"/>`).join('')}
      <path d="M260 860 V640 M260 700 L200 640 M260 680 L320 620" stroke="#5a4330" stroke-width="10" fill="none" stroke-linecap="round"/></svg>
    <div class="blk" style="position:absolute;bottom:40px;left:40px;font-size:44px;color:#5a4330">ANTES</div>
  </div>
  <div class="abs" style="right:0;top:0;width:540px;height:860px;background:#86efac">
    <svg width="540" height="860">
      <path d="M270 860 V600" stroke="#166534" stroke-width="12"/>
      <circle cx="270" cy="470" r="170" fill="#16a34a"/><circle cx="190" cy="540" r="110" fill="#22c55e"/><circle cx="360" cy="540" r="110" fill="#22c55e"/>
      ${Array.from({ length: 16 }, (_, i) => `<circle cx="${(i * 97) % 520 + 10}" cy="${700 + (i * 53) % 150}" r="12" fill="${['#f472b6', '#facc15', '#fff'][i % 3]}"/>`).join('')}
      ${[[200, 430], [320, 400], [270, 520], [360, 500]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16" fill="#ef4444"/>`).join('')}
    </svg>
    <div class="blk" style="position:absolute;bottom:40px;right:40px;font-size:44px;color:#166534">DEPOIS</div>
  </div>
  <div class="abs cap" style="top:910px;left:80px;color:#166534">Apocalipse 21:2,5</div>
  <div class="abs dms" style="top:960px;left:80px;right:80px;color:#14532d;font-size:76px">Deus transforma <i style="color:#16a34a">terra desolada</i> em jardim.</div>
  <div class="abs txt" style="top:1160px;left:80px;right:300px;color:#3f6212;font-size:27px">E coração endurecido em povo Dele.</div>
  ${sig('#166534', 'right:72px;top:1180px')}
</div>`,

  'dia-40-deus-conosco': `
<div class="post" style="background:radial-gradient(circle at 50% 30%,#1e3a5f 0,#0b1426 60%)">
  <svg class="abs" style="inset:0" width="1080" height="1350">
    ${Array.from({ length: 70 }, (_, i) => `<circle cx="${(i * 157) % 1080}" cy="${(i * 97) % 900}" r="${i % 3 + 1}" fill="#fff" opacity="${0.25 + (i % 4) / 8}"/>`).join('')}
    <g transform="translate(540 330)">
      <path d="M0 -190 L18 -18 L190 0 L18 18 L0 190 L-18 18 L-190 0 L-18 -18 Z" fill="#fde68a"/>
      <path d="M0 -110 L12 -12 L110 0 L12 12 L0 110 L-12 12 L-110 0 L-12 -12 Z" fill="#fff" transform="rotate(45)"/>
      <circle r="24" fill="#fff"/>
    </g>
    <path d="M540 520 L180 1350 H900 Z" fill="#fde68a" opacity=".08"/>
  </svg>
  <div class="abs cap" style="top:640px;left:0;right:0;text-align:center;color:#fde68a">Véspera de Natal · Apocalipse 21:3</div>
  <div class="abs dms" style="top:700px;left:80px;right:80px;text-align:center;color:#fff;font-size:92px">Deus habita no <i style="color:#fde68a">meio do Seu povo.</i></div>
  <div class="abs hand" style="top:1000px;left:0;right:0;text-align:center;color:#fde68a;font-size:76px">Emanuel: Deus conosco.</div>
  <div class="abs" style="top:1110px;left:0;right:0;text-align:center;color:#cbd5e1;font-weight:700;letter-spacing:.16em;font-size:22px">MATEUS 1:23</div>
  ${sig('#cbd5e1', 'left:0;right:0;text-align:center;bottom:50px')}
</div>`,

  'dia-41-natal': `
<div class="post" style="background:#9b1c1c">
  ${grain}
  <svg class="abs" style="left:240px;top:120px" width="600" height="600">
    <circle cx="300" cy="300" r="230" fill="none" stroke="#166534" stroke-width="70"/>
    ${Array.from({ length: 22 }, (_, i) => { const a = i / 22 * Math.PI * 2; return `<path d="M${300 + Math.cos(a) * 230} ${300 + Math.sin(a) * 230} l 30 -14 l -10 30 z" fill="#15803d" transform="rotate(${i * 16} ${300 + Math.cos(a) * 230} ${300 + Math.sin(a) * 230})"/>`; }).join('')}
    ${Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2; return `<circle cx="${300 + Math.cos(a) * 232}" cy="${300 + Math.sin(a) * 232}" r="16" fill="${i % 2 ? '#fbbf24' : '#fecaca'}"/>`; }).join('')}
  </svg>
  <div class="abs hand" style="top:370px;left:0;right:0;text-align:center;color:#fff7ed;font-size:84px">Feliz Natal</div>
  <div class="abs cap" style="top:800px;left:0;right:0;text-align:center;color:#fecaca">2 Coríntios 1:20</div>
  <div class="abs dms" style="top:850px;left:80px;right:80px;text-align:center;color:#fff7ed;font-size:80px">Jesus é o cumprimento de <i style="color:#fbbf24">toda promessa.</i></div>
  <div class="abs txt" style="top:1080px;left:120px;right:120px;text-align:center;color:#fecaca;font-size:28px">O presente de Deus para você tem nome.</div>
  ${sig('#fecaca', 'left:0;right:0;text-align:center;bottom:50px')}
  ${logo(30, 'left:50%;transform:translateX(-50%);bottom:100px')}
</div>`,

  // ───────── 26–28/12 · Apocalipse 4 (novos ângulos)
  'dia-42-indescritivel': `
<div class="post" style="background:#0a0a0f">
  <svg class="abs" style="left:0;top:80px" width="1080" height="700">
    <path d="M90 620 A 450 450 0 0 1 990 620" fill="none" stroke="#10b981" stroke-width="30" opacity=".85"/>
    <path d="M150 620 A 390 390 0 0 1 930 620" fill="none" stroke="#34d399" stroke-width="16" opacity=".5"/>
    <g transform="translate(340 430)"><path d="M0 -90 L80 -30 L50 70 L-50 70 L-80 -30 Z" fill="#dc2626"/><path d="M0 -90 L0 70 M-80 -30 L50 70 M80 -30 L-50 70" stroke="#fca5a5" stroke-width="3" opacity=".6"/></g>
    <g transform="translate(560 380)"><path d="M0 -110 L95 0 L0 110 L-95 0 Z" fill="#f97316"/><path d="M0 -110 L0 110 M-95 0 L95 0" stroke="#fed7aa" stroke-width="3" opacity=".6"/></g>
    <g transform="translate(760 440)"><path d="M-70 -70 H70 L90 0 L70 70 H-70 L-90 0 Z" fill="#059669"/><path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke="#a7f3d0" stroke-width="3" opacity=".6"/></g>
  </svg>
  <div class="abs" style="top:800px;left:0;right:0;text-align:center;color:#a7f3d0;font-size:22px;letter-spacing:.3em;font-weight:700">JASPE · SARDÔNIO · ESMERALDA</div>
  <div class="abs pf" style="top:860px;left:80px;right:80px;text-align:center;color:#fff;font-size:76px">Não há descrição que esgote <i style="color:#34d399">quem Deus é.</i></div>
  <div class="abs txt" style="top:1080px;left:120px;right:120px;text-align:center;color:#d1d5db;font-size:27px">Mas a certeza da Sua presença enche a alma de alegria e fé.</div>
  <div class="abs" style="bottom:70px;left:0;right:0;text-align:center;color:#34d399;font-weight:700;letter-spacing:.16em;font-size:22px">APOCALIPSE 4:3 · @EWANDERMACEDO</div>
</div>`,

  'dia-43-coroas': `
<div class="post" style="background:#111">
  <svg class="abs" style="inset:0" width="1080" height="1350"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset=".5" stop-color="#d4a017"/><stop offset="1" stop-color="#fff1b8"/></linearGradient></defs>
    ${[[160, 160, -20, 1], [430, 90, 12, .8], [760, 170, -8, 1.1], [300, 420, 25, .7], [640, 400, -18, .9], [880, 470, 15, .6]].map(([x, y, r, s]) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M-80 50 L-90 -40 L-40 0 L0 -60 L40 0 L90 -40 L80 50 Z" fill="url(#g)"/><rect x="-82" y="50" width="164" height="22" fill="url(#g)"/></g>`).join('')}
  </svg>
  <div class="abs cap" style="top:690px;left:80px;color:#d4a017">Apocalipse 4:10-11</div>
  <div class="abs blk" style="top:740px;left:76px;font-size:150px;color:transparent;background:linear-gradient(90deg,#fde68a,#d4a017,#fff1b8);-webkit-background-clip:text">DIGNO<br>ÉS TU.</div>
  <div class="abs txt" style="top:1080px;left:80px;right:140px;color:#e5e5e5;font-size:28px">No céu, as coroas são lançadas diante do trono. Toda glória, honra e poder pertencem a Ele.</div>
  ${sig('#d4a017')}
</div>`,

  'dia-44-aliancas': `
<div class="post" style="background:#f5f1e1">
  <svg class="abs" style="left:140px;top:150px" width="800" height="560">
    ${Array.from({ length: 24 }, (_, i) => { const a = Math.PI + i / 23 * Math.PI; const x = 400 + Math.cos(a) * 360, y = 420 + Math.sin(a) * 340; return `<g transform="translate(${x} ${y})"><rect x="-18" y="-24" width="36" height="40" rx="6" fill="${i < 12 ? '#6b7a2e' : '#a16207'}"/><rect x="-24" y="10" width="48" height="10" rx="4" fill="${i < 12 ? '#6b7a2e' : '#a16207'}"/></g>`; }).join('')}
    <g transform="translate(400 420)"><rect x="-60" y="-80" width="120" height="110" rx="14" fill="#1c1917"/><rect x="-80" y="20" width="160" height="22" rx="8" fill="#1c1917"/><circle cy="-120" r="26" fill="#d4a017"/></g>
  </svg>
  <div class="abs" style="top:750px;left:0;right:0;display:flex;justify-content:center;gap:60px;font-weight:700;font-size:24px;letter-spacing:.14em"><span style="color:#6b7a2e">● 12 TRIBOS</span><span style="color:#a16207">● 12 APÓSTOLOS</span></div>
  <div class="abs pf" style="top:830px;left:80px;right:80px;text-align:center;color:#1c1917;font-size:88px">Deus <i style="color:#a16207">honra</i> as Suas alianças.</div>
  <div class="abs txt" style="top:1060px;left:120px;right:120px;text-align:center;color:#44403c;font-size:27px">Antiga e Nova Aliança alinhadas ao trono. Ele zela pela Sua Palavra.</div>
  <div class="abs" style="top:1170px;left:0;right:0;text-align:center;color:#6b7a2e;font-weight:700;letter-spacing:.16em;font-size:22px">APOCALIPSE 4:4</div>
  ${sig('#44403c', 'left:0;right:0;text-align:center;bottom:50px')}
</div>`,

  // ───────── 29–30/12 · Efésios 1 — fechamento do ano
  'dia-45-planta': `
<div class="post" style="background:#0b4f8a;background-image:linear-gradient(rgba(255,255,255,.12) 2px,transparent 2px),linear-gradient(90deg,rgba(255,255,255,.12) 2px,transparent 2px),linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:120px 120px,120px 120px,24px 24px,24px 24px">
  <svg class="abs" style="left:140px;top:150px" width="800" height="560" fill="none" stroke="#e0f2fe" stroke-width="4">
    <rect x="40" y="40" width="720" height="460"/><path d="M40 260 H400 V500 M400 260 V40 M560 40 V300 H760"/>
    <path d="M200 260 a 60 60 0 0 1 60 -60" stroke-dasharray="8 8"/><path d="M560 160 a 60 60 0 0 0 -60 60" stroke-dasharray="8 8"/>
    <text x="110" y="160" fill="#e0f2fe" stroke="none" font-family="Inter" font-size="26">MEUS PLANOS</text>
    <text x="440" y="400" fill="#e0f2fe" stroke="none" font-family="Inter" font-size="26">PROJETOS 2027</text>
    <path d="M80 540 H720" stroke-width="2"/><path d="M80 530 V550 M720 530 V550" stroke-width="2"/>
  </svg>
  <div class="abs" style="left:520px;top:110px;transform:rotate(8deg);border:6px solid #fca5a5;color:#fca5a5;font-family:Blk;font-size:44px;padding:10px 22px">ENTREGUE A DEUS</div>
  <div class="abs cap" style="top:790px;left:80px;color:#bae6fd">Efésios 1:9-11</div>
  <div class="abs dms" style="top:840px;left:80px;right:80px;color:#fff;font-size:80px">Rompa com todo <i style="color:#bae6fd">plano inferior.</i></div>
  <div class="abs txt" style="top:1030px;left:80px;right:140px;color:#e0f2fe;font-size:28px">Tenha coragem de entregar seus projetos a Deus e viver o que Ele planejou, debaixo do governo de Jesus.</div>
  ${sig('#bae6fd')}
</div>`,

  'dia-46-novo-ciclo': `
<div class="post" style="background:linear-gradient(160deg,#ff5f6d 0%,#ffc371 100%)">
  <div class="abs bebas" style="top:150px;left:0;right:0;text-align:center;font-size:400px;color:transparent;-webkit-text-stroke:4px #fff">2027</div>
  <div class="abs cap" style="top:620px;left:0;right:0;text-align:center;color:#7c2d12">Profetize um novo ciclo · Efésios 1:17-19</div>
  <div class="abs" style="top:690px;left:120px;right:120px;background:rgba(255,255,255,.92);border-radius:28px;padding:44px 50px">
    <div class="hand" style="font-size:58px;color:#be123c">Senhor, que em 2027…</div>
    ${['te conheçamos mais e mais;', 'a esperança em Cristo renove a nossa mente;', 'o Teu poder se manifeste em nós e através de nós.'].map(t => `<div style="font-size:30px;line-height:1.35;color:#431407;margin-top:20px;display:flex;gap:16px"><span style="color:#f97316;font-weight:800">✦</span><span>${t}</span></div>`).join('')}
    <div class="hand" style="font-size:52px;color:#be123c;margin-top:24px;text-align:right">Amém!</div>
  </div>
  ${sig('#7c2d12', 'left:0;right:0;text-align:center;bottom:50px')}
</div>`,
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(S, 'html5'), { recursive: true });
  for (const [name, body] of Object.entries(posts)) {
    if (ONLY && !name.includes(ONLY)) continue;
    const f = path.join(S, 'html5', name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
