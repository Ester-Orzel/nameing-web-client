
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
      <section className="relative mb-7 overflow-hidden rounded-3xl border border-line bg-linear-135 from-white to-[#f8ebe6] p-6 shadow-card sm:p-12 [&>p]:max-w-[40ch] [&>p]:text-[1.08rem] [&>p]:text-muted">
        <span className="eyebrow">Personalized gifts</span>
        <h1>Our products</h1>
        <p>A name, an initial or a word you love — we turn every gift into something personal.</p>

        {(token || user?.role === "ADMIN") && (
          <div className="mt-4 flex flex-wrap gap-2.5 [&_a]:rounded-full [&_a]:border-[1.5px] [&_a]:border-copper-light [&_a]:bg-white [&_a]:px-4 [&_a]:py-1.5 [&_a]:text-[0.95rem] [&_a]:font-bold [&_a:hover]:bg-copper-tint">
            {token && <Link to="/my-account">My account</Link>}
            {user?.role === "ADMIN" && (
              <Link to="/admin">Admin area</Link>
            )}
          </div>
        )}
      </section>

      <div className="mb-7 grid grid-cols-1 gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm sm:grid-cols-2 sm:px-5 lg:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-1.5 sm:max-lg:first:col-span-2 [&_label]:text-sm [&_label]:text-muted">
          <label htmlFor="product-search">Search</label>
          <input
            id="product-search"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:max-lg:first:col-span-2 [&_label]:text-sm [&_label]:text-muted">
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

        <div className="flex flex-col gap-1.5 sm:max-lg:first:col-span-2 [&_label]:text-sm [&_label]:text-muted">
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
        <p className="msg-error">Error loading products</p>
      ) : products.length === 0 ? (
        <p className="msg-muted">No matching products found</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] sm:gap-6">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lift [&>button]:mx-2.5 [&>button]:mb-3 [&>button]:px-2 [&>button]:text-sm [&>button]:whitespace-normal sm:[&>button]:mx-4 sm:[&>button]:mb-4 sm:[&>button]:text-base">
              <ProductCard product={product} onAddToCart={addToCart} />

              <button className="btn" onClick={() => navigate(`/products/${product.id}`)}>
                View details
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-9 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white px-5 py-3.5 shadow-sm [&_p]:font-semibold [&_p]:text-muted max-sm:[&_button]:w-full">
        <p>Items in cart: {cart.length}</p>

        <button className="btn btn-outline" onClick={() => navigate("/cart")}>
          Go to cart
        </button>
      </div>
    </div>
  );
}

export default Products;
