
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
    alert("Please sign in to place an order");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty");
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
    console.log("Order created successfully", res);
  } catch (error) {
    console.error("Error creating order", error);
    alert("We couldn't place your order");
  }
};


  return (
    <div className="auth-wrap">
      <div className="card form-card wide">
        <h1>Delivery details</h1>
        <p className="subtitle">Your gift is almost on its way</p>

        <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Full name"
            {...register("contactName", {
              required: "Please enter your full name",
            })}
          />
          {errors.contactName && <p className="field-error">{errors.contactName.message}</p>}

          <input
            type="tel"
            placeholder="Phone"
            {...register("contactPhone", {
              required: "Please enter a phone number",
            })}
          />
          {errors.contactPhone && <p className="field-error">{errors.contactPhone.message}</p>}

          <input
            placeholder="Delivery address"
            {...register("deliveryAddress", {
              required: "Please enter a delivery address",
            })}
          />
          {errors.deliveryAddress && (
            <p className="field-error">{errors.deliveryAddress.message}</p>
          )}

          <textarea
            placeholder="Order notes"
            {...register("notes")}
          />

          <button type="submit">Place order</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
