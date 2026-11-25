// Gera Pilulas_de_Lideranca_LM_Consultoria.pptx no padrão visual Neki (Gestão de Pessoas).
// Uso: node apresentacao-pilulas/build_pptx.js
const pptxgen = require("pptxgenjs");
const path = require("path");
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");

const THEME = {
  name: "Neki LM",
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  colors: {
    dk1: "0B0B0B", lt1: "F9F9F7", dk2: "52514E", lt2: "F3F2EE",
    accent1: "2A78D6", accent2: "1BAF7A", accent3: "EB6834",
    accent4: "1D5FB0", accent5: "12754F", accent6: "B4461A",
    hlink: "1D5FB0", folHlink: "52514E",
  },
};
const OUT = path.join(__dirname, "Pilulas_de_Lideranca_LM_Consultoria.pptx");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Pílulas de Liderança — LM Consultoria";
pres.author = "LM Consultoria";
pres.company = "LM Consultoria";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

// neutros do padrão Neki que não cabem no tema
const SURFACE = "FCFCFB", BORDER = "E1E0D9", MUTED = "6E6D68";
const DARK = "0D0D0D", DARK2 = "1A1A19", DARKLINE = "2C2C2A", DARKTXT = "F4F3EF", DARKMUTED = "A9A8A1";
const ACC = { blue: [C.accent1, C.accent4, "5B9AE6"], green: [C.accent2, C.accent5, "3CC893"], orange: [C.accent3, C.accent6, "F08A5F"] };

const MX = 0.75, CW = 13.333 - 2 * MX;

// ---------- layouts ----------
pres.defineSlideMaster({
  title: "Capa", background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "eyebrow", type: "body", x: MX, y: 0.7, w: CW, h: 0.35, fontSize: 12, bold: true, color: C.text2, charSpacing: 2, margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: MX, y: 1.15, w: CW, h: 1.2, fontSize: 60, bold: true, color: C.text1, margin: 0, valign: "top", align: "left" }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "Divisor", background: { color: DARK },
  objects: [
    { text: { text: "LM Consultoria", options: { x: MX, y: 6.8, w: 4, h: 0.3, fontSize: 12, bold: true, color: "C3C2B7", margin: 0, isTextBox: true } } },
  ],
  slideNumber: { x: 12.1, y: 6.8, w: 0.5, h: 0.3, fontSize: 12, color: "898781", align: "right" },
});
pres.defineSlideMaster({
  title: "Conteudo", background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: MX, y: 1.0, w: CW, h: 1.0, fontSize: 34, bold: true, color: C.text1, margin: 0, valign: "top", align: "left" }, text: "" } },
    { text: { text: "LM Consultoria", options: { x: MX, y: 6.85, w: 3, h: 0.3, fontSize: 11, bold: true, color: C.text2, margin: 0, isTextBox: true } } },
  ],
  slideNumber: { x: 12.1, y: 6.85, w: 0.5, h: 0.3, fontSize: 11, color: MUTED, align: "right" },
});

// ---------- helpers ----------
let n = 0;
const id = (s) => `${s}-${++n}`;
function dot(slide, x, y, color) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 0.13, h: 0.13, rectRadius: 0.03, fill: { color }, line: { color, width: 0 }, objectName: id("marcador") });
}
function eyebrow(slide, text, acc, dark) {
  dot(slide, MX, 0.66, ACC[acc][0]);
  slide.addText(text.toUpperCase(), { x: MX + 0.25, y: 0.58, w: CW - 0.25, h: 0.3, fontSize: 12, bold: true, charSpacing: 2, color: dark ? DARKMUTED : MUTED, margin: 0, isTextBox: true, objectName: id("eyebrow") });
}
function title(slide, a, b, acc) {
  slide.addText([{ text: a + " " }, { text: b, options: { color: ACC[acc][1] } }], { placeholder: "title" });
}
function lead(slide, text, y = 2.05) {
  slide.addText(text, { x: MX, y, w: 10.5, h: 0.7, fontSize: 16, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: id("lead") });
}
function source(slide, text) {
  slide.addText(text, { x: 3.9, y: 6.85, w: 8.0, h: 0.3, fontSize: 11, color: MUTED, align: "right", margin: 0, isTextBox: true, objectName: id("fonte") });
}
function panel(slide, x, y, w, h, fill = SURFACE, line = BORDER) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: line, width: 0.75 }, objectName: id("painel") });
}
// grade de 3 cartões estilo KPI do painel Neki
function cards3(slide, items, acc, y = 3.05, h0) {
  const h = h0 || (items.some((it) => it.tag) ? 3.35 : 2.85);
  const gap = 0.25, w = (CW - 2 * gap) / 3;
  items.forEach((it, i) => {
    const x = MX + i * (w + gap);
    panel(slide, x, y, w, h);
    dot(slide, x + 0.35, y + 0.42, ACC[acc][0]);
    slide.addText(it.label, { x: x + 0.58, y: y + 0.32, w: w - 0.9, h: 0.32, fontSize: 12, bold: true, color: C.text2, margin: 0, isTextBox: true, objectName: id("rotulo") });
    slide.addText(it.h, { x: x + 0.35, y: y + 0.8, w: w - 0.7, h: 0.75, fontSize: 20, bold: true, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: id("cartao-titulo") });
    slide.addText(it.p, { x: x + 0.35, y: y + 1.6, w: w - 0.7, h: it.tag ? 1.05 : 1.5, fontSize: 14, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: id("cartao-texto") });
    if (it.tag) slide.addText(it.tag, { x: x + 0.35, y: y + h - 0.6, w: w - 0.7, h: 0.4, fontSize: 11, bold: true, color: MUTED, margin: 0, valign: "bottom", isTextBox: true, objectName: id("cartao-fonte") });
  });
}
function content(sec, eb, acc, t1, t2) {
  const s = pres.addSlide({ masterName: "Conteudo", sectionTitle: sec });
  eyebrow(s, eb, acc);
  title(s, t1, t2, acc);
  return s;
}
function divider(sec, eb, acc, l1, l2, txt, pills) {
  const s = pres.addSlide({ masterName: "Divisor", sectionTitle: sec });
  eyebrow(s, eb, acc, true);
  s.addText([{ text: l1, options: { breakLine: true } }, { text: l2, options: { color: ACC[acc][2] } }], { x: MX, y: 1.6, w: CW, h: 2.4, fontSize: 56, bold: true, color: DARKTXT, margin: 0, valign: "top", isTextBox: true, objectName: id("titulo-divisor") });
  s.addText(txt, { x: MX, y: 4.15, w: 10, h: 0.8, fontSize: 18, color: "C3C2B7", margin: 0, valign: "top", isTextBox: true, objectName: id("lead") });
  pills.forEach((p, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX + i * 1.55, y: 5.3, w: 1.4, h: 0.42, rectRadius: 0.21, fill: { color: DARK2 }, line: { color: DARKLINE, width: 0.75 }, objectName: id("pilula") });
    s.addText(p, { x: MX + i * 1.55, y: 5.3, w: 1.4, h: 0.42, fontSize: 12, bold: true, color: DARKTXT, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: id("pilula-texto") });
  });
  return s;
}
const tableOpts = (colW) => ({ x: MX, y: 2.35, w: CW, colW, fontSize: 13, color: "0B0B0B", border: { type: "solid", pt: 0.75, color: BORDER }, margin: [0.07, 0.12, 0.07, 0.12], valign: "middle" });
const th = (t) => ({ text: t, options: { bold: true, fill: { color: "F3F2EE" }, color: "52514E" } });

// ================= SLIDES =================
// 1 Capa
pres.addSection({ title: "Abertura" });
{
  const s = pres.addSlide({ masterName: "Capa", sectionTitle: "Abertura" });
  s.addText("LM CONSULTORIA · GESTÃO DE PESSOAS", { placeholder: "eyebrow" });
  s.addText("Maior é o que serve", { placeholder: "title" });
  s.addText("Pílulas de liderança e carreira: os conceitos da mentoria e das apostilas FGV aplicados ao dia a dia de quem lidera.", { x: MX, y: 2.55, w: 9, h: 0.9, fontSize: 18, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: "subtitulo" });
  const kp = [["Pílulas", "12", null], ["Liderar", "3", "blue"], ["Desenvolver", "5", "green"], ["Medir e executar", "4", "orange"]];
  const w = CW / 4;
  kp.forEach(([l, v, a], i) => {
    const x = MX + i * w;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 5.0, w, h: 1.55, fill: { color: SURFACE }, line: { color: BORDER, width: 0.75 }, objectName: id("kpi") });
    if (a) dot(s, x + 0.3, 5.36, ACC[a][0]);
    s.addText(l, { x: x + (a ? 0.52 : 0.3), y: 5.27, w: w - 0.6, h: 0.3, fontSize: 12, bold: true, color: C.text2, margin: 0, isTextBox: true, objectName: id("kpi-rotulo") });
    s.addText(v, { x: x + 0.3, y: 5.7, w: w - 0.6, h: 0.65, fontSize: 32, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: id("kpi-valor") });
  });
  s.addNotes("Abertura. Este material reúne as 12 pílulas publicadas no LinkedIn, organizadas em três blocos e enriquecidas com os conceitos das apostilas FGV usadas na mentoria de carreira.");
}
// 2 Mapa
{
  const s = pres.addSlide({ masterName: "Conteudo", sectionTitle: "Abertura" });
  s.addText("MAPA DO CONTEÚDO", { x: MX, y: 0.58, w: CW, h: 0.3, fontSize: 12, bold: true, charSpacing: 2, color: MUTED, margin: 0, isTextBox: true, objectName: "eyebrow-mapa" });
  s.addText("Três blocos, doze pílulas", { placeholder: "title" });
  const cols = [
    ["Bloco 1", "Liderar", "blue", ["Decidir sob pressão", "Ouvir, discernir e servir", "Liderança situacional", "Gestão de conflitos"]],
    ["Bloco 2", "Desenvolver", "green", ["Carreira como plano", "Competências (CHA)", "Avaliação 360° e feedback", "PDI e educação corporativa"]],
    ["Bloco 3", "Medir e executar", "orange", ["Metas SMART", "OKR", "Princípios de projetos", "O “S” do ESG"]],
  ];
  const gap = 0.25, w = (CW - 2 * gap) / 3;
  cols.forEach(([b, h, a, li], i) => {
    const x = MX + i * (w + gap), y = 2.3;
    panel(s, x, y, w, 3.9);
    dot(s, x + 0.35, y + 0.42, ACC[a][0]);
    s.addText(b.toUpperCase(), { x: x + 0.58, y: y + 0.32, w: 2, h: 0.3, fontSize: 12, bold: true, charSpacing: 2, color: MUTED, margin: 0, isTextBox: true, objectName: id("bloco") });
    s.addText(h, { x: x + 0.35, y: y + 0.8, w: w - 0.7, h: 0.55, fontSize: 22, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: id("bloco-titulo") });
    s.addText(li.map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < li.length - 1 } })), { x: x + 0.35, y: y + 1.5, w: w - 0.7, h: 2.1, fontSize: 15, color: C.text2, paraSpaceAfter: 8, valign: "top", isTextBox: true, objectName: id("bloco-lista") });
  });
  source(s, "Base: mentoria de carreira e apostilas FGV");
  s.addNotes("Cada bloco reúne pílulas publicadas e acrescenta o conteúdo de apoio das apostilas FGV: tabelas, passo a passo e dados que não cabem num post.");
}

// ---------- Bloco 1 ----------
pres.addSection({ title: "Liderar" });
divider("Liderar", "Bloco 1 · Liderar", "blue", "A complexidade", "é o trabalho", "Liderar começa por decidir com método, servir a equipe e ajustar a postura a cada pessoa.", ["Pílula #01", "Pílula #04", "Pílula #09"]);
{
  const s = content("Liderar", "Pílula #01 · Decisão sob pressão", "blue", "Três movimentos para", "decidir com método");
  lead(s, "Sob pressão, o impulso é sair dela rápido. Líderes que crescem fazem o contrário: entendem antes de decidir.");
  cards3(s, [
    { label: "01", h: "Dados antes de opinião", p: "Comece pela situação real: números, processos e fatos, não a percepção de quem fala mais alto." },
    { label: "02", h: "Mapeie as tensões", p: "Financeira, regulatória, organizacional e pessoal: onde está o atrito de verdade?" },
    { label: "03", h: "Procure dentro de casa", p: "Muitas soluções já existem no contexto da empresa. O trabalho é estruturá-las." },
  ], "blue");
  source(s, "Fonte: método de trabalho LM Consultoria");
  s.addNotes("Pílula #01. Pergunta para a plateia: qual desses três movimentos é o mais difícil para você hoje?");
}
{
  const s = content("Liderar", "Pílula #04 · Liderança de apoio", "blue", "Maior é", "o que serve");
  lead(s, "O líder relevante não é o que tem mais poder na sala. É o que investe tempo em ouvir, discernir e servir a equipe.");
  cards3(s, [
    { label: "Ouvir", h: "Escuta ativa", p: "Conhecer e considerar opiniões e sugestões de quem está na linha de frente antes de decidir.", tag: "FGV – Gestão de Pessoas e Liderança, p. 47" },
    { label: "Discernir", h: "Ler a maturidade", p: "Cada pessoa vive um momento: direção, orientação, apoio ou autonomia.", tag: "Teoria Situacional, p. 46" },
    { label: "Servir", h: "“Como posso ajudar?”", p: "Cuidar do bem-estar do time e remover obstáculos do caminho.", tag: "FGV – Gestão de Desempenho, p. 33" },
  ], "blue");
  source(s, "Fonte: apostilas FGV – Gestão de Pessoas e Liderança; Gestão de Desempenho");
  s.addNotes("Servir não é abrir mão de autoridade: é usar a autoridade a favor das pessoas e, por meio delas, dos resultados. Pergunta: qual dessas três atitudes você mais valoriza no melhor líder que já teve?");
}
{
  const s = content("Liderar", "Aprofundamento · Hersey e Blanchard", "blue", "O estilo do líder segue", "a maturidade do liderado");
  s.addTable([
    [th("Estilo"), th("Tarefa × relação"), th("O que o líder faz"), th("Quando usar")],
    ["E1 · Direção", "Alta × baixa", "Orienta com clareza o que e como fazer e acompanha a execução", "Pessoa ainda sem preparo para assumir sozinha"],
    ["E2 · Orientação", "Alta × alta", "Dialoga com escuta ativa e reflexiva e considera sugestões", "Motivada, mas ainda precisa de orientação"],
    ["E3 · Apoio", "Baixa × alta", "Compartilha decisões e cuida da relação", "Capaz, mas insegura ou pouco engajada"],
    ["E4 · Delegação", "Baixa × baixa", "Confia a tarefa e a responsabilidade", "Capaz e confiante"],
  ], { ...tableOpts([2.1, 2.1, 3.8, 3.83]), y: 2.4, rowH: 0.7, objectName: "tabela-situacional" });
  source(s, "Fonte: apostila FGV – Gestão de Pessoas e Liderança, p. 46–47 (Gavioli, 2015)");
  s.addNotes("A mesma pessoa pode estar em E1 numa tarefa nova e em E4 naquilo que domina. Os estilos E1 e E2 estão descritos literalmente na apostila; E3 e E4 seguem a mesma lógica da teoria.");
}
{
  const s = content("Liderar", "Pílula #09 · Clima e conflitos", "blue", "Conflito bem conduzido", "fortalece a equipe");
  lead(s, "Toda equipe viva tem divergências. O papel do líder é transformá-las em diálogo, não em ruptura.");
  cards3(s, [
    { label: "01", h: "Trate cedo", p: "Conflito ignorado contamina o clima, a confiança e os resultados." },
    { label: "02", h: "Olhe os fatos", p: "Separe as pessoas das posições: qual problema precisamos resolver juntos?" },
    { label: "03", h: "Ouça interesses", p: "Por trás de cada posição há uma necessidade real: reconhecimento, segurança, prazo." },
  ], "blue");
  source(s, "Fonte: apostila FGV – Gestão de Pessoas e Liderança, Unid. 3; negociação por interesses (mentoria)");
  s.addNotes("Conduzir conflitos é servir a equipe: proteger as relações sem abrir mão da verdade.");
}

// ---------- Bloco 2 ----------
pres.addSection({ title: "Desenvolver" });
divider("Desenvolver", "Bloco 2 · Desenvolver", "green", "Carreira não é escada.", "É um plano.", "Competências, feedback de todos os lados e um PDI escrito transformam intenção em crescimento.", ["Pílula #02", "Pílula #05", "Pílula #07", "Pílula #10", "Pílula #11"]);
{
  const s = content("Desenvolver", "Pílula #02 · Carreira horizontal", "green", "Organizações mais enxutas,", "carreiras mais horizontais");
  panel(s, MX, 2.35, 5.6, 3.95);
  s.addText("1 em 3", { x: MX + 0.4, y: 2.65, w: 4.8, h: 1.1, fontSize: 60, bold: true, color: C.accent5, margin: 0, isTextBox: true, objectName: "stat-mercer" });
  s.addText("profissionais acredita que o próprio emprego deixará de existir em alguns anos por causa da IA e da automação.", { x: MX + 0.4, y: 3.9, w: 4.8, h: 1.3, fontSize: 16, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: "stat-texto" });
  s.addText("Mercer, 2020, citado na apostila FGV", { x: MX + 0.4, y: 5.65, w: 4.8, h: 0.35, fontSize: 11, bold: true, color: MUTED, margin: 0, isTextBox: true, objectName: "stat-fonte" });
  const x2 = MX + 6.1;
  s.addText("O que fazer com isso", { x: x2, y: 2.4, w: 5.7, h: 0.5, fontSize: 20, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: "acoes-titulo" });
  const rows = [["Pense na horizontal: ", "ampliar escopo, projetos e competências também é crescer."], ["Invista no que é humano: ", "liderança, comunicação e decisão ganham peso com a automação."], ["Transforme intenção em PDI: ", "propósito, metas SMART, ações e feedback."]];
  s.addText(rows.flatMap(([b, t], k) => [{ text: b, options: { bold: true, color: C.text1 } }, { text: t, options: { breakLine: k < rows.length - 1 } }]), { x: x2, y: 3.05, w: 5.7, h: 3.0, fontSize: 15, color: C.text2, paraSpaceAfter: 14, margin: 0, valign: "top", isTextBox: true, objectName: "acoes-lista" });
  source(s, "Fonte: apostila FGV – Cargos, Carreiras e Remuneração, p. 6 e 46–47 (Chiavenato, 2014)");
  s.addNotes("Com o enxugamento dos níveis hierárquicos, o encarreiramento está cada vez mais horizontal. Um plano de carreira alinhado à estratégia aumenta engajamento, retenção e garante sucessão.");
}
{
  const s = content("Desenvolver", "Pílula #10 · Gestão por competência", "green", "Competência é saber, fazer", "e querer");
  lead(s, "Diploma não basta: o que transforma resultados é a soma de três dimensões.");
  cards3(s, [
    { label: "C", h: "Conhecimento", p: "O saber: o que você estudou, leu e entende do seu campo." },
    { label: "H", h: "Habilidade", p: "O saber fazer: conduzir uma reunião, montar uma análise, negociar um prazo." },
    { label: "A", h: "Atitude", p: "O querer fazer: a disposição de agir, aprender e servir." },
  ], "green");
  source(s, "Fonte: apostila FGV – Gestão de Pessoas e Liderança, Unid. 9");
  s.addNotes("Na mentoria, o CHA vira CHAR, com o R de Resultados. Pergunta: das três, qual você mais precisa desenvolver agora?");
}
{
  const s = content("Desenvolver", "Pílulas #05 e #07 · Avaliação e feedback", "green", "Crescer é ter coragem de", "ser visto por inteiro");
  const w = (CW - 0.4) / 2;
  const blocks = [
    ["Avaliação 360°: quem olha", [["Pares: ", "enxergam o que o gestor não vê."], ["Liderados: ", "a liderança é medida pela experiência da equipe."], ["Clientes internos e externos: ", "sentem o resultado do trabalho."], ["Superiores: ", "continuam no processo, mas não sozinhos."]]],
    ["Feedback: como entregar", [["Hora marcada: ", "a pessoa chega preparada e traz as próprias perguntas."], ["Fatos, não impressões: ", "situações que realmente aconteceram, sem rótulos."], ["Plano em conjunto: ", "próximos passos e a data da próxima conversa."]]],
  ];
  blocks.forEach(([h, rows], i) => {
    const x = MX + i * (w + 0.4);
    panel(s, x, 2.35, w, 4.0);
    s.addText(h, { x: x + 0.4, y: 2.6, w: w - 0.8, h: 0.5, fontSize: 20, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: id("painel-titulo") });
    s.addText(rows.flatMap(([b, t], k) => [{ text: b, options: { bold: true, color: C.text1 } }, { text: t, options: { breakLine: k < rows.length - 1 } }]), { x: x + 0.4, y: 3.25, w: w - 0.8, h: 2.9, fontSize: 15, color: C.text2, paraSpaceAfter: 12, margin: 0, valign: "top", isTextBox: true, objectName: id("painel-lista") });
  });
  source(s, "Fonte: apostila FGV – Gestão de Desempenho, p. 44 e 86 (Pontes, 2016)");
  s.addNotes("A avaliação 360° substitui a lógica clássica em que só o líder avalia o subordinado. Dar feedback é um ato de serviço: o líder que observa, prepara e conversa diz “eu me importo com o seu crescimento”.");
}
{
  const s = content("Desenvolver", "Aprofundamento · Plano de Desenvolvimento Individual", "green", "Do feedback ao PDI:", "cinco passos");
  lead(s, "O que o feedback apontou vira comportamento novo quando ganha objetivo, ação e acompanhamento.");
  const steps = [["Propósito", "O que será aprimorado e por quê, a partir dos pontos fortes e a desenvolver."], ["Objetivos", "Metas SMART: específicas, mensuráveis, alcançáveis, relevantes e com prazo."], ["Ações", "Curso ou coaching, mentoria com líderes seniores, liderar um projeto."], ["Análise", "Checar o progresso em momentos definidos e ajustar a rota."], ["Feedbacks", "Ouvir de novo quem convive com o trabalho e fechar o ciclo."]];
  const gap = 0.2, w = (CW - 4 * gap) / 5;
  steps.forEach(([h, p], i) => {
    const x = MX + i * (w + gap), y = 3.05;
    panel(s, x, y, w, 3.3);
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: y + 0.3, w: 0.5, h: 0.5, fill: { color: C.accent5 }, line: { color: C.accent5, width: 0 }, objectName: id("passo-circulo") });
    s.addText(String(i + 1).padStart(2, "0"), { x: x + 0.3, y: y + 0.3, w: 0.5, h: 0.5, fontSize: 12, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: id("passo-num") });
    s.addText(h, { x: x + 0.3, y: y + 0.95, w: w - 0.5, h: 0.45, fontSize: 17, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: id("passo-titulo") });
    s.addText(p, { x: x + 0.3, y: y + 1.45, w: w - 0.5, h: 1.7, fontSize: 14, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: id("passo-texto") });
  });
  source(s, "Fonte: apostila FGV – Gestão de Desempenho, p. 86–87");
  s.addNotes("Na mentoria de carreira, o PDI é construído nas aulas 11 a 15, junto com o Currículo Comportamental. Pergunta: você tem um PDI escrito hoje?");
}
{
  const s = content("Desenvolver", "Pílula #11 · Educação corporativa", "green", "Conhecimento compartilhado", "se multiplica");
  lead(s, "Organizações que crescem fazem do aprendizado um hábito coletivo, não um evento isolado.");
  cards3(s, [
    { label: "Treinamento", h: "Treine para hoje", p: "As competências de que a equipe precisa agora para entregar o que o negócio exige." },
    { label: "Educação continuada", h: "Eduque para sempre", p: "Trilhas que acompanham a carreira, além do curso pontual." },
    { label: "Gestão do conhecimento", h: "Guarde o que se aprende", p: "Processos documentados e mentorias internas: o que um sabe, todos acessam." },
  ], "green");
  source(s, "Fonte: apostila FGV – Gestão de Pessoas e Liderança, Unid. 8");
  s.addNotes("O líder que serve não guarda conhecimento como fonte de poder: ele o distribui.");
}

// ---------- Bloco 3 ----------
pres.addSection({ title: "Medir e executar" });
divider("Medir e executar", "Bloco 3 · Medir e executar", "orange", "Propósito claro.", "Resultado que se mede.", "Metas bem escritas, objetivos compartilhados e aprendizado de projeto sustentam a liderança que serve.", ["Pílula #03", "Pílula #06", "Pílula #08", "Pílula #12"]);
{
  const s = content("Medir e executar", "Pílula #03 · Metas SMART", "orange", "Meta que não vira número", "vira opinião");
  s.addText("“", { x: MX, y: 2.2, w: 1, h: 1, fontSize: 72, bold: true, color: C.accent3, margin: 0, isTextBox: true, objectName: "aspas" });
  s.addText("Qualquer objetivo que não possa ser transformado claramente em um número permite a manipulação e interpretação.", { x: MX, y: 3.0, w: 5.6, h: 1.7, fontSize: 21, bold: true, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "citacao" });
  s.addText([{ text: "Exemplo da apostila: " }, { text: "reduzir o prazo de pagamento ao fornecedor de 5 para 3 dias úteis até o final do ano fiscal corrente.", options: { bold: true, color: C.text1 } }], { x: MX, y: 4.9, w: 5.6, h: 1.1, fontSize: 14, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: "exemplo" });
  const x2 = MX + 6.1, w2 = CW - 6.1;
  panel(s, x2, 2.35, w2, 4.0);
  s.addText("SMART letra a letra", { x: x2 + 0.4, y: 2.6, w: w2 - 0.8, h: 0.5, fontSize: 20, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: "smart-titulo" });
  const L = [["S · Específica: ", "tangível, escrita como ação."], ["M · Mensurável: ", "indicador e método claros."], ["A · Atingível: ", "desafiadora, mas possível."], ["R · Relevante: ", "alinhada à estratégia."], ["T · Temporal: ", "com prazo para ser cobrada."]];
  s.addText(L.flatMap(([b, t], k) => [{ text: b, options: { bold: true, color: C.text1 } }, { text: t, options: { breakLine: k < L.length - 1 } }]), { x: x2 + 0.4, y: 3.25, w: w2 - 0.8, h: 2.9, fontSize: 15, color: C.text2, paraSpaceAfter: 10, margin: 0, valign: "top", isTextBox: true, objectName: "smart-lista" });
  source(s, "Fonte: apostila FGV – Gestão de Desempenho, p. 33–34 (Drucker, 1954; Barbosa, 2012)");
  s.addNotes("A apostila recomenda que gestor e colaborador construam as metas juntos, até chegar a um consenso. Meta inatingível gera frustração e desânimo.");
}
{
  const s = content("Medir e executar", "Pílula #06 · OKR", "orange", "A equipe sabe aonde vai", "e quando chegou");
  lead(s, "OKR combina uma meta e uma métrica para chegar a um resultado mensurável.");
  cards3(s, [
    { label: "O · Objective", h: "Um objetivo que inspira", p: "Descreve o resultado desejado, em palavras que movem pessoas." },
    { label: "KR · Key Results", h: "Resultados-chave que provam", p: "Poucas métricas objetivas que mostram quando o objetivo foi atingido." },
    { label: "Desdobramento", h: "Do topo para cada equipe", p: "Os OKRs da empresa se desdobram no que cada time, área ou projeto vai entregar." },
  ], "orange");
  source(s, "Fonte: apostila FGV – Gestão de Projetos, p. 40");
  s.addNotes("Pergunta: a sua equipe consegue dizer hoje qual é o objetivo do trimestre e como ele será medido?");
}
{
  const s = content("Medir e executar", "Pílula #08 · Princípios de projetos", "orange", "Toda experiência", "é matéria-prima");
  lead(s, "Os sete princípios do PRINCE2. Três deles servem a qualquer líder, com ou sem metodologia formal.", 1.75);
  const D = "Destaque";
  s.addTable([
    [th("Princípio"), th("Na prática do líder"), th("Pílula #08")],
    ["Aprender com a experiência", "Consultar as lições anteriores e registrar as novas", D],
    ["Justificativa de negócio contínua", "Confirmar a cada etapa se ainda gera valor", D],
    ["Gerenciar por exceção", "Combinar limites e intervir só se forem rompidos", D],
    ["Funções e responsabilidades definidas", "Cada pessoa sabe o que decide e entrega", "–"],
    ["Gerenciar por estágios", "Planejar e revisar o projeto em etapas", "–"],
    ["Foco em produtos", "Orientar o trabalho pelas entregas", "–"],
    ["Adaptar ao ambiente do projeto", "Ajustar o método ao tamanho e ao contexto", "–"],
  ], { ...tableOpts([4.2, 5.83, 1.8]), y: 2.55, rowH: 0.48, objectName: "tabela-prince2" });
  source(s, "Fonte: apostila FGV – Gestão de Projetos, p. 22");
  s.addNotes("Os três primeiros foram o tema da pílula #08. O líder que serve cria um ambiente em que errar uma vez é aprendizado, e não repetição.");
}
{
  const s = content("Medir e executar", "Pílula #12 · ESG e gestão de pessoas", "orange", "O “S” do ESG", "começa dentro de casa");
  lead(s, "Antes de qualquer relatório, a primeira prova de responsabilidade social é como a empresa trata as próprias pessoas.");
  cards3(s, [
    { label: "01", h: "Inclusão", p: "Equipes diversas, com espaço real para todas as vozes nas conversas e decisões." },
    { label: "02", h: "Bem-estar", p: "Saúde, segurança e equilíbrio como parte da estratégia, não como benefício." },
    { label: "03", h: "Propósito", p: "Desenvolvimento e sentido no trabalho: a base do engajamento." },
  ], "orange");
  source(s, "Fonte: apostila FGV – Gestão de Pessoas e Liderança, Unid. 4");
  s.addNotes("Sustentabilidade começa no modo como o líder serve quem está ao seu lado todos os dias.");
}

// ---------- Fechamento ----------
pres.addSection({ title: "Fechamento" });
{
  const s = pres.addSlide({ masterName: "Divisor", sectionTitle: "Fechamento" });
  s.addText("PARA LEVAR", { x: MX, y: 0.58, w: CW, h: 0.3, fontSize: 12, bold: true, charSpacing: 2, color: DARKMUTED, margin: 0, isTextBox: true, objectName: "eyebrow-fechamento" });
  s.addText([{ text: "Liderar é servir", options: { breakLine: true } }, { text: "com método", options: { color: ACC.blue[2] } }], { x: MX, y: 1.2, w: CW, h: 2.2, fontSize: 56, bold: true, color: DARKTXT, margin: 0, valign: "top", isTextBox: true, objectName: "titulo-fechamento" });
  const items = [["Liderar", "blue", "Decida com dados, ouça antes de agir e ajuste a postura a cada pessoa."], ["Desenvolver", "green", "Transforme feedback em PDI e conhecimento individual em patrimônio da equipe."], ["Medir e executar", "orange", "Metas que viram número, objetivos compartilhados e lições registradas."]];
  const gap = 0.25, w = (CW - 2 * gap) / 3;
  items.forEach(([h, a, p], i) => {
    const x = MX + i * (w + gap), y = 3.9;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 2.3, rectRadius: 0.1, fill: { color: DARK2 }, line: { color: DARKLINE, width: 0.75 }, objectName: id("cartao-escuro") });
    dot(s, x + 0.35, y + 0.42, ACC[a][0]);
    s.addText(h, { x: x + 0.58, y: y + 0.32, w: w - 0.9, h: 0.32, fontSize: 13, bold: true, color: "C3C2B7", margin: 0, isTextBox: true, objectName: id("rotulo-escuro") });
    s.addText(p, { x: x + 0.35, y: y + 0.85, w: w - 0.7, h: 1.25, fontSize: 15, color: DARKTXT, margin: 0, valign: "top", isTextBox: true, objectName: id("texto-escuro") });
  });
  s.addText("Ewander Ferreira de Macedo · Vamos conversar?", { x: 4.5, y: 6.8, w: 7.4, h: 0.3, fontSize: 12, color: "898781", align: "right", margin: 0, isTextBox: true, objectName: "contato" });
  s.addNotes("Fechamento. Convite para conversar sobre como aplicar esses conceitos na equipe ou na carreira de cada participante.");
}
{
  const s = pres.addSlide({ masterName: "Conteudo", sectionTitle: "Fechamento" });
  s.addText("REFERÊNCIAS", { x: MX, y: 0.58, w: CW, h: 0.3, fontSize: 12, bold: true, charSpacing: 2, color: MUTED, margin: 0, isTextBox: true, objectName: "eyebrow-ref" });
  s.addText("Apostilas FGV e fontes citadas", { placeholder: "title" });
  s.addTable([
    [th("Apostila FGV"), th("Trechos usados"), th("Pílulas e slides")],
    ["Gestão de Desempenho", "p. 33–34, 44, 86–87", "#03 SMART, #05 360°, #07 feedback, PDI"],
    ["Gestão de Pessoas e Liderança", "p. 46–47; Unid. 3, 4, 8, 9", "#04, liderança situacional, #09, #10, #11, #12"],
    ["Cargos, Carreiras e Remuneração", "p. 6, 46–47", "#02 carreira horizontal"],
    ["Gestão de Projetos", "p. 22, 40", "#06 OKR, #08 PRINCE2"],
    ["Mentoria de carreira (17 aulas)", "PDI, CHAR, negociação", "#02, #09, #10"],
  ], { ...tableOpts([3.9, 3.3, 4.63]), y: 2.2, rowH: 0.55, objectName: "tabela-referencias" });
  s.addText("Autores citados nas apostilas: Drucker (1954), Barbosa (2012), Quinn et al. (2003), Pontes (2016), Chiavenato (2014), Gavioli (2015), Mercer (2020).", { x: MX, y: 5.75, w: CW, h: 0.6, fontSize: 13, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: "autores" });
  source(s, "Pílulas publicadas no LinkedIn entre 14 e 24/11/2026");
}

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log(OUT);
})();
