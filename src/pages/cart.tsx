
import { useState } from "react";
import type { CartItem } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getCart, saveCart, cartItemKey } from "../cartStorage";

// שורה בסל: פריט אחד והכמות שלו (פריטים זהים מאוחדים לשורה אחת)
interface CartLine {
  key: string;
  item: CartItem;
  quantity: number;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>(getCart);

  const navigate = useNavigate();
  const { user } = useUser();

  const Checkout = () => {
    if (!user) {
      navigate("/login", {
        state: { from: "/cart" },
      });
      return;
    }

    navigate("/checkout");
  };

  // עדכון הסל גם במסך וגם ב־localStorage
  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  // מאחדים פריטים זהים לשורה אחת עם כמות
  const lines: CartLine[] = [];
  for (const item of cart) {
    const key = cartItemKey(item);
    const line = lines.find((l) => l.key === key);
    if (line) line.quantity += 1;
    else lines.push({ key, item, quantity: 1 });
  }

  const increase = (line: CartLine) => updateCart([...cart, line.item]);

  const decrease = (line: CartLine) => {
    const index = cart.findIndex((item) => cartItemKey(item) === line.key);
    updateCart(cart.filter((_item, i) => i !== index));
  };

  const removeLine = (line: CartLine) =>
    updateCart(cart.filter((item) => cartItemKey(item) !== line.key));

  const total = cart.reduce((sum, item) => sum + Number(item.product.price), 0);

  return (
    <div>
      <h1>סל הקניות שלי</h1>

      {cart.length === 0 ? (
        <>
          <p>סל הקניות ריק</p>
          <Link to="/products">למוצרים שלנו</Link>
        </>
      ) : (
        <>
          <ul>
            {lines.map((line) => (
              <li key={line.key}>
                <img src={line.item.product.imageUrl} alt={line.item.product.name} />

                <div>
                  <h2>{line.item.product.name}</h2>
                  <p>{line.item.product.price} ₪ ליחידה</p>

                  {line.item.personalization && (
                    <div>
                      <span>טקסט: {line.item.customText}</span>
                      {line.item.selectedColor && <span>צבע: {line.item.selectedColor.name}</span>}
                      {line.item.selectedFont && <span>גופן: {line.item.selectedFont.name}</span>}
                    </div>
                  )}
                </div>

                <div aria-label="כמות">
                  <button onClick={() => increase(line)} aria-label="הוספת יחידה">+</button>
                  <span>{line.quantity}</span>
                  <button onClick={() => decrease(line)} aria-label="הורדת יחידה">−</button>
                </div>

                <strong>{Number(line.item.product.price) * line.quantity} ₪</strong>

                <button onClick={() => removeLine(line)}>הסרה</button>
              </li>
            ))}
          </ul>

          <aside>
            <h2>סיכום הזמנה</h2>
            <p>
              <span>מספר פריטים</span>
              <span>{cart.length}</span>
            </p>
            <p>
              <span>סה״כ לתשלום</span>
              <strong>{total} ₪</strong>
            </p>
            <button onClick={Checkout}>סיים הזמנה</button>
          </aside>
        </>
      )}
    </div>
  );
};

export default Cart;
