import type { CartItem } from "./api";

// כל הקריאה והשמירה של סל הקניות נמצאות כאן, במקום אחד.
// הסל נשמר ב־localStorage, כך שהוא נשאר גם אחרי רענון הדף.

const CART_KEY = "cart";

// אירוע שנשלח בכל שינוי בסל — ה־Header מאזין לו כדי לעדכן את מספר הפריטים
export const CART_CHANGE_EVENT = "cart-change";

export function getCart(): CartItem[] {
  const saved = localStorage.getItem(CART_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

export function addToCart(item: CartItem) {
  saveCart([...getCart(), item]);
}

// מפתח שמזהה פריטים זהים (אותו מוצר עם אותה התאמה אישית), כדי לאחד אותם לשורה אחת עם כמות
export function cartItemKey(item: CartItem): string {
  return [
    item.product.id,
    item.personalization ? item.customText : "",
    item.selectedColor?.id ?? "",
    item.selectedFont?.id ?? "",
  ].join("|");
}
