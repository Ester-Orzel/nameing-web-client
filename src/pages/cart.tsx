
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

  // עיצוב משותף
  const chip = "rounded-full bg-copper-tint px-3 py-0.5 text-xs font-medium text-copper-dark";
  const qtyButton = "min-h-9 w-9 rounded-none bg-transparent p-0 text-lg font-normal text-ink shadow-none hover:translate-y-0 hover:bg-copper-tint";

  // סל ריק
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-[20px] border border-line bg-white px-4 py-14 text-center">
        <h1>סל הקניות שלי</h1>
        <p className="text-lg text-muted">סל הקניות ריק</p>
        <Link
          to="/products"
          className="inline-flex min-h-11 items-center rounded-full bg-copper px-7 font-medium text-white hover:bg-copper-dark hover:text-white"
        >
          למוצרים שלנו
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-x-8 gap-y-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <h1 className="lg:col-span-2">סל הקניות שלי</h1>

      <ul className="m-0 flex list-none flex-col gap-4 p-0">
        {lines.map((line) => (
          <li
            key={line.key}
            className="grid grid-cols-[96px_1fr_auto_auto_auto] items-center gap-x-5 gap-y-3 rounded-[20px] border border-line bg-white p-4 max-sm:grid-cols-[72px_1fr_auto]"
          >
            <img
              src={line.item.product.imageUrl}
              alt={line.item.product.name}
              className="size-24 rounded-[14px] bg-photo object-cover max-sm:row-span-2 max-sm:size-[72px]"
            />

            <div>
              <h2 className="mb-0.5 text-lg">{line.item.product.name}</h2>
              <p className="text-sm text-muted">{line.item.product.price} ₪ ליחידה</p>

              {line.item.personalization && (
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <span className={chip}>טקסט: {line.item.customText}</span>
                  {line.item.selectedColor && <span className={chip}>צבע: {line.item.selectedColor.name}</span>}
                  {line.item.selectedFont && <span className={chip}>גופן: {line.item.selectedFont.name}</span>}
                </div>
              )}
            </div>

            {/* בורר כמות */}
            <div
              aria-label="כמות"
              className="flex items-center overflow-hidden rounded-full border border-line-strong max-sm:col-start-2 max-sm:justify-self-start"
            >
              <button onClick={() => increase(line)} aria-label="הוספת יחידה" className={qtyButton}>+</button>
              <span className="w-8 text-center font-medium">{line.quantity}</span>
              <button onClick={() => decrease(line)} aria-label="הורדת יחידה" className={qtyButton}>−</button>
            </div>

            <strong className="min-w-16 text-center font-serif text-xl text-copper-dark max-sm:col-start-3 max-sm:row-start-1">
              {Number(line.item.product.price) * line.quantity} ₪
            </strong>

            <button
              onClick={() => removeLine(line)}
              className="min-h-0 bg-transparent px-2 py-1 text-sm font-normal text-muted shadow-none hover:translate-y-0 hover:bg-transparent hover:text-bad max-sm:col-start-3 max-sm:row-start-2"
            >
              הסרה
            </button>
          </li>
        ))}
      </ul>

      {/* סיכום הזמנה */}
      <aside className="flex flex-col gap-3 rounded-[20px] border border-line bg-white p-6 shadow-card lg:sticky lg:top-28">
        <h2 className="mb-1 text-xl">סיכום הזמנה</h2>
        <p className="flex justify-between text-muted">
          <span>מספר פריטים</span>
          <span>{cart.length}</span>
        </p>
        <p className="flex justify-between border-t border-line pt-3 text-lg font-medium text-ink">
          <span>סה״כ לתשלום</span>
          <strong className="font-serif text-2xl text-copper-dark">{total} ₪</strong>
        </p>
        <button onClick={Checkout} className="mt-2 w-full">סיים הזמנה</button>
      </aside>
    </div>
  );
};

export default Cart;
