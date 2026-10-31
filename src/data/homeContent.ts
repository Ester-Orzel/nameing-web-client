// כל הטקסטים והתמונות של עמוד הבית.
// כדי לשנות טקסט בעמוד הבית — משנים רק כאן, בלי לגעת בקומפוננטה.

import catAccessories from "../assets/cat-accessories.webp";
import catHome from "../assets/cat-home.webp";
import catTech from "../assets/cat-tech.webp";
import catWallets from "../assets/cat-wallets.webp";
import catKeychains from "../assets/cat-keychains.webp";
import type { IconName } from "../componenta/Icon";

export interface InfoItem {
  title: string;
  text: string;
}

export interface Benefit extends InfoItem {
  icon: IconName;
}

export interface Category {
  label: string;
  category: string; // שם הקטגוריה בשרת — לפיו מסננים בעמוד המוצרים
  image: string;
}

export const hero = {
  title: "מתנה אישית",
  titleAccent: "רושם שנשאר.",
  text: "מגוון מתנות מעוצבות בהתאמה אישית לכל רגע מיוחד בחיים",
  button: "לגלות את הקולקציה →",
  imageAlt: "תיק איפור, מגבת, בקבוק וקופסת תכשיטים עם שמות מודפסים",
};

export const categoriesTitle = "קטגוריות";

export const categories: Category[] = [
  { label: "בקבוקים ותרמוסים", category: "בקבוקים ותרמוסים", image: catAccessories },
  { label: "מוצרי בית", category: "מוצרים לבית", image: catHome },
  { label: "מוצרי טכנולוגיה", category: "גאדג'טים", image: catTech },
  { label: "ארנקים ותיקים", category: "תיקים וארנקים", image: catWallets },
  { label: "אביזרים אישיים", category: "אביזרים אישיים", image: catKeychains },
];

export const benefits: Benefit[] = [
  { icon: "gift", title: "מתנה מושלמת", text: "לכל אירוע" },
  { icon: "pen", title: "הקדשה אישית", text: "שם, אות או טקסט לבחירה" },
  { icon: "diamond", title: "מוצרים מעוצבים", text: "באיכות גבוהה" },
  { icon: "truck", title: "משלוח מהיר", text: "עד הבית" },
];

// הדגמת ההתאמה האישית: בקבוק שעליו "מודפס" שם
export const personalize = {
  eyebrow: "נסו בעצמכם",
  title: "ככה השם ייראה על המוצר",
  text: "מיתוג אישי הוא הדפסה של שם, אות או מילה על מוצר שימושי. המוצר נשאר אותו מוצר — אבל ברגע שמופיע עליו השם, הוא הופך למתנה שאי אפשר לטעות למי היא שייכת.",
  inputLabel: "כתבו שם להדגמה",
  inputPlaceholder: "למשל: Miriam",
  maxLength: 8,
  bottleAlt: "תרמוס צבעוני עם שם מודפס",
  // השמות שמוקלדים על הבקבוק כשלא כתבו שם
  demoNames: ["Miriam", "Esty", "Chani", "Brachi", "Dvory"],
};

export const stepsTitle = "איך זה עובד?";

export const steps: InfoItem[] = [
  { title: "בוחרים מוצר", text: "מהקטלוג שלנו" },
  { title: "בוחרים צבע וגופן", text: "לפי הטעם שלכם" },
  { title: "כותבים את השם", text: "שם, אות או מילה" },
  { title: "אנחנו מדפיסים ושולחים", text: "המתנה מגיעה מוכנה" },
];

export const featured = {
  title: "מוצרים נבחרים",
  button: "הוספה לסל",
  added: "נוסף לסל ✓",
  loading: "טוען מוצרים...",
  error: "לא הצלחנו לטעון את המוצרים",
  count: 4,
};

// באנר המותג (מתוך תמונת ההשראה)
export const story = {
  imageAlt: "NAMING — מתנות במיתוג אישי, 053-4166140",
};

export const about = {
  titleStart: "למה", // אחריו מופיע שם המותג וסימן שאלה
  text: "כי כל מתנה מספרת סיפור. אנחנו מאמינים שמתנה עם שם או אות אישית הופכת לרגש, למזכרת ולחיוך שנשאר לאורך זמן. אצלנו תמצאו מגוון רחב של מוצרים מעוצבים, באיכות גבוהה ובסטייל ייחודי – בדיוק בשבילכם.",
  imageAlt: "קופסת מתנה עם סרט ורוד וסמל המותג",
};

export const aboutPoints: Benefit[] = [
  { icon: "gift", title: "מתאים לכל אירוע", text: "ימי הולדת, תודה, מתנות חג ועוד" },
  { icon: "diamond", title: "סטייל ואיכות", text: "מוצרים נבחרים" },
  { icon: "heart", title: "ייחודי ואישי", text: "מתנות שמרגשות" },
];
