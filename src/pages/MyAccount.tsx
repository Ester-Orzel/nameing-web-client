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
      <div className="page-head">
        <span className="eyebrow">My account</span>
        <h1>Hi, {user?.fullName}</h1>
        <p>Track all of your orders here</p>
      </div>

      {error ? (
        <p className="msg msg-error">{error}</p>
      ) : orders.length === 0 ? (
        <div className="card empty-state">
          <p>You don't have any orders yet</p>
        </div>
      ) : (
        <div className="orders">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-head">
                <h2>Order #{order.id}</h2>
                <span className={`status status-${order.status}`}>
                  Status: {statusLabel(order.status)}
                </span>
              </div>

              <div className="order-meta">
                <p>Total: <strong>₪{order.totalPrice}</strong></p>
                <p>Items: <strong>{order.itemsCount}</strong></p>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <p className="name">{item.productName}</p>
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
