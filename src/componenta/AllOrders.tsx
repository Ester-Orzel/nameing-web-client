
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api";
import { useUser } from "../context/UserContext";

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
    <div>
      <h2>כל ההזמנות</h2>

      {orders.length === 0 && <p>אין הזמנות כרגע</p>}

      {orders.map((order) => (
        <div key={order.id}>
          <p>מספר הזמנה: {order.id}</p>
          <p>שם לקוח: {order.contactName}</p>
          <p>מחיר: {order.totalPrice} ₪</p>
          <p>סטטוס: {order.status}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
