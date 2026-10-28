
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api";
import { useUser } from "../context/UserContext";
import { statusLabel } from "./orderStatus";

const AllOrders = () => {
  const { token } = useUser();
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["allOrders", token],
    queryFn: () => getAllOrders(token!),
    enabled: !!token,
  });

  if (isLoading) {
    return <p className="msg-muted">טוען הזמנות...</p>;
  }

  if (isError) {
    return <p className="msg msg-error">שגיאה בטעינת ההזמנות</p>;
  }

  return (
    <div>
      <h2>כל ההזמנות</h2>

      {orders.length === 0 && <p className="msg-muted">אין הזמנות כרגע</p>}

      {orders.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>מספר הזמנה</th>
                <th>שם לקוח</th>
                <th>מחיר</th>
                <th>סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.contactName}</td>
                  <td>{order.totalPrice} ₪</td>
                  <td>
                    <span className={`status status-${order.status}`}>
                      {statusLabel(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
