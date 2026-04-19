# Notice of Origin & Attribution

This project is a **personal fork and customization** of the open-source project [`algorithm-visualizer`](https://github.com/algorithm-visualizer/algorithm-visualizer), created by **Jinseo Jason Park** and the algorithm-visualizer community.

## License

The original project is distributed under the **MIT License** (see [`LICENSE`](./LICENSE)). This fork preserves the original license in full and **remains MIT-licensed**. Original copyright: **© 2019 Jinseo Jason Park and contributors**.

## What is original work and what is upstream

### Upstream (not mine)
- The React application shell, visualization engine (tracers, renderers), player controls, code editor integration, and Redux architecture come from [`algorithm-visualizer/algorithm-visualizer`](https://github.com/algorithm-visualizer/algorithm-visualizer).
- The algorithm implementations (Knapsack, BFS, DFS, KMP, Kruskal, Prim, LCS, LIS, Huffman, Quicksort, etc.) are fetched at runtime from the public API at `https://algorithm-visualizer.org` and belong to the [`algorithm-visualizer/algorithms`](https://github.com/algorithm-visualizer/algorithms) repository.
- The visualization tracer runtime (`algorithm-visualizer.org/api/tracers/*`) is hosted by and maintained by the original project.

### This fork (my work)
The following additions/customizations in this repository are my original contribution:

1. **Lightweight i18n layer** (`src/common/i18n.js`, `src/common/locale/he.js`) — a ~25-line translator module with a flat Hebrew dictionary covering ~40 UI strings across Header, Navigator, Player, CodeEditor, ToastContainer, TabContainer, App, and Button.
2. **RTL layout overhaul** — logical-property conversions (`margin-inline-start` etc.) across 6 component SCSS modules; `dir="ltr"` escape hatches on `CodeEditor` and `VisualizationViewer` for code and canvas; comprehensive `MarkdownRenderer.module.scss` rewrite with `unicode-bidi: plaintext/isolate` rules, proper code-block direction, RTL list bullets, and mixed-script headings.
3. **Warm brand identity** — SCSS palette (`colors.scss`) with cream/rose/peach/lavender tokens, new typography stack (`Rubik` + `Fira Code`), brand tokens module (`_brand.scss`), 4 text-based SVG logos (`favicon.svg`, `branding/{logo,logo-wide,icon}.svg`), rewritten `public/index.html` + `manifest.json`.
4. **Curated Hebrew curriculum** — `src/common/curriculum.js` defining 5 categories and ~25 algorithm entries aligned to a specific Algorithms-1 course syllabus, with Hebrew category/algorithm names.
5. **Notes system** — a custom interception in `src/apis/index.js` that serves bundled Hebrew markdown files from `src/files/notes/*.md` for topics not available upstream (Master Theorem, Median of Medians, Find-Peak, Jump DP, MIS on Trees, Edge Classification, Coin Change, Suffix Trie/Tree, Approximate Matching, Matrix Chain, Huffman, Activity Selection — 14 notes total, each with intuition + pseudocode + complexity + exam tips).
6. **Upstream-proxy deployment architecture** — `src/setupProxy.js` with Origin/Referer header spoofing for dev; `vercel.json` with rewrite rules to route `/api/*` to `https://algorithm-visualizer.org` for production, making this a zero-backend deployment that rides on the upstream public API.
7. **Feature-flag cleanup** — `src/common/env.js` with `DISABLE_GIST` flag, `/scratch-paper/*` route redirection in `src/index.js`, Header/Navigator gating of GitHub-dependent UI.
8. **Build & tooling compatibility shims** — `sass-loader` override to v10 for Dart Sass compatibility on Node 22, `cross-env NODE_OPTIONS=--openssl-legacy-provider` for CRA 3 on modern Node, `CI=false` for Vercel.
9. **All Hebrew content** — 14 markdown notes, home README, quickstart README, and all UI translations.

## Attribution inside the deployed app

The app's `Navigator` footer linking back to the upstream repository and wiki is intentionally hidden in this fork (via `DISABLE_GIST`) because the GitHub/Gist-based scratch-paper flow does not work without the upstream backend. Attribution to the original project lives in this `NOTICE.md`, in the preserved `LICENSE` file, and in the top of the `README.md`.

## Contact

For questions about the original project: [`algorithm-visualizer`](https://github.com/algorithm-visualizer/algorithm-visualizer).
For questions about this fork: see the `README.md` in this repository.
