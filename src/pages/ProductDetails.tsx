
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";
import type { CartItem } from "../api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [personalization, setPersonalization] = useState(false);
  const [customText, setCustomText] = useState("");
  const [selectedColor, setSelectedColor] = useState("black");
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return <p>טוען מוצר...</p>;
  }

  if (error) {
    return <p>שגיאה בטעינת המוצרים</p>;
  }

  const product = products?.find((p) => p.id === Number(id));

  if (!product) {
    return <p>המוצר לא נמצא</p>;
  }

  const handleAddToCart = () => {
    const newItem: CartItem = {
      product,
      personalization,
      customText: personalization ? customText : "",
      selectedColor: personalization ? selectedColor : "",
    };

    const savedCart = localStorage.getItem("cart");
    const cart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

    cart.push(newItem);

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
  };

  return (
    <div>
      <h1>{product.name}</h1>

      <img
        src={product.imageUrl}
        alt={product.name}
        width="200"
      />

      <p>{product.description}</p>
      <p>{product.price} ₪</p>

      <label>
        <input
          type="checkbox"
          checked={personalization}
          onChange={(e) => {
            setPersonalization(e.target.checked);
            setAdded(false);
          }}
        />
        התאמה אישית
      </label>

      {personalization && (
        <div>
          <label>
            צבע:
            <select
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);
                setAdded(false);
              }}
            >
              <option value="black">שחור</option>
              <option value="white">לבן</option>
              <option value="blue">כחול</option>
              <option value="pink">ורוד</option>
            </select>
          </label>

          <label>
            טקסט להדפסה:
            <input
              type="text"
              value={customText}
              onChange={(e) => {
                setCustomText(e.target.value);
                setAdded(false);
              }}
              placeholder="כתבי את הטקסט"
            />
          </label>
        </div>
      )}

      <button onClick={handleAddToCart}>
        הוספה לסל
      </button>

      {added && <p>המוצר נוסף לסל!</p>}

      <button onClick={() => navigate("/cart")}>
        לסל הקניות
      </button>
    </div>
  );
}

export default ProductDetails;
