// כל הטקסטים של עמוד הבית (דף הנחיתה).
// כדי לשנות טקסט בעמוד הבית — משנים רק כאן, בלי לגעת בקומפוננטה.

export interface InfoItem {
  title: string;
  text: string;
}

export interface DemoName {
  name: string;
  color: string; // צבע הבקבוק בהדגמה
}

export const hero = {
  eyebrow: "מתנות במיתוג אישי",
  title: "מתנה שנושאת את השם שלהם",
  text: "בוחרים מוצר, כותבים שם, אות או מילה אהובה — ואנחנו מדפיסים אותה על המתנה. ככה כל מתנה הופכת לאישית באמת.",
  shopButton: "לבחירת מתנה",
  phone: "053-4166140",
  phoneButton: "התקשרו: 053-4166140",
};

// השמות שמוקלדים על הבקבוק בהדגמה
export const demoNames: DemoName[] = [
  { name: "Miriam", color: "#e8b4a6" },
  { name: "Esty", color: "#b9cfe0" },
  { name: "Chani", color: "#e6c9a8" },
  { name: "Brachi", color: "#d7c3e3" },
  { name: "Dvory", color: "#f0b9c8" },
];

export const demoCaption = "ככה השם ייראה על המוצר";

export const explain = {
  title: "מה זה מיתוג אישי?",
  text: "מיתוג אישי הוא הדפסה של שם, אות או מילה על מוצר שימושי — בקבוק, מחזיק מפתחות, תיק איפור, מגבת ועוד. המוצר נשאר אותו מוצר, אבל ברגע שמופיע עליו השם, הוא הופך למתנה שאי אפשר לטעות למי היא שייכת.",
  imageAlt: "מבחר מוצרים במיתוג אישי של ameing",
};

export const stepsTitle = "איך זה עובד?";

export const steps: InfoItem[] = [
  { title: "בוחרים מוצר", text: "עוברים על הקטלוג ובוחרים את המתנה שמתאימה." },
  { title: "בוחרים צבע וגופן", text: "מחליטים איך ההדפסה תיראה על המוצר." },
  { title: "כותבים את השם", text: "שם מלא, אות אחת או מילה אהובה." },
  { title: "אנחנו מדפיסים ושולחים", text: "המתנה מגיעה מוכנה, ישר עד הבית." },
];

export const reasonsTitle = "למה ameing?";

export const reasons: InfoItem[] = [
  { title: "אישי באמת", text: "כל מוצר מודפס במיוחד עבור מי שמקבל אותו." },
  { title: "הדפסה איכותית", text: "הדפסה חדה ועמידה שנשארת יפה לאורך זמן." },
  { title: "הזמנה פשוטה", text: "כמה לחיצות מהטלפון או מהמחשב, וזהו." },
];

export const cta = {
  title: "מוכנים ליצור מתנה עם שם?",
  text: "מוצאים את המוצר המושלם והופכים אותו לשלהם.",
  button: "להתחיל לבחור",
};
