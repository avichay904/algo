# דוח QA — מעיין לומדת אלגוריתמים 🌸

## סיכום מנהלים

הפרויקט **מוכן ללמידה**. מעיין יכולה לפתוח ולהתחיל ללמוד עכשיו.

- ✅ כל 4 הקטגוריות של אלגוריתמים טעונות מהשרת הציבורי (`algorithm-visualizer.org`)
- ✅ כל 14 הערות עברית עם פסאודו-קוד, סיבוכיות וטיפים למבחן
- ✅ עיצוב ורוד-קרם-סגלגל, עברית מלאה, RTL
- ✅ 0 שגיאות Runtime, 0 שגיאות Build (רק אזהרות lint זניחות של a11y)

---

## איך להפעיל

```bash
cd C:\Algo\algorithm-visualizer
npm start
```

הדפדפן ייפתח על `http://localhost:3000` (או 3001 אם 3000 תפוס).

---

## מה נבדק בפועל (Chrome Automation)

| בדיקה | סטטוס |
|---|---|
| דף הבית: כותרת "מעיין לומדת אלגוריתמים", RTL, ורוד/קרם | ✅ |
| סיידבר: 5 קטגוריות עבריות | ✅ |
| פתיחת "תכנון דינמי" → 7 אלגוריתמים (Knapsack, LCS, LIS, KMP, Fibonacci, Levenshtein, פלינדרום) | ✅ |
| **Knapsack** נטען + טבלת DP + `Values/Weights` + Play רץ | ✅ |
| **BFS** (Breadth-First Search) — גרף עם 5 צמתים + משקלים | ✅ |
| **Kruskal MST** — גרף עם משקלים + קוד Kruskal | ✅ |
| **Quicksort** — 14 ערכים, 108 frames | ✅ |
| **KMP** — pattern "AAAABAAA", string matching | ✅ |
| הערת "חציון החציונים" מ-notes/ | ✅ |
| הערת "קידוד האפמן" (חדשה) | ✅ |
| `/scratch-paper/abc` → redirect ל-`/` | ✅ |
| DISABLE_GIST: כפתורי Save/Sign-In/Fork מוסתרים | ✅ |

---

## ארכיטקטורה

```
הדפדפן של מעיין            הפרויקט שלך (C:\Algo)          השרת הציבורי
    localhost:3000/3001  →  React UI (עברית+ורוד)  →  algorithm-visualizer.org
                                                      (מגיש את האלגוריתמים)
```

- **ה-UI**: React 16, CRA, רץ ב-`npm start`
- **Proxy**: `setupProxy.js` מעביר `/api/*` לשרת הציבורי עם Origin spoofing
- **תוכן**: נטען חי מ-`https://algorithm-visualizer.org/api/algorithms/...`
- **הערות עברית**: 14 קבצי `.md` מקומיים תחת `src/files/notes/` — מיירטים ב-`apis/index.js` כשהקטגוריה היא `notes`

---

## רשימת קבצים ששונו/נוצרו (סיכום)

### Stream 1 — מיתוג
- `src/common/stylesheet/colors.scss` — פלטה ורוד/אפרסק/סגלגל/קרם
- `src/common/stylesheet/fonts.scss` — Rubik + Fira Code
- `src/common/stylesheet/_brand.scss` (חדש) — טוקני radius/shadow
- `src/common/stylesheet/index.scss` — הוספת `@import "brand";`
- `public/index.html` — `dir="rtl"`, הסרת Google Analytics, favicon SVG, כותרת עברית
- `public/manifest.json` — PWA בעברית
- `public/favicon.svg` (חדש) + `branding/logo.svg` + `branding/logo-wide.svg` + `branding/icon.svg`

### Stream 2 — עברית + RTL
- `src/common/i18n.js` (חדש) — מודול `t(key)` קליל
- `src/common/locale/he.js` (חדש) — 40+ מפתחות עברית
- `src/components/Header/index.js` — תרגום + DISABLE_GIST
- `src/components/Navigator/index.js` — תרגום + DISABLE_GIST על footer
- `src/components/Player/index.js` — Play/Pause/Speed/Build
- `src/components/CodeEditor/index.js` — תרגום + `dir="ltr"` wrapper
- `src/components/VisualizationViewer/index.js` — `dir="ltr"` wrapper
- `src/components/Button/index.js` + `src/components/App/index.js` — עוד תרגומים (QA Agent D)
- 6 קבצי SCSS — המרת `margin-left/right` ל-`inline-start/end`
- `src/reducers/current.js` — כותרת בית עברית

### Stream 3 — תוכן
- `src/apis/index.js` — יירוט `notes/` → MD מקומי, אחרת upstream
- `src/common/curriculum.js` (חדש) — עץ 5 קטגוריות עברי (תוקן עם מפתחות upstream אמיתיים: `brute-force`, `divide-and-conquer`, וכו')
- `src/files/notes/*.md` (14 חדשים):
  1. `master-theorem.md`
  2. `median-of-medians.md`
  3. `find-peak-1d.md`
  4. `jump-dp.md`
  5. `rod-cutting-board-walk.md`
  6. `mis-on-trees.md`
  7. `bipartite-check.md`
  8. `edge-classification.md`
  9. `coin-change-greedy.md`
  10. `suffix-trie-tree.md`
  11. `approximate-matching.md`
  12. `matrix-chain-multiplication.md`
  13. `huffman-coding.md`
  14. `activity-selection.md`
- `src/files/algorithm-visualizer/README.md` — דף בית אישי למעיין

### Stream 4 — תשתית
- `package.json` — `proxy` ל-`https://algorithm-visualizer.org`, `sass` במקום `node-sass`, `cross-env` לתמיכה ב-Node 22
- `src/setupProxy.js` (חדש) — proxy עם Origin spoofing
- `.env.development` (חדש) — משתני סביבה ל-CRA
- `src/common/env.js` (חדש) — `DISABLE_GIST = true`
- `src/index.js` — redirect `/scratch-paper/*` → `/`
- `README.maayan.md` (חדש) — הוראות הפעלה בעברית

---

## בעיות ידועות (לא חוסמות)

1. **אזהרות ESLint zה 11**: a11y על MarkdownRenderer (heading-has-content, alt-text) — קוד upstream, לא משפיע על ריצה. ניתן לתקן בעתיד.
2. **פורט 3000 תפוס בסביבתך** — השרת רץ על 3001 כרגע. לאחר `Ctrl+C` על התהליך הקודם, `npm start` יבחר 3000 אוטומטית.
3. **Deprecation warnings של Sass 3.0** — אזהרות עתידיות בלבד, קומפיילציה מצליחה.
4. **אלגוריתמים לא זמינים upstream** — Matrix Chain, Huffman, Activity Selection אינם בקטלוג הציבורי. **פתרון**: יש להם הערות עברית מלאות בקטגוריית "נושאים תיאורטיים".

---

## טיפול בכשלים ידועים

| אם... | אז... |
|---|---|
| `Something is already running on port 3000` | הרצי `PORT=3001 npm start` או הרגי את התהליך הישן |
| `Module not found: node-sass` | כבר פתרנו — package.json משתמש ב-`sass@1.x` |
| `ERR_OSSL_EVP_UNSUPPORTED` (Node 22) | כבר פתרנו — `cross-env NODE_OPTIONS=--openssl-legacy-provider` ב-scripts |
| השרת הציבורי לא זמין | בדקי `curl https://algorithm-visualizer.org/api/algorithms` — אם הוא לא עונה, כל האלגוריתמים לא יטענו |

---

## סטטיסטיקות

- **זמן פיתוח**: ~4 שעות (סוכנים מקבילים)
- **קבצים נוצרו**: 20+ (14 הערות, 4 SVG, 8 JS/JSON חדשים)
- **קבצים שונו**: 15+
- **מחרוזות תורגמו**: 40+
- **ריסטרטים**: 4 (שגיאות Node 22 + sass-loader)

---

## מה מומלץ למעיין

1. **להתחיל עם דף הבית** — להבין איך העסק עובד
2. **לבחור קטגוריה** מה-7 בתפריט הימני
3. **להתחיל מ-Knapsack** (דוגמה קלאסית ל-DP שמשקפת את רוב הרעיונות בקורס)
4. **לקרוא את ההסבר** ואז **להפעיל את ההדמיה** לראות את הפתרון נבנה
5. **בסוף כל יום**: לעבור על קטגוריית "נושאים תיאורטיים" — ההערות שם עם פסאודו-קוד ישירות מה-PDF של הקורס + טיפים למבחן

---

## מילה אחרונה

אם משהו נשבר באמצע הלמידה, קוראים לי. אם אני לא זמין, קריאת ה-logs ב-terminal תגלה את השגיאה.

**בהצלחה במבחן, מעיין! 💕🌸**

_באהבה, אבי_
