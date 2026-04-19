# מעיין לומדת אלגוריתמים 🌸 / Maayan Learns Algorithms

> A Hebrew/RTL, warmly-rebranded fork of the open-source [`algorithm-visualizer`](https://github.com/algorithm-visualizer/algorithm-visualizer), built **in one night** as a personalized study tool for my fiancée **Maayan** — 4 days before her Algorithms 1 university final.
>
> **Live demo:** https://algorithm-visualizer-three-kappa.vercel.app

![React](https://img.shields.io/badge/React-16-61DAFB?logo=react&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-RTL%20%2B%20bidi-CC6699?logo=sass&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-Hebrew%20RTL-C48BA6)
![Deploy](https://img.shields.io/badge/deploy-Vercel-000000?logo=vercel)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📖 The Story

My fiancée Maayan had her final exam in **Algorithms 1** in 4 days. She had the course PDF summary (in Hebrew). She had my love. What she didn't have was an interactive way to *see* Quicksort, BFS, Knapsack DP, or KMP actually run.

Rather than write a visualization engine from scratch (overkill for 4 days), I **forked the excellent open-source [`algorithm-visualizer`](https://github.com/algorithm-visualizer/algorithm-visualizer)** — which is the best-engineered algorithm visualizer I could find — and spent one night transforming its English/LTR/dark UI into a **Hebrew/RTL, warm pink-cream-lavender study tool** tailored exactly to her course syllabus, with **14 original Hebrew-language theory notes** for the topics the upstream project doesn't cover.

> **This repository is explicitly a fork.** The original React app, visualization engine, and algorithm library belong to Jinseo Jason Park and the algorithm-visualizer community, licensed under MIT. See [`NOTICE.md`](./NOTICE.md) for a detailed breakdown of what is upstream work vs. what is mine.

---

## 🎯 What I built (the delta from upstream)

I'm not claiming authorship of the visualization engine. I am claiming authorship of the transformation:

| Layer | Upstream | This fork |
|---|---|---|
| **UI language** | English only, hardcoded strings | Lightweight i18n (`t(key)` + Hebrew dict, ~40 strings) |
| **Text direction** | LTR only | Full RTL with `unicode-bidi: plaintext/isolate` on mixed-script content, LTR escape hatches for the code editor and viz canvas |
| **Brand** | Dark neutral theme | Warm cream/dusty-rose/peach/lavender palette, Rubik + Fira Code typography, 4 text-based SVG logos |
| **Curriculum** | 200+ generic algorithms, upstream-sorted | Curated to a specific Algorithms 1 syllabus: 5 categories, ~25 upstream-backed entries, 14 original Hebrew theory notes for topics not in the upstream catalog |
| **Home page** | Generic project description | Personal Hebrew welcome page + how-to-use guide for Maayan |
| **Routing** | Includes broken GitHub/Gist flows after proxy | Redirects `/scratch-paper/*` to `/` + hides Sign-In/Save UI via `DISABLE_GIST` feature flag |
| **Deployment** | Requires upstream's Node+C++/Java backend servers | **Zero-backend deploy**: Vercel static hosting + rewrite rules that proxy `/api/*` to the upstream public API |

### Highlights I'm proud of

**🇮🇱 Real RTL, not just `direction: rtl`** — Bidirectional text mixing Hebrew and code/English is *hard*. I used logical CSS properties (`margin-inline-start`), `unicode-bidi: plaintext` on paragraphs so each text run reads in its native direction, `unicode-bidi: isolate` on inline `<code>` so `O(n log n)` doesn't flip into `(n log n)O`, and explicit `dir="ltr"` islands on the Ace code editor and visualization canvas so they render normally inside an RTL parent.

**📝 14 original Hebrew study notes** — For topics upstream doesn't cover (Median of Medians, Find-Peak, Jump DP, Rod Cutting, MIS on Trees, Edge Classification in DFS, Coin Change Greedy, Suffix Trie/Tree, Approximate/Cyclic Matching, Matrix Chain, Huffman, Activity Selection, and Master Theorem). Each follows a consistent template: intuition → pseudocode (LTR block) → complexity → exam tip → cross-references. Pseudocode verified against the course syllabus PDF.

**🔀 Upstream-proxy architecture** — The trick that makes the whole thing shippable in one night: I kept the upstream's algorithm content and tracer execution intact by pointing the CRA dev proxy (and `vercel.json` rewrite) to `https://algorithm-visualizer.org/api/*`. The deployed site is **100% static** (React bundle on a CDN). No backend to run. No algorithms to port. The user's browser transparently hits Vercel's edge, which transparently forwards API calls to the upstream servers. Zero cost, zero operations.

**🛠️ Tooling compatibility gymnastics** — CRA 3 + React 16 + Webpack 4 + sass-loader 7 is a cursed combination on Node 22. I debugged and fixed three separate breakages live: `node-sass` wouldn't build without Visual Studio → swapped to Dart `sass` + overrode `sass-loader` to v10; Webpack 4 needs the OpenSSL legacy provider on Node 17+ → wrapped npm scripts with `cross-env NODE_OPTIONS=--openssl-legacy-provider`; CRA's CI mode treats lint warnings as errors → set `CI=false` in `vercel.json`.

**🌐 Intentional scope cuts** — Hid the GitHub-auth and Gist flows behind a `DISABLE_GIST` feature flag + redirected their routes. They cannot work through the proxy (cookies don't cross origins) — better to hide than to present broken buttons.

---

## 🏗️ Architecture

```
┌─────────────────┐          ┌─────────────────┐          ┌──────────────────────────┐
│  Maayan's       │   HTTPS  │  Vercel Edge    │  /api/*  │  algorithm-visualizer.org│
│  browser        │ ───────► │  (this fork)    │ ───────► │  (upstream public API)   │
│  any device     │          │  React SPA      │          │  algorithms + tracers    │
└─────────────────┘          └─────────────────┘          └──────────────────────────┘
                                     │ /static, /
                                     ▼
                             Hebrew RTL UI
                             Warm cream theme
                             14 original MD notes
                             Curated curriculum
```

- **Everything user-facing** (UI, theme, i18n, notes, curriculum) is my work, lives in this repo, and is served statically from Vercel's edge.
- **Algorithm content + execution** comes from the upstream public API, proxied transparently via a Vercel rewrite rule — so there's no CORS problem in the browser, and the upstream server sees same-origin requests.

---

## 🧰 Tech stack

- **Frontend:** React 16 (CRA 3), Redux, react-router v5, react-markdown, Ace editor, SCSS modules
- **i18n:** Custom minimal `t(key)` helper — ~25 LOC, zero dependencies
- **RTL:** logical properties, `unicode-bidi`, explicit `dir` attributes at LTR boundaries
- **Build:** node-sass → Dart `sass` via `sass-loader@10` override, `cross-env` for Node 22 compat
- **Hosting:** Vercel (static) with `vercel.json` rewrite rules for `/api/*` proxy
- **Dev proxy:** `http-proxy-middleware` via `src/setupProxy.js` with `Origin`/`Referer` header spoofing

---

## 🚀 Run locally

```bash
git clone https://github.com/avichay904/algo.git
cd algo
npm install --legacy-peer-deps
npm start
```

Opens on `http://localhost:3000`.

## 🚢 Deploy to Vercel

```bash
vercel --prod
```

The `vercel.json` in the repo wires up the `/api/*` rewrite and build env (`CI=false`, `GENERATE_SOURCEMAP=false`).

---

## 📂 What to look at if you're reviewing this

Interesting files, in order of "shows what I did":

1. [`src/common/i18n.js`](./src/common/i18n.js) + [`src/common/locale/he.js`](./src/common/locale/he.js) — my minimal i18n
2. [`src/core/renderers/MarkdownRenderer/MarkdownRenderer.module.scss`](./src/core/renderers/MarkdownRenderer/MarkdownRenderer.module.scss) — real RTL for Markdown with bidi handling
3. [`src/common/curriculum.js`](./src/common/curriculum.js) — the curated course tree
4. [`src/apis/index.js`](./src/apis/index.js) — the `notes/` interception + upstream passthrough
5. [`src/files/notes/*.md`](./src/files/notes/) — the 14 Hebrew study notes
6. [`src/setupProxy.js`](./src/setupProxy.js) — dev proxy with Origin spoofing
7. [`vercel.json`](./vercel.json) — production rewrite + build env
8. [`src/common/stylesheet/colors.scss`](./src/common/stylesheet/colors.scss) — warm palette

---

## 📜 License

MIT — inherited from upstream. See [`LICENSE`](./LICENSE) and [`NOTICE.md`](./NOTICE.md) for attribution.

---

**Built with 💕 for Maayan — who aced the exam.**

_(Well, the plan is that she does.)_
