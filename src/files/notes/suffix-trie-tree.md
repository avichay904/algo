# עץ סיומות (Suffix Trie / Suffix Tree)

## 🌸 אינטואיציה

נתונה מחרוזת `T` באורך `n`. **עץ סיומות** הוא מבנה נתונים שמכיל את כל הסיומות של `T`, באופן שמאפשר חיפושים מהירים.

**Suffix Trie** — הגרסה הבסיסית: trie רגיל עבור קבוצת כל הסיומות של `T`. כל סיומת `T[i..n]` היא מסלול מהשורש לעלה. גודל: `O(n²)` במקרה הגרוע (כי יש `n` סיומות באורך ממוצע `n/2`).

**Suffix Tree** — דחיסת ה-Trie: כל מסלול של צמתים עם ילד יחיד מתאחד לקשת אחת עם תווית של מחרוזת. בעקבות הדחיסה מספר העלים הוא `n`, מספר הצמתים הפנימיים לכל היותר `n`, וגודל כולל `O(n)` (אם מייצגים תוויות כאינדקסים `[i..j]` במחרוזת המקורית).

**טריק סטנדרטי:** מוסיפים תו מיוחד `$` בסוף `T` שלא מופיע באף מקום אחר, כדי לוודא שאף סיומת לא קידומת של אחרת, וכל סיומת מסתיימת בעלה ייחודי.

## 📐 פסאודו-קוד (בניה נאיבית של Suffix Trie)

```pseudocode
build_suffix_trie(T):
    root = new Trie node
    n = |T|
    for i = 1 to n:
        insert(root, T[i..n])
    return root

insert(node, s):
    for c in s:
        if node has no child labeled c:
            create child labeled c
        node = node.child[c]
```

**חיפוש תבנית `P` ב-`T`:**

```pseudocode
search(root, P):
    node = root
    for c in P:
        if node has no child labeled c:
            return NOT FOUND
        node = node.child[c]
    return FOUND (any leaf in this subtree gives an occurrence of P in T)
```

## ⏱️ סיבוכיות

- **Suffix Trie:** בניה `O(n²)`, זיכרון `O(n²)`, חיפוש `P` ב-`O(|P|)`.
- **Suffix Tree:** בניה `O(n)` (Ukkonen — לא צריך לדעת את המימוש למבחן), זיכרון `O(n)`, חיפוש `P` ב-`O(|P|)`.

## 💡 טיפ למבחן

**היתרון הגדול:** אחרי preprocessing ב-`O(n)` (עם Suffix Tree), חיפוש תבנית `P` לוקח `O(|P|)` בלבד — **לא** תלוי באורך של `T`! זה מהיר מ-KMP/Rabin-Karp אם מחפשים הרבה תבניות שונות באותה מחרוזת.

**שימושים:**
- חיפוש תבנית מהיר.
- מציאת **תת-מחרוזת חוזרת ארוכה ביותר** — מוצאים את הצומת הפנימי הכי עמוק שיש לו ≥ 2 עלים בתת-העץ.
- דחיסת טקסט.
- בעיות על קבוצת מחרוזות (Generalized Suffix Tree).

**הבניה של Suffix Tree ב-`O(n)`** (Ukkonen, McCreight, Weiner) — מורכבת, לרוב **לא נדרש** לצאצא אותה במבחן. לרוב מסתפקים במבנה ובאופן השימוש.

**טעות קלאסית:** לשכוח את התו `$` בסוף. בלעדיו, סיומת שהיא קידומת של אחרת לא תיקבל עלה משלה, וחלק מהספירות ישתבשו.

## 🔗 ראי גם

- [KMP](/string-matching/kmp)
- [Rabin–Karp](/string-matching/rabin-karp)
- [התאמה מעגלית / DNA בקירוב](/notes/approximate-matching)
