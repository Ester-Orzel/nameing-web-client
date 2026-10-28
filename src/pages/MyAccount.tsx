import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { getMyOrders, type Order } from "../api";

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
      <h1>האזור האישי של {user?.fullName}</h1>

      {error ? (
        <p>{error}</p>
      ) : orders.length === 0 ? (
        <p>אין לך הזמנות עדיין</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <h2>הזמנה מספר {order.id}</h2>
            <p>סטטוס: {order.status}</p>
            <p>סכום: {order.totalPrice} ₪</p>
            <p>מספר פריטים: {order.itemsCount}</p>

            {order.items.map((item) => (
              <div key={item.id}>
                <p>{item.productName}</p>
                <p>מחיר: {item.unitPrice} ₪</p>
                {item.personalizationText && (
                  <p>טקסט: {item.personalizationText}</p>
                )}
                {item.color && <p>צבע: {item.color.name}</p>}
                {item.font && <p>גופן: {item.font.name}</p>}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyAccount;
