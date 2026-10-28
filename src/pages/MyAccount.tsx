import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { getMyOrders, type Order } from "../api";
import { statusLabel } from "../componenta/orderStatus";

const MyAccount = () => {
  const { token, user } = useUser();

  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    getMyOrders(token)
      .then((res) => setOrders(res.data))
      .catch(() => setError("We couldn't load your orders"));
  }, [token]);

  return (
    <div>
      <div className="mb-6 [&_h1]:mb-1 [&_p]:text-muted">
        <span className="eyebrow">My account</span>
        <h1>Hi, {user?.fullName}</h1>
        <p>Track all of your orders here</p>
      </div>

      {error ? (
        <p className="msg-error">{error}</p>
      ) : orders.length === 0 ? (
        <div className="card px-4 py-12 text-center [&_p]:mb-5 [&_p]:text-lg [&_p]:text-muted">
          <p>You don't have any orders yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map((order) => (
            <div key={order.id} className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-soft px-5 py-4 [&_h2]:m-0 [&_h2]:text-lg">
                <h2>Order #{order.id}</h2>
                <span className={`status status-${order.status}`}>
                  Status: {statusLabel(order.status)}
                </span>
              </div>

              <div className="flex flex-wrap gap-6 px-5 py-3.5 text-[0.95rem] text-muted [&_strong]:text-ink">
                <p>Total: <strong>₪{order.totalPrice}</strong></p>
                <p>Items: <strong>{order.itemsCount}</strong></p>
              </div>

              <div className="flex flex-col border-t border-line">
                {order.items.map((item) => (
                  <div key={item.id} className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-line px-5 py-3 text-[0.95rem] last:border-b-0">
                    <p className="flex-[1_1_160px] font-bold text-ink">{item.productName}</p>
                    <p>Price: ₪{item.unitPrice}</p>
                    {item.personalizationText && (
                      <p className="chip">Text: {item.personalizationText}</p>
                    )}
                    {item.color && <p className="chip">Color: {item.color.name}</p>}
                    {item.font && <p className="chip">Font: {item.font.name}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAccount;
