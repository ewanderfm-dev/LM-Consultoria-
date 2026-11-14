# Plano Editorial — Pílulas de Conhecimento LM Consultoria

Postagem diária no LinkedIn, com uma arte de 1080x1350 e uma legenda. Entrega às 17h (horário de Brasília).

## Fontes de conteúdo
- `documentario_ewander.html`: posicionamento, voz e áreas de expertise do Ewander / LM Consultoria.
- Material da mentoria de carreira e da FGV: **ainda não está no repositório**. Quando for adicionado (por exemplo, em `fontes/`), ele passa a ser a fonte principal das pílulas.

## Voz
Consultor sênior falando com executivos e líderes: direto, reflexivo e prático. Frases curtas. Sem jargão vazio. Fecha sempre com uma pergunta para gerar conversa. 3 a 5 hashtags.

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
- `lead`: 1 a 2 frases
- `items`: exatamente 3 itens `{h, p}`, com `p` de até cerca de 90 caracteres
- `cta`: chamada curta

Para gerar a arte: `node posts/render.js posts/AAAA-MM-DD/post.json`

## Registro de postagens (não repetir temas)
| # | Data | Pilar | Tema |
|---|------|-------|------|
| 01 | 2026-11-14 | Liderança e decisão | A complexidade não é o problema, ela é o trabalho: 3 movimentos para decidir sob pressão |
