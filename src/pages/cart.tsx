
import { useState } from "react";
import type { CartItem } from "../api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

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
    const updatedCart = cart.filter((_item, i) => i !== index);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
  };

  // סכום לתצוגה בלבד
  const total = cart.reduce((sum, item) => sum + Number(item.product.price), 0);

  return (
    <div>
      <div className="page-head">
        <h1>סל הקניות שלי</h1>
      </div>

      {cart.length === 0 ? (
        <div className="card empty-state">
          <p>סל הקניות ריק</p>
          <button onClick={() => navigate("/products")}>למוצרים שלנו</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  width="100"
                />

                <div>
                  <h2>{item.product.name}</h2>
                  <p className="price">מחיר: {item.product.price} ₪</p>

                  {item.personalization && (
                    <div className="cart-item-custom">
                      <span className="chip">צבע: {item.selectedColor}</span>
                      <span className="chip">טקסט: {item.customText}</span>
                    </div>
                  )}
                </div>

                <button className="btn-ghost" onClick={() => removeFromCart(index)}>
                  הסרה מהסל
                </button>
              </div>
            ))}
          </div>

          <aside className="card summary">
            <h2>סיכום הזמנה</h2>
            <div className="summary-row">
              <span>מספר פריטים</span>
              <span>{cart.length}</span>
            </div>
            <div className="summary-row summary-total">
              <span>סה״כ</span>
              <span>{total} ₪</span>
            </div>
            {cart.length>0 && (<button className="btn-block" onClick={Checkout}>סיים הזמנה </button>)}
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
