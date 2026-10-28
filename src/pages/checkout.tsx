
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { createOrder } from "../api";
import type { CreateOrderRequest, CartItem } from "../api";

interface CheckoutForm {
  contactName: string;
  contactPhone: string;
  deliveryAddress: string;
  notes: string;
}

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();
  const { token } = useUser();
const createCart = (): CartItem[] => {
  const cart: CartItem[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  return cart;
};

const onSubmit = async (data: CheckoutForm) => {
  const cart = createCart();

  if (!token) {
    alert("צריך להתחבר כדי לבצע הזמנה");
    return;
  }

  if (cart.length === 0) {
    alert("סל הקניות ריק");
    return;
  }

  const orderFull: CreateOrderRequest = {
    ...data,
    deliveryMethod: "DELIVERY",
    items: cart.map((item) => ({
      productId: item.product.id,
    })),
  };

  try {
    const res = await createOrder(orderFull, token);
    console.log("ההזמנה נוצרה בהצלחה", res);
  } catch (error) {
    console.error("שגיאה ביצירת ההזמנה", error);
    alert("לא הצלחנו לבצע את ההזמנה");
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="שם מלא"
        {...register("contactName", {
          required: "יש להזין שם מלא",
        })}
      />
      {errors.contactName && <p>{errors.contactName.message}</p>}

      <input
        placeholder="טלפון"
        {...register("contactPhone", {
          required: "יש להזין טלפון",
        })}
      />
      {errors.contactPhone && <p>{errors.contactPhone.message}</p>}

      <input
        placeholder="כתובת למשלוח"
        {...register("deliveryAddress", {
          required: "יש להזין כתובת למשלוח",
        })}
      />
      {errors.deliveryAddress && (
        <p>{errors.deliveryAddress.message}</p>
      )}

      <textarea
        placeholder="הערות להזמנה"
        {...register("notes")}
      />

      <button type="submit">אישור הזמנה</button>
    </form>
  );
};

export default Checkout;
