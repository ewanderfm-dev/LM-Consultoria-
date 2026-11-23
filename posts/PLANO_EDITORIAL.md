# Plano Editorial — Pílulas de Conhecimento LM Consultoria

Postagem diária no LinkedIn, com uma arte de 1080x1350 e uma legenda. Entrega às 17h (horário de Brasília).

## Fontes de conteúdo
- `documentario_ewander.html`: posicionamento, voz e áreas de expertise do Ewander / LM Consultoria.
- **`posts/CONTEXTO_MENTORIA_FGV.md` (FONTE OBRIGATÓRIA EM TODOS OS DIAS):** as 17 aulas da mentoria de carreira, as ferramentas e o banco de conceitos das 13 apostilas FGV, com páginas. Cada pílula deve partir de um conceito desse banco, aplicado à prática do líder ou profissional, e citar a apostila FGV como fonte na arte e na legenda.

## Voz
Consultor sênior falando com executivos e líderes: direto, reflexivo e prático. Frases curtas. Sem jargão vazio. Fecha sempre com uma pergunta para gerar conversa. 3 a 5 hashtags.

**Preferência do Ewander (feedback da #04):** o título da arte deve ser uma frase-chave curta, afirmativa e inspiradora (ex.: "Maior é o que serve"), e não uma construção do tipo "não existe X certo". A liderança é tratada como serviço: ouvir, discernir e servir a equipe. Os conceitos da FGV entram como base, não como protagonista.

## Pilares (rodízio pela ordem, um por dia)
1. Liderança e decisão sob pressão
2. Carreira e desenvolvimento executivo (mentoria de carreira)
3. Estratégia e gestão (conteúdo FGV: estratégia, finanças, governança)
4. Finanças e regulação (análise financeira, cenários, reforma tributária)
5. Pessoas e cultura (equipes, comunicação, propósito, coaching)
6. Estrutura e processos (redesenho organizacional, escala, modelo de negócio)
7. Facilitação e comunicação (storytelling com dados, design thinking, ágil)

## Identidade visual: cada dia diferente
Tom sóbrio e corporativo, mas a arte nunca repete o visual do dia anterior. O post.json define:
- `layout`:
  - `classic`: faixa de cards com borda
  - `editorial`: claro, estilo revista, com fios finos
  - `photo`: imagem no topo e painel embaixo
  - `quote`: frase central com aspas e 3 colunas
  - `band`: faixa lateral com `keyword` vertical
  - `cards`: grade de cartões numerados
- `theme`:
  - `navy`: azul-marinho e dourado
  - `ivory`: marfim e verde-floresta
  - `burgundy`: vinho e creme
  - `graphite`: grafite e cobre
  - `teal`: petróleo e areia
  - `cobalt`: branco e azul-cobalto
  - `slate`: cinza e bordô
  - `plum`: ameixa e champanhe
- `photo` (opcional): arquivo de imagem na pasta do post, por exemplo `foto.jpg`. Usado nos layouts `photo` e `band`. Sem foto, o layout `photo` gera uma arte geométrica nas cores do tema.
- `keyword` (layout `band`): uma palavra-chave em maiúsculas, por exemplo SERVIR.

**Regras de rodízio:**
- Não repetir o `layout` nem o `theme` usados nos 3 posts anteriores (consulte as colunas do registro).
- Alternar fundos claros (`ivory`, `cobalt`, `slate`) com fundos escuros.
- Fotos: pessoas em ambiente de trabalho, arquitetura corporativa, mãos e reuniões, sempre com tom sóbrio. Buscar em bancos com licença de uso livre (Unsplash, Pexels) e registrar o crédito do fotógrafo na legenda.

## Formato da arte (`post.json`)
- `tag`: nome do pilar, por exemplo "Pílula de Carreira"
- `num`: número sequencial (#01, #02…)
- `title`: frase de impacto. Use `<em>` no trecho que deve ficar em dourado.
- `titleSize` (opcional): tamanho do título em px, para frases curtas de destaque (padrão 68; a #04 usa 120)
- `lead`: 1 a 2 frases
- `items`: exatamente 3 itens `{h, p}`, com `p` de até cerca de 90 caracteres
- `cta`: chamada curta

Para gerar a arte: `node posts/render.js posts/AAAA-MM-DD/post.json`

## Registro de postagens (não repetir temas)
| # | Data | Pilar | Tema | Layout/tema |
|---|------|-------|------|------|
| 01 | 2026-11-14 | Liderança e decisão | A complexidade não é o problema, ela é o trabalho: 3 movimentos para decidir sob pressão | classic/navy |
| 02 | 2026-11-14 | Carreira (mentoria + FGV cc/gd) | Carreira não é escada, é plano: carreira horizontal, competências humanas e PDI | classic/navy |
| 03 | 2026-11-15 | Estratégia e gestão (FGV gd p33–34) | Meta que não vira número vira opinião: método SMART e metas construídas em conjunto | classic/navy |
| 04 | 2026-11-16 | Pessoas e liderança (FGV pl p46–47, gd p33) | Maior é o que serve: ouvir, discernir e servir (liderança de apoio + situacional) | classic/navy |
| 05 | 2026-11-17 | Desenvolvimento (FGV gd p44) | Crescer é ter coragem de ser visto por inteiro: avaliação 360° | editorial/ivory |
| 06 | 2026-11-18 | Estratégia (FGV pj p40) | Propósito claro, resultado que se mede: OKR | band/teal |
| 07 | 2026-11-19 | Liderança (FGV gd p86) | Feedback é um presente entregue com cuidado: hora marcada, fatos e plano conjunto | cards/cobalt |
| 08 | 2026-11-20 | Gestão (FGV pj p22) | Toda experiência é matéria-prima: princípios PRINCE2 (aprender, justificar, gerenciar por exceção) | quote/graphite |
| 09 | 2026-11-21 | Pessoas (FGV pl Unid. 3 + mentoria) | Conflito bem conduzido fortalece a equipe: clima, fatos e interesses | photo/slate |
| 10 | 2026-11-22 | Carreira (FGV pl Unid. 9) | Competência é saber, fazer e querer: CHA | editorial/burgundy |
| 11 | 2026-11-23 | Desenvolvimento (FGV pl Unid. 8) | Conhecimento compartilhado se multiplica: treinamento, educação continuada, gestão do conhecimento | band/ivory |

Próximas sugestões do banco: Janela de Johari, campo de forças de Lewin, Canvas.
