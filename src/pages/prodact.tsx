
import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../api";
import type { Product } from "../api";
import { useUser } from "../context/UserContext";
import ProductCard from "../componenta/ProductCard";
type Sort = "newest" | "price_asc" | "price_desc" | "name";

function Products() {
    
  // חיפוש וקטגוריה יכולים להגיע מהכתובת, למשל /products?category=מוצרים לבית
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<Sort>("newest");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // כשמגיעים מכרטיס קטגוריה בעמוד הבית — בוחרים את הקטגוריה לפי השם שבכתובת
  useEffect(() => {
    const categoryName = searchParams.get("category");
    const match = categories.find((category) => category.name === categoryName);
    setCategoryId(match?.id);
  }, [categories, searchParams]);
  const navigate = useNavigate();
  const { token ,user} = useUser();

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", search, categoryId, sort],
    queryFn: () => getProducts({ search, categoryId, sort }),
  });

  

  // ProductCard מצפה לפונקציה הזו; ההוספה לסל עצמה נעשית בעמוד פרטי המוצר
  const addToCart = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  // עיצוב משותף
  const pillLink = "justify-self-start rounded-full border-[1.5px] border-copper-light bg-white px-4 py-1.5 text-[0.95rem] font-bold hover:bg-copper-tint";
  const filterBox = "flex flex-col gap-1.5 rounded-2xl border border-line bg-white p-4 shadow-sm";
  const filterLabel = "text-sm text-muted";
  const message = "col-span-full";

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      <h1 className="col-span-full mb-0">המוצרים שלנו</h1>

      {token && <Link to="/my-account" className={pillLink}>האזור האישי שלי</Link>}
      {user?.role === "ADMIN" && (
  <Link to="/admin" className={pillLink}>כניסה לניהול</Link>
)}

      {/* שדה החיפוש תמיד מתחיל שורה חדשה */}
      <div className={`${filterBox} col-span-2 col-start-1`}>
        <label className={filterLabel}>חיפוש מוצר:</label>
        <input
          type="text"
          placeholder="חפשי מוצר..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={filterBox}>
        <label className={filterLabel}>קטגוריה:</label>
        <select
          
          value={categoryId ?? ""}
          onChange={(e) =>
            setCategoryId(
              e.target.value === "" ? undefined : Number(e.target.value)
            )
          }
        >
          <option value="">כל הקטגוריות</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={filterBox}>
        <label className={filterLabel}>מיון לפי:</label>
        <select
          
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as Sort)
          }
        >
          <option value="newest">החדשים ביותר</option>
          <option value="price_asc">מחיר: מהנמוך לגבוה</option>
          <option value="price_desc">מחיר: מהגבוה לנמוך</option>
          <option value="name">לפי שם המוצר</option>
        </select>
      </div>

      {isLoading ? (
        <p className={message}>טוען מוצרים...</p>
      ) : error ? (
        <p className={message}>שגיאה בטעינת המוצרים</p>
      ) : products.length === 0 ? (
        <p className={message}>לא נמצאו מוצרים מתאימים</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <ProductCard product={product} onAddToCart={addToCart} />

            <button
              onClick={() => navigate(`/products/${product.id}`)}
              className="mx-4 mb-4 max-sm:mx-2.5 max-sm:mb-3 max-sm:px-2 max-sm:text-sm"
            >
              לפרטי המוצר
            </button>
          </div>
        ))
      )}

    </div>
  );
}

export default Products;
