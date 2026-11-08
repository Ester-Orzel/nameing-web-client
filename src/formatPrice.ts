// מציג מחיר בצורה נקייה: מעגל לאגורות (נגד טעויות חישוב כמו 59.99999) ומסתיר ".00" במחיר עגול
export function formatPrice(value: number | string): string {
  const rounded = Math.round(Number(value) * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}
