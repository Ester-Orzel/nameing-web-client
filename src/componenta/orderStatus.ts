// תרגום סטטוס הזמנה לתצוגה בלבד
const STATUS_LABELS: Record<string, string> = {
  RECEIVED: "התקבלה",
  IN_PROGRESS: "בטיפול",
  DELIVERED: "נמסרה",
  CANCELLED: "בוטלה",
};

export const statusLabel = (status: string) => STATUS_LABELS[status] ?? status;
