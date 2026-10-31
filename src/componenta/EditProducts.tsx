import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";
import type { Product } from "../api";
import AddProduct from "./AddProduct";

// רשימת המוצרים לעריכה: בוחרים מוצר ונפתח טופס העריכה שלו
const EditProducts = () => {
  const [selected, setSelected] = useState<Product | null>(null);

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products", "admin"],
    queryFn: () => getProducts(),
  });

  if (selected) {
    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          className="mb-4 min-h-9 border-[1.5px] border-copper-light bg-white bg-none px-4 py-1 text-sm text-copper-dark shadow-none hover:bg-copper-tint"
        >
          ← חזרה לרשימת המוצרים
        </button>
        <AddProduct key={selected.id} product={selected} />
      </div>
    );
  }

  if (isLoading) return <p>טוען מוצרים...</p>;
  if (isError) return <p>שגיאה בטעינת המוצרים</p>;

  return (
    <div className="rounded-2xl border border-line bg-white p-8 shadow-card max-sm:p-5">
      <h2 className="mb-5">עריכת מוצרים</h2>

      <ul className="m-0 flex list-none flex-col p-0">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center gap-4 border-b border-line py-3 last:border-b-0"
          >
            <img src={product.imageUrl} alt="" className="size-14 rounded-[10px] bg-photo object-cover" />
            <div className="flex-1">
              <p className="font-bold text-ink">{product.name}</p>
              <p className="text-sm text-muted">{product.price} ₪</p>
            </div>
            <button
              onClick={() => setSelected(product)}
              className="min-h-9 px-4 py-1 text-sm"
            >
              עריכה
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditProducts;
