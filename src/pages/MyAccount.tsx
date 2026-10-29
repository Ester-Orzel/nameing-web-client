
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { getMyOrders, type Order } from "../api";

// שורת מידע על הזמנה
const orderInfo = "inline-block px-5 pt-3 text-[0.95rem] text-muted";

const MyAccount = () => {
  const { token, user } = useUser();

  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    getMyOrders(token)
      .then((res) => setOrders(res))
      .catch(() => setError("לא הצלחנו לטעון את ההזמנות"))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="mb-1">האזור האישי של {user?.fullName}</h1>

      {loading ? (
        <p>טוען הזמנות...</p>
      ) : error ? (
        <p>{error}</p>
      ) : orders.length === 0 ? (
        <p>אין לך הזמנות עדיין</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            <h2 className="border-b border-line bg-soft px-5 py-4 text-lg">הזמנה מספר {order.id}</h2>
            <p className="inline-block px-5 pt-3 text-[0.95rem] font-bold text-copper-dark">סטטוס: {order.status}</p>
            <p className={orderInfo}>סכום: {order.totalPrice} ₪</p>
            <p className={orderInfo}>מספר פריטים: {order.itemsCount}</p>

            {order.items.map((item) => (
              <div
                key={item.id}
                className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line px-5 py-3 text-[0.95rem]"
              >
                <p className="flex-[1_1_160px] font-bold text-ink">{item.productName}</p>
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
