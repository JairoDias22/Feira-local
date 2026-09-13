# 🌱 FeiraLocal — Nota 2 (versão React)

Versão interativa da FeiraLocal, evoluída a partir da interface estática da
Nota 1 (HTML5 + CSS3 + Bootstrap) para uma aplicação React com
componentização, gerenciamento de estado, roteamento (SPA) e consumo de
dados via Fetch API.

Projeto acadêmico da disciplina **Desenvolvimento Web** (UEMA/Uemanet),
ligado ao **ODS 2 — Fome Zero e Agricultura Sustentável**.

## ✨ O que mudou em relação à Nota 1

- Reorganização de toda a interface em **componentes React** (`Header`,
  `Hero`, `Produtos`, `Produtores`, `Estacao`, `Sustentabilidade`, `Impacto`, `Footer`)
- **Roteamento client-side** com `react-router-dom` (rota `/` e `/favoritos`)
- **Gerenciamento de estado** com Context API (`FavoritesContext`) + `localStorage`
- **Busca e filtro por categoria** nos produtos (interatividade via estado)
- **Sistema de favoritos**: clique no ♡ de um produto para salvá-lo; a lista
  fica disponível na página `/favoritos` e persiste entre sessões
- **Seletor de mês** na seção "Alimentos da estação", trocando o conteúdo
  exibido dinamicamente
- **Consumo de API pública real** (Open-Meteo, sem necessidade de chave) via
  `fetch`, mostrando o clima atual de Bacabal – MA, com tratamento de
  estados de carregamento e erro
- **Consumo de dados internos via Fetch + JSON**: produtos e produtores são
  carregados de `public/data/produtos.json` e `public/data/produtores.json`
  com `fetch()`, simulando o consumo de uma API
- **Contadores animados** no painel de impacto (manipulação de DOM via
  `requestAnimationFrame`)

## 🛠️ Tecnologias

- React 18 + Vite
- React Router DOM (SPA)
- Context API (estado global)
- Fetch API + JSON
- CSS3 (Grid, Flexbox, media queries)

## 📁 Estrutura

```
feiralocal-react/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── data/
│       ├── produtos.json
│       └── produtores.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── FavoritesContext.jsx
    ├── components/
    │   ├── Header.jsx
    │   ├── Hero.jsx
    │   ├── Sobre.jsx
    │   ├── Clima.jsx
    │   ├── Produtos.jsx
    │   ├── ProductCard.jsx
    │   ├── Produtores.jsx
    │   ├── Estacao.jsx
    │   ├── Sustentabilidade.jsx
    │   ├── Impacto.jsx
    │   └── Footer.jsx
    └── pages/
        ├── Home.jsx
        └── Favoritos.jsx
```

## ▶️ Como rodar localmente

É necessário ter o [Node.js](https://nodejs.org) instalado (versão 18 ou
superior).

```bash
git clone https://github.com/seu-usuario/feiralocal.git
cd feiralocal
npm install
npm run dev
```

O terminal vai mostrar um endereço local (algo como
`http://localhost:5173`) — abra no navegador.

Para gerar a versão de produção (usada na publicação):

```bash
npm run build
```

Isso cria uma pasta `dist/` com os arquivos finais, prontos para hospedagem.

## 🌐 Publicação

O passo a passo completo de publicação está no relatório em slides desta
atividade. Resumo rápido usando a Vercel:

1. Suba este projeto para um repositório no GitHub
2. Crie uma conta na [Vercel](https://vercel.com) com o GitHub
3. Clique em "Add New Project", selecione o repositório
4. A Vercel detecta automaticamente que é um projeto Vite — clique em "Deploy"
5. Em cerca de 1 minuto, a Vercel gera um link público da aplicação

## 👥 Equipe

- [Nome do(a) integrante 1]
- [Nome do(a) integrante 2]
- [Nome do(a) integrante 3 — se houver]

## 🎯 ODS relacionado

**ODS 2 — Fome Zero e Agricultura Sustentável**

---

Projeto desenvolvido para fins acadêmicos — Universidade Estadual do
Maranhão (UEMA/Uemanet).
