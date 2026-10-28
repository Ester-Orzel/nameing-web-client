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
      .catch(() => setError("לא הצלחנו לטעון את ההזמנות"));
  }, [token]);

  return (
    <div>
      <div className="page-head">
        <span className="eyebrow">האזור האישי</span>
        <h1>האזור האישי של {user?.fullName}</h1>
        <p>כאן אפשר לעקוב אחרי כל ההזמנות שלך</p>
      </div>

      {error ? (
        <p className="msg msg-error">{error}</p>
      ) : orders.length === 0 ? (
        <div className="card empty-state">
          <p>אין לך הזמנות עדיין</p>
        </div>
      ) : (
        <div className="orders">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-head">
                <h2>הזמנה מספר {order.id}</h2>
                <span className={`status status-${order.status}`}>
                  סטטוס: {statusLabel(order.status)}
                </span>
              </div>

              <div className="order-meta">
                <p>סכום: <strong>{order.totalPrice} ₪</strong></p>
                <p>מספר פריטים: <strong>{order.itemsCount}</strong></p>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <p className="name">{item.productName}</p>
                    <p>מחיר: {item.unitPrice} ₪</p>
                    {item.personalizationText && (
                      <p className="chip">טקסט: {item.personalizationText}</p>
                    )}
                    {item.color && <p className="chip">צבע: {item.color.name}</p>}
                    {item.font && <p className="chip">גופן: {item.font.name}</p>}
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
