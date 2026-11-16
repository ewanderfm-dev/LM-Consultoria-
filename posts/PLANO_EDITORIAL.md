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
| # | Data | Pilar | Tema |
|---|------|-------|------|
| 01 | 2026-11-14 | Liderança e decisão | A complexidade não é o problema, ela é o trabalho: 3 movimentos para decidir sob pressão |
| 02 | 2026-11-14 | Carreira (mentoria + FGV cc/gd) | Carreira não é escada, é plano: carreira horizontal, competências humanas e PDI |
| 03 | 2026-11-15 | Estratégia e gestão (FGV gd p33–34) | Meta que não vira número vira opinião: método SMART e metas construídas em conjunto |
| 04 | 2026-11-16 | Pessoas e liderança (FGV pl p46–47, gd p33) | Maior é o que serve: ouvir, discernir e servir (liderança de apoio + situacional) |

Próximas sugestões do banco: avaliação 360° (gd p44), OKR (pj p40), feedback baseado em fatos (gd p86), Janela de Johari, campo de forças de Lewin, Canvas, PRINCE2 (pj p22).
