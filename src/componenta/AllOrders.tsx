
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
    return <p className="msg-muted">Loading orders...</p>;
  }

  if (isError) {
    return <p className="msg-error">Error loading orders</p>;
  }

  return (
    <div>
      <h2>All orders</h2>

      {orders.length === 0 && <p className="msg-muted">No orders yet</p>}

      {orders.length > 0 && (
        <div className="overflow-x-auto rounded-[10px] border border-line">
          <table className="w-full border-collapse bg-white text-[0.95rem] [&_td]:px-4 [&_td]:py-3 [&_td]:whitespace-nowrap [&_th]:bg-soft [&_th]:px-4 [&_th]:py-3 [&_th]:text-start [&_th]:text-sm [&_th]:font-bold [&_th]:text-muted [&_tbody_tr:hover]:bg-[#fdf9f8] [&_tr]:border-b [&_tr]:border-line [&_tbody_tr:last-child]:border-b-0">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.contactName}</td>
                  <td>₪{order.totalPrice}</td>
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
