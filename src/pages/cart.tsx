
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

  // Total, for display only
  const total = cart.reduce((sum, item) => sum + Number(item.product.price), 0);

  return (
    <div>
      <div className="mb-6 [&_h1]:mb-1 [&_p]:text-muted">
        <h1>My cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="card px-4 py-12 text-center [&_p]:mb-5 [&_p]:text-lg [&_p]:text-muted">
          <p>Your cart is empty</p>
          <button className="btn" onClick={() => navigate("/products")}>Browse products</button>
        </div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-4">
            {cart.map((item, index) => (
              <div key={index} className="grid grid-cols-[72px_1fr] items-center gap-4 rounded-2xl border border-line bg-white p-3.5 shadow-sm sm:grid-cols-[96px_1fr_auto] [&_h2]:mb-0.5 [&_h2]:text-lg [&_p]:text-[0.95rem] [&>img]:size-[72px] [&>img]:rounded-[10px] [&>img]:bg-soft [&>img]:object-cover sm:[&>img]:size-24 max-sm:[&>button]:col-span-2 max-sm:[&>button]:justify-self-start">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  width="100"
                />

                <div>
                  <h2>{item.product.name}</h2>
                  <p className="price">Price: ₪{item.product.price}</p>

                  {item.personalization && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <span className="chip">Color: {item.selectedColor}</span>
                      <span className="chip">Text: {item.customText}</span>
                    </div>
                  )}
                </div>

                <button className="btn btn-ghost" onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <aside className="card lg:sticky lg:top-6 [&_h2]:mb-3">
            <h2>Order summary</h2>
            <div className="flex justify-between py-2 text-muted">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between py-2 text-muted mt-1.5 border-t border-line pt-3 text-lg font-bold text-ink">
              <span>Total</span>
              <span>₪{total}</span>
            </div>
            {cart.length>0 && (<button className="btn mt-4 w-full" onClick={Checkout}>Checkout </button>)}
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
