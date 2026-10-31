import { useState } from "react";
import type { Order } from "../api";

// כפתור שפותח ומקפל את פרטי ההזמנה: משלוח, הערות וכל הפריטים
const OrderDetails = ({ order }: { order: Order }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="min-h-9 border-[1.5px] border-copper-light bg-white bg-none px-4 py-1 text-sm text-copper-dark shadow-none hover:bg-copper-tint"
      >
        {open ? "הסתר פרטים" : "פרטי הזמנה"}
      </button>

      {open && (
        <div className="mt-3 rounded-xl bg-soft p-4 text-[0.95rem]">
          <p>תאריך: {new Date(order.createdAt).toLocaleDateString("he-IL")}</p>
          <p>טלפון: {order.contactPhone}</p>
          <p>כתובת: {order.deliveryAddress}</p>
          {order.notes && <p>הערות: {order.notes}</p>}

          {order.items.map((item) => (
            <div key={item.id} className="mt-3 flex items-center gap-3 border-t border-line pt-3">
              <img src={item.productImageUrl} alt="" className="size-12 rounded-lg object-cover" />
              <div>
                <p className="font-bold text-ink">{item.productName} · {item.unitPrice} ₪</p>
                {item.personalizationText && <p>טקסט: {item.personalizationText}</p>}
                {item.color && <p>צבע: {item.color.name}</p>}
                {item.font && <p>גופן: {item.font.name}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
