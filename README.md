# 1Bitpi — Site Oficial

> **Este é o site definitivo da 1Bitpi.**

Landing page institucional da 1Bitpi — empresa de construção de Sites, Webapps e Apps Mobile para restaurantes, pousadas e comércios do Litoral Norte de SP.

## Stack

Site estático puro. Sem build, sem bundler, sem servidor especial.

- HTML5 + CSS (Tailwind CDN)
- React 18 via CDN
- Framer Motion via CDN
- Babel Standalone (transpila JSX no browser)

## Estrutura

```
SMK RssN.html       ← entrada do site (abrir esse arquivo)
src/
  app.jsx           ← composição das seções
  background.jsx    ← background interativo
  nav.jsx           ← navegação com glassmorphism
  hero.jsx          ← seção principal
  showcase.jsx      ← tabs SITE / WEBAPP / APP
  how-it-works.jsx  ← como funciona (4 fases)
  services.jsx      ← a oferta / preço
  client-filter.jsx ← para quem é
  form-modal.jsx    ← formulário de orçamento (Formspree)
  footer.jsx        ← rodapé com WhatsApp e email
```

## Como rodar localmente

```bash
cd "Site Empresa"
python3 -m http.server 8080
```

Abra: `http://localhost:8080/SMK%20RssN.html`

## Como fazer deploy

Este site pode ser hospedado em qualquer lugar que sirva arquivos estáticos:

- **GitHub Pages** — gratuito, recomendado
- **Netlify Drop** — arraste a pasta, sobe em segundos
- **Qualquer hospedagem compartilhada** — FTP dos arquivos

Para GitHub Pages: faça push deste repositório e ative Pages em Settings → Pages → Source: main branch.

## Contato e CTA

- Formulário: Formspree (`https://formspree.io/f/xzdojlez`) → entrega em `smkrssn@gmail.com`
- WhatsApp: `(11) 97229-4623`
- Email: `caue.antonacci@1bitpi.com.br`

## Fundador

**Cauê Antonacci** — Engenheiro de Software  
Cada projeto é liderado por mim. Você fala com quem constrói.
