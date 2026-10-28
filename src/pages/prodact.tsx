
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
        <span className="eyebrow">Personalized gifts</span>
        <h1>Our products</h1>
        <p>A name, an initial or a word you love — we turn every gift into something personal.</p>

        {(token || user?.role === "ADMIN") && (
          <div className="hero-links">
            {token && <Link to="/my-account">My account</Link>}
            {user?.role === "ADMIN" && (
              <Link to="/admin">Admin area</Link>
            )}
          </div>
        )}
      </section>

      <div className="filters">
        <div className="filter-field">
          <label htmlFor="product-search">Search</label>
          <input
            id="product-search"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="product-category">Category</label>
          <select
            id="product-category"
            value={categoryId ?? ""}
            onChange={(e) =>
              setCategoryId(
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="product-sort">Sort by</label>
          <select
            id="product-sort"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as Sort)
            }
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: low to high</option>
            <option value="price_desc">Price: high to low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <p className="msg-muted">Loading products...</p>
      ) : error ? (
        <p className="msg msg-error">Error loading products</p>
      ) : products.length === 0 ? (
        <p className="msg-muted">No matching products found</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-tile">
              <ProductCard product={product} onAddToCart={addToCart} />

              <button onClick={() => navigate(`/products/${product.id}`)}>
                View details
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-bar">
        <p>Items in cart: {cart.length}</p>

        <button className="btn-outline" onClick={() => navigate("/cart")}>
          Go to cart
        </button>
      </div>
    </div>
  );
}

export default Products;
