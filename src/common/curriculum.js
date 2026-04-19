// Static Hebrew curriculum tree for "מעיין לומדת אלגוריתמים".
// Keys MUST match what algorithm-visualizer.org actually serves for the
// algorithm fetch to succeed. Verified against the public API
// https://algorithm-visualizer.org/api/algorithms
//
// Topics not available upstream (matrix-chain-multiplication, huffman-coding,
// activity-selection, etc.) live under 'notes/' with bundled Hebrew markdown.

const TREE = {
  categories: [
    {
      key: 'dynamic-programming',
      name: 'תכנון דינמי',
      algorithms: [
        { key: 'knapsack-problem', name: 'בעיית התרמיל (Knapsack 0/1)' },
        { key: 'longest-common-subsequence', name: 'תת-סדרה משותפת ארוכה ביותר (LCS)' },
        { key: 'longest-increasing-subsequence', name: 'תת-סדרה עולה ארוכה ביותר (LIS)' },
        { key: 'longest-palindromic-subsequence', name: 'תת-סדרה פלינדרומית ארוכה ביותר' },
        { key: 'levenshteins-edit-distance', name: 'מרחק עריכה (Levenshtein)' },
        { key: 'fibonacci-sequence', name: 'סדרת פיבונאצ\'י' },
        { key: 'knuth-morris-pratts-string-search', name: 'KMP — התאמת מחרוזות' },
      ],
    },
    {
      key: 'divide-and-conquer',
      name: 'מיון וברירה (Divide & Conquer)',
      algorithms: [
        { key: 'quicksort', name: 'Quicksort / Quickselect' },
        { key: 'merge-sort', name: 'מיון מיזוג (Merge Sort)' },
      ],
    },
    {
      key: 'brute-force',
      name: 'חיפוש בגרפים + Rabin-Karp',
      algorithms: [
        { key: 'breadth-first-search', name: 'חיפוש לרוחב (BFS)' },
        { key: 'depth-first-search', name: 'חיפוש לעומק (DFS)' },
        { key: 'bipartiteness-test', name: 'בדיקת גרף דו-צדדי' },
        { key: 'rabin-karps-string-search', name: 'Rabin-Karp (התאמת מחרוזות)' },
      ],
    },
    {
      key: 'greedy',
      name: 'אלגוריתמים חמדניים + MST',
      algorithms: [
        { key: 'kruskals-minimum-spanning-tree', name: 'אלגוריתם קרוסקל (MST)' },
        { key: 'prims-minimum-spanning-tree', name: 'אלגוריתם פרים (MST)' },
        { key: 'dijkstras-shortest-path', name: 'אלגוריתם דייקסטרה' },
        { key: 'job-scheduling-problem', name: 'בעיית תזמון המשימות' },
      ],
    },
    {
      key: 'notes',
      name: 'נושאים תיאורטיים — הערות עברית 📚',
      algorithms: [
        { key: 'master-theorem', name: 'רקורסיה ומשפט האב' },
        { key: 'median-of-medians', name: 'חציון החציונים (Quickselect דטרמיניסטי)' },
        { key: 'find-peak-1d', name: 'מציאת שיא (Find-Peak)' },
        { key: 'jump-dp', name: 'בעיית הקפיצה (Jump DP)' },
        { key: 'rod-cutting-board-walk', name: 'חיתוך מוט / ספירת מסלולי לוח' },
        { key: 'mis-on-trees', name: 'קבוצה בלתי תלויה מרבית בעץ' },
        { key: 'bipartite-check', name: 'בדיקת גרף דו-צדדי — הסבר תיאורטי' },
        { key: 'edge-classification', name: 'סיווג קשתות ב-DFS (Tree/Back/Forward/Cross)' },
        { key: 'coin-change-greedy', name: 'החלפת מטבעות — חמדני' },
        { key: 'suffix-trie-tree', name: 'עץ סיומות (Suffix Trie / Tree)' },
        { key: 'approximate-matching', name: 'התאמה מעגלית / DNA בקירוב' },
        { key: 'matrix-chain-multiplication', name: 'כפל שרשרת מטריצות' },
        { key: 'huffman-coding', name: 'קידוד האפמן' },
        { key: 'activity-selection', name: 'בחירת פעילויות (חמדני)' },
      ],
    },
  ],
};

export function lookupName(categoryKey, algorithmKey) {
  const c = TREE.categories.find((c) => c.key === categoryKey);
  if (!c) return algorithmKey;
  const a = c.algorithms.find((a) => a.key === algorithmKey);
  return a ? a.name : algorithmKey;
}

export function lookupCategoryName(categoryKey) {
  const c = TREE.categories.find((c) => c.key === categoryKey);
  return c ? c.name : categoryKey;
}

export default TREE;
