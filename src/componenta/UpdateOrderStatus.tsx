
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../api";
import type { Order } from "../api";
import { useUser } from "../context/UserContext";

interface Props {
  order: Order;
}

const UpdateOrderStatus = ({ order }: Props) => {
  const { token } = useUser();
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const isFinal =
    order.status === "DELIVERED" ||
    order.status === "CANCELLED";

  const nextStatus =
    order.status === "RECEIVED"
      ? "IN_PROGRESS"
      : "DELIVERED";

  const changeStatus = async (status: string) => {
    if (!token || isUpdating) return;

    try {
      setIsUpdating(true);

      await updateOrderStatus(order.id, status, token);

      await queryClient.invalidateQueries({
        queryKey: ["allOrders"],
      });

      alert("הסטטוס עודכן בהצלחה");
    } catch {
      alert("שגיאה בעדכון הסטטוס");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isFinal) {
    return <p className="chip">ההזמנה הסתיימה</p>;
  }

  return (
    <div className="status-actions">
      {(order.status === "RECEIVED" ||
        order.status === "IN_PROGRESS") && (
        <button
          disabled={isUpdating}
          onClick={() => changeStatus(nextStatus)}
        >
          {order.status === "RECEIVED"
            ? "העבר לטיפול"
            : "סמן כנמסרה"}
        </button>
      )}

      <button
        className="btn-outline"
        disabled={isUpdating}
        onClick={() => {
          if (window.confirm("האם לבטל את ההזמנה?")) {
            changeStatus("CANCELLED");
          }
        }}
      >
        בטל הזמנה
      </button>
    </div>
  );
};

export default UpdateOrderStatus;
