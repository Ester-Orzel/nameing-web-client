
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api";
import { useUser } from "../context/UserContext";
import UpdateOrderStatus from "./UpdateOrderStatus";
import OrderDetails from "./OrderDetails";

const AllOrders = () => {
  const { token } = useUser();

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["allOrders", token],
    queryFn: () => getAllOrders(token!),
    enabled: !!token,
  });

  if (!token) {
    return <p>יש להתחבר כדי לצפות בהזמנות</p>;
  }

  if (isLoading) {
    return <p>טוען הזמנות...</p>;
  }

  if (isError) {
    return <p>שגיאה בטעינת ההזמנות</p>;
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-8 shadow-card max-sm:p-5">
      <h2 className="mb-5">כל ההזמנות</h2>

      {orders.length === 0 && <p>אין הזמנות כרגע</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-wrap gap-x-8 gap-y-1 border-b border-line py-3 text-[0.95rem] last:border-b-0"
        >
          <p className="font-bold text-ink">מספר הזמנה: {order.id}</p>
          <p>שם לקוח: {order.contactName}</p>
          <p>מחיר: {order.totalPrice} ₪</p>
          <p className="rounded-full bg-copper-tint px-3 text-sm font-semibold text-copper-dark">סטטוס: {order.status}</p>
          <div className="w-full">
            <UpdateOrderStatus order={order} />
          </div>
          <OrderDetails order={order} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
