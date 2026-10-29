
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

  return (
    <div>
      <h1>המוצרים שלנו</h1>

      {token && <Link to="/my-account">האזור האישי שלי</Link>}
      {user?.role === "ADMIN" && (
  <Link to="/admin">כניסה לניהול</Link>
)}

      <div>
        <label >חיפוש מוצר:</label>
        <input
          type="text"
          placeholder="חפשי מוצר..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <label >קטגוריה:</label>
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

      <div>
        <label >מיון לפי:</label>
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
        <p>טוען מוצרים...</p>
      ) : error ? (
        <p>שגיאה בטעינת המוצרים</p>
      ) : products.length === 0 ? (
        <p>לא נמצאו מוצרים מתאימים</p>
      ) : (
        products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} onAddToCart={addToCart} />

            <button onClick={() => navigate(`/products/${product.id}`)}>
              לפרטי המוצר
            </button>
          </div>
        ))
      )}

    </div>
  );
}

export default Products;
