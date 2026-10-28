// Order status labels, for display only
const STATUS_LABELS: Record<string, string> = {
  RECEIVED: "Received",
  IN_PROGRESS: "In progress",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const statusLabel = (status: string) => STATUS_LABELS[status] ?? status;
