
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../api";
import type { Product, Category } from "../api";
import { useUser } from "../context/UserContext";
import ProductCard from "../componenta/ProductCard";
type Sort = "newest" | "price_asc" | "price_desc" | "name";

function Products() {
    
  const [cart, setCart] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

const [sort, setSort] = useState<Sort>("newest");
const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
  getCategories().then((data) => {
    setCategories(data);
  });
}, []);
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

  

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
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

      <button onClick={() => navigate("/cart")}>
        לסל הקניות
      </button>

      <p>מספר פריטים בסל: {cart.length}</p>
    </div>
  );
}

export default Products;
