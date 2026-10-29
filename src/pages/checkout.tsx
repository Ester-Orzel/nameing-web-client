
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getCart, saveCart } from "../cartStorage";
import { createOrder, getErrorMessage } from "../api";
import type { CreateOrderRequest } from "../api";

interface CheckoutForm {
  contactName: string;
  contactPhone: string;
  deliveryAddress: string;
  notes: string;
}

// הודעת שגיאה מתחת לשדה
const fieldError = "-mt-1 text-sm font-semibold text-bad";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  const { token } = useUser();
  const navigate = useNavigate();

  const onSubmit = async (data: CheckoutForm) => {
    const cart = getCart();

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
        personalizationKind: !item.personalization
          ? "NONE"
          : item.product.personalizationType === "INITIAL_ONLY"
            ? "INITIAL"
            : "NAME",
        personalizationText: item.personalization
          ? item.customText
          : null,
        colorId: item.personalization
          ? item.selectedColor?.id ?? null
          : null,
        fontId: item.personalization
          ? item.selectedFont?.id ?? null
          : null,
      })),
    };

    try {
      const res = await createOrder(orderFull, token);
      console.log("ההזמנה נוצרה בהצלחה", res);

      saveCart([]);
      alert("ההזמנה בוצעה בהצלחה!");
      navigate("/my-account");
    } catch (error) {
      console.error("שגיאה ביצירת ההזמנה", error);
      alert(getErrorMessage(error, "לא הצלחנו לבצע את ההזמנה"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-[620px] flex-col gap-3.5 rounded-2xl border border-line bg-white p-8 shadow-card max-sm:p-5"
    >
      <h1 className="mb-2 text-center font-serif text-[clamp(1.6rem,1.2rem+1.4vw,2.1rem)] leading-relaxed font-semibold">פרטי משלוח</h1>

      <input
        placeholder="שם מלא"
        {...register("contactName", {
          required: "יש להזין שם מלא",
        })}
      />
      {errors.contactName && <p className={fieldError}>{errors.contactName.message}</p>}

      <input
        placeholder="טלפון"
        {...register("contactPhone", {
          required: "יש להזין טלפון",
        })}
      />
      {errors.contactPhone && <p className={fieldError}>{errors.contactPhone.message}</p>}

      <input
        placeholder="כתובת למשלוח"
        {...register("deliveryAddress", {
          required: "יש להזין כתובת למשלוח",
        })}
      />
      {errors.deliveryAddress && (
        <p className={fieldError}>{errors.deliveryAddress.message}</p>
      )}

      <textarea
        placeholder="הערות להזמנה"
        {...register("notes")}
      />

      <button type="submit" className="mt-2 w-full">אישור הזמנה</button>
    </form>
  );
};

export default Checkout;
