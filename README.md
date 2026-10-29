# ameing — חנות מתנות במיתוג אישי

אתר לחנות מתנות שמותאמות אישית: הלקוחה בוחרת מוצר, מוסיפה שם או אות ומבצעת הזמנה. המנהלת מוסיפה מוצרים וצופה בכל ההזמנות.

- **האתר:** https://nameing-web-client.onrender.com
- **השרת (API):** https://ameing-gifts-api.onrender.com
- **קוד השרת:** https://github.com/Ester-Orzel/ameing-gifts-backend

## טכנולוגיות

React · TypeScript · Vite · React Router · React Hook Form · React Query · Context API · Axios · Tailwind CSS

## סוגי משתמשים

| משתמש | מה הוא יכול לעשות |
|---|---|
| אורחת | צפייה במוצרים, חיפוש, סינון ומיון, הוספה לסל |
| לקוחה (`CUSTOMER`) | כל הנ"ל, ובנוסף ביצוע הזמנה וצפייה בהזמנות שלה באזור האישי |
| מנהלת (`ADMIN`) | הוספת מוצרים וצפייה בכל ההזמנות של כל הלקוחות |

### כניסה כמנהלת

אין הרשמה של מנהלת דרך האתר. כל הרשמה יוצרת לקוחה רגילה. את המנהלת יוצר השרת כשהוא עולה:

- **באתר החי:** האימייל והסיסמה של המנהלת נקבעים במשתני הסביבה של השרת ב־Render (`SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`). מתחברים איתם בעמוד `/login`, ואז מופיע בתפריט הקישור **ניהול**.
- **בהרצה מקומית:** `admin@example.com` עם הסיסמה `Admin1234!`.

## עמודים

| נתיב | עמוד |
|---|---|
| `/` | עמוד הבית |
| `/products` | רשימת מוצרים עם חיפוש, סינון לפי קטגוריה ומיון |
| `/products/:id` | פרטי מוצר והתאמה אישית (צבע וטקסט) |
| `/cart` | סל הקניות |
| `/checkout` | פרטי משלוח ואישור הזמנה |
| `/login`, `/register` | התחברות והרשמה |
| `/my-account` | ההזמנות שלי |
| `/admin` | אזור ניהול: הוספת מוצר וכל ההזמנות |

## מבנה הפרויקט

```
src/
├── api.tsx            כל הקריאות לשרת והטיפוסים (Axios)
├── context/           UserContext: המשתמשת המחוברת והטוקן
├── pages/             עמודי האתר
├── componenta/        קומפוננטות משותפות (Header, ProductCard, AddProduct, AllOrders...)
├── assets/            לוגו ותמונות
└── index.css          ערכת הנושא של Tailwind
```

## איך המידע זורם

1. כל קריאה לשרת עוברת דרך פונקציה ב־`api.tsx`.
2. נתונים מהשרת נטענים עם **React Query** (`useQuery`). כשהנתונים משתנים, למשל אחרי הוספת מוצר, הרשימה מתרעננת עם `invalidateQueries`.
3. המשתמשת המחוברת והטוקן נשמרים ב־**UserContext**. הטוקן נשלח לשרת בכותרת `Authorization: Bearer`.
4. סל הקניות נשמר ב־`localStorage`.
5. הטפסים בנויים עם **React Hook Form**, כולל ולידציה והודעות שגיאה.

## הרצה מקומית

```bash
npm install
npm run dev
```

בפיתוח, בקשות ל־`/api` מועברות לשרת המקומי בכתובת `http://localhost:3000` (מוגדר ב־`vite.config.ts`).

בפרודקשן, כתובת השרת נקבעת במשתנה הסביבה:

```
VITE_API_URL=https://ameing-gifts-api.onrender.com
```

## העלאה ל־Render

אתר סטטי (Static Site). ההגדרות נמצאות בקובץ `render.yaml`:
- פקודת בנייה: `npm install && npm run build`
- תיקיית פרסום: `dist`
- כלל Rewrite מכל נתיב (`/*`) ל־`/index.html`, כדי שרענון עמוד פנימי יעבוד.
