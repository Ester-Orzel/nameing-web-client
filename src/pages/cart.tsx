
import { useState } from "react";
import type { CartItem } from "../api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Form } from "react-hook-form";

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const navigate=useNavigate();
  const {user}=useUser();
  const Checkout = () => {
  if (!user) {
    navigate("/login", {
      state: { from: "/cart" },
    });
    return;
  }

  navigate("/checkout");
};


  const removeFromCart = (index: number) => {
    const updatedCart = cart.filter((item, i) => i !== index);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
  };

  return (
    <div>
      <h1>סל הקניות שלי</h1>

      {cart.length === 0 ? (
        <p>סל הקניות ריק</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              width="100"
            />

            <h2>{item.product.name}</h2>
            <p>מחיר: {item.product.price} ₪</p>

            {item.personalization && (
              <div>
                <p>צבע: {item.selectedColor}</p>
                <p>טקסט: {item.customText}</p>
              </div>
            )}

            <button onClick={() => removeFromCart(index)}>
              הסרה מהסל
            </button>
            {cart.length>0 && (<button onClick={Checkout}>סיים הזמנה </button>)}
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
