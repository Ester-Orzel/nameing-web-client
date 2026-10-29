
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getColors, getFonts } from "../api";
import type { CartItem } from "../api";
import { addToCart } from "../cartStorage";

function ProductDetails() {
  const { id } = useParams();

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

    addToCart(newItem);
    setAdded(true);
  };

  // בעמוד הזה: התמונה בצד אחד, וכל השאר בעמודה השנייה (md:col-start-2)
  return (
    <div className="grid items-start gap-x-14 gap-y-4 max-md:grid-cols-1 md:grid-cols-2 md:grid-rows-[repeat(9,auto)_1fr]">
      <h1 className="mb-0 md:col-start-2">{product.name}</h1>

      <img
        src={product.imageUrl}
        alt={product.name}
        width="200"
        className="aspect-square w-full rounded-3xl border border-line bg-white object-cover shadow-card md:col-start-1 md:row-span-full md:row-start-1"
      />

      <p className="md:col-start-2">{product.description}</p>
      <p className="font-serif text-3xl font-bold text-copper-dark md:col-start-2">{product.price} ₪</p>

      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-[1.05rem] shadow-sm md:col-start-2">
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
        <div className="grid gap-4 rounded-2xl border border-dashed border-line-strong bg-white px-5 py-4 md:col-start-2 [&>label]:flex [&>label]:flex-col [&>label]:gap-1.5">
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

      <button onClick={handleAddToCart} className="justify-self-start md:col-start-2">
        הוספה לסל
      </button>

      {added && (
        <p className="justify-self-start rounded-[10px] bg-[#e6f2ea] px-4 py-2 font-semibold text-[#3f7d5a] md:col-start-2">
          המוצר נוסף לסל!
        </p>
      )}
    </div>
  );
}

export default ProductDetails;
