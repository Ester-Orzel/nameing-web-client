
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../api";
import type { Product, Category } from "../api";
import { useUser } from "../context/UserContext";
import ProductCard from "../componenta/ProductCard";
import { useEffect } from "react";
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
      <section className="hero">
        <span className="eyebrow">מתנות במיתוג אישי</span>
        <h1>המוצרים שלנו</h1>
        <p>שם, אות או מילה אהובה — אנחנו הופכים כל מתנה למשהו אישי ומיוחד.</p>

        {(token || user?.role === "ADMIN") && (
          <div className="hero-links">
            {token && <Link to="/my-account">האזור האישי שלי</Link>}
            {user?.role === "ADMIN" && (
              <Link to="/admin">כניסה לניהול</Link>
            )}
          </div>
        )}
      </section>

      <div className="filters">
        <div className="filter-field">
          <label htmlFor="product-search">חיפוש מוצר:</label>
          <input
            id="product-search"
            type="search"
            placeholder="חפשי מוצר..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="product-category">קטגוריה:</label>
          <select
            id="product-category"
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

        <div className="filter-field">
          <label htmlFor="product-sort">מיון לפי:</label>
          <select
            id="product-sort"
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
      </div>

      {isLoading ? (
        <p className="msg-muted">טוען מוצרים...</p>
      ) : error ? (
        <p className="msg msg-error">שגיאה בטעינת המוצרים</p>
      ) : products.length === 0 ? (
        <p className="msg-muted">לא נמצאו מוצרים מתאימים</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-tile">
              <ProductCard product={product} onAddToCart={addToCart} />

              <button onClick={() => navigate(`/products/${product.id}`)}>
                לפרטי המוצר
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-bar">
        <p>מספר פריטים בסל: {cart.length}</p>

        <button className="btn-outline" onClick={() => navigate("/cart")}>
          לסל הקניות
        </button>
      </div>
    </div>
  );
}

export default Products;
