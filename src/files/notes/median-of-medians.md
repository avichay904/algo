# חציון החציונים (Quickselect דטרמיניסטי)

## 🌸 אינטואיציה

Quickselect הרגיל בוחר pivot אקראי ומקווה שהוא "טוב". בממוצע זה נותן `O(n)`, אבל במקרה הגרוע זה יכול להיות `O(n²)`. האלגוריתם של Blum–Floyd–Pratt–Rivest–Tarjan ("חציון החציונים") **מבטיח** pivot טוב כל פעם — כזה שמבטיח לפחות 30% מהאברים משני צדדיו. זה נותן `Θ(n)` במקרה הגרוע.

הטריק: במקום לבחור pivot רנדומלי, מחלקים את הקלט לקבוצות קטנות של 5, ממיינים כל קבוצה (עלות קבועה), לוקחים את החציון של כל קבוצה, וממלאים select רקורסיבית כדי למצוא את **חציון החציונים** — וזה ה-pivot.

## 📐 פסאודו-קוד

```pseudocode
select(A, k):
    # returns the k-th smallest element of A
    if |A| <= 5:
        sort A and return A[k]

    # 1. split into groups of 5 and find median of each
    groups = partition A into floor(n/5) groups of 5
    medians = [median_of_5(g) for g in groups]

    # 2. recursively find the median of medians
    pivot = select(medians, |medians| / 2)

    # 3. partition around pivot
    L = { x in A | x < pivot }
    E = { x in A | x == pivot }
    G = { x in A | x > pivot }

    if k < |L|:               return select(L, k)
    if k < |L| + |E|:         return pivot
    return select(G, k - |L| - |E|)
```

## ⏱️ סיבוכיות

- **זמן:** `T(n) = T(n/5) + T(7n/10) + O(n) = Θ(n)` במקרה הגרוע.
- **זיכרון:** `O(log n)` לערימת הרקורסיה.

## 💡 טיפ למבחן

**למה דווקא קבוצות של 5?** זה מבטיח שלפחות `3n/10 < n/2` אברים נמצאים בכל צד של ה-pivot (כלומר שהפיצול הגרוע ביותר הוא `7n/10`). עם קבוצות של **3**, הניתוח נשבר: יחס הנסיגה הופך ל-`T(n) = T(n/3) + T(2n/3) + O(n) = Θ(n log n)` — לא לינארי! עם קבוצות של **5**, `T(n) = T(n/5) + T(7n/10) + O(n)`, והמקדמים `1/5 + 7/10 = 9/10 < 1` מאפשרים פתרון לינארי.

**ההוכחה שהשיקוף הוא `7n/10`:** חציון החציונים גדול מלפחות חצי מה-`n/5` חציונים (= `n/10` חציונים), וכל אחד מהם גדול מ-2 אברים אחרים בקבוצה שלו. לכן יש לפחות `3·n/10` אברים שקטנים מה-pivot, וסימטרית `3·n/10` שגדולים. כלומר הצד הגדול יותר הוא לכל היותר `n - 3n/10 = 7n/10`.

**איך מזהים במבחן:** אם שואלים על `select` או מציאת אלמנט ה-`k`-י במקרה גרוע לינארי (בלי הסתברותיות), זה המקום ל-Median of Medians. אם הבעיה מסתפקת במקרה ממוצע, Quickselect רגיל עם pivot אקראי מספיק.

## 🔗 ראי גם

- [משפט האב](/notes/master-theorem)
- [Quicksort / Quickselect](/sorting/quicksort)
