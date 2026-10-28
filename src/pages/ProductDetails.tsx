
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getColors, getFonts } from "../api";
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
    queryFn: () => getProducts(),
  });

  const {
    data: colors = [],
    isLoading: colorsLoading,
    error: colorsError,
  } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });

  const {
    data: fonts = [],
    isLoading: fontsLoading,
    error: fontsError,
  } = useQuery({
    queryKey: ["fonts"],
    queryFn: getFonts,
  });

  const [personalization, setPersonalization] = useState(false);
  const [customText, setCustomText] = useState("");
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [selectedFontId, setSelectedFontId] = useState<number | null>(null);
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
    const selectedColor =
      colors.find((color) => color.id === selectedColorId) ?? null;

    const selectedFont =
      fonts.find((font) => font.id === selectedFontId) ?? null;

    if (personalization) {
      if (!customText.trim()) {
        alert("יש להזין טקסט להתאמה אישית");
        return;
      }

      if (!selectedColor || !selectedFont) {
        alert("יש לבחור צבע וגופן");
        return;
      }
    }

    const newItem: CartItem = {
      product,
      personalization,
      customText: personalization ? customText : "",
      selectedColor: personalization ? selectedColor : null,
      selectedFont: personalization ? selectedFont : null,
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
              value={selectedColorId ?? ""}
              onChange={(e) => {
                setSelectedColorId(Number(e.target.value));
                setAdded(false);
              }}
            >
              <option value="">בחרי צבע</option>
              {colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
          </label>

          {colorsLoading && <p>טוען צבעים...</p>}
          {colorsError && <p>שגיאה בטעינת הצבעים</p>}

          <label>
            גופן:
            <select
              value={selectedFontId ?? ""}
              onChange={(e) => {
                setSelectedFontId(Number(e.target.value));
                setAdded(false);
              }}
            >
              <option value="">בחרי גופן</option>
              {fonts.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.name}
                </option>
              ))}
            </select>
          </label>

          {fontsLoading && <p>טוען גופנים...</p>}
          {fontsError && <p>שגיאה בטעינת הגופנים</p>}

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
