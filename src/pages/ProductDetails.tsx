
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
    queryFn: () => getProducts(),
  });

  const [personalization, setPersonalization] = useState(false);
  const [customText, setCustomText] = useState("");
  const [selectedColor, setSelectedColor] = useState("black");
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return <p className="msg-muted">Loading product...</p>;
  }

  if (error) {
    return <p className="msg msg-error">Error loading products</p>;
  }

  const product = products?.find((p) => p.id === Number(id));

  if (!product) {
    return <p className="msg-muted">Product not found</p>;
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
      <a
        href="/products"
        className="back-link"
        onClick={(e) => {
          e.preventDefault();
          navigate("/products");
        }}
      >
        ← Back to products
      </a>

      <div className="product-details">
        <div className="product-details-media">
          <img
            src={product.imageUrl}
            alt={product.name}
            width="200"
          />
        </div>

        <div className="product-details-info">
          <span className="eyebrow">Personalized gift</span>
          <h1>{product.name}</h1>
          <p className="price">₪{product.price}</p>

          <p className="product-details-desc">{product.description}</p>

          <div className="personalize-box">
            <label className="toggle-row">
              <input
                type="checkbox"
                checked={personalization}
                onChange={(e) => {
                  setPersonalization(e.target.checked);
                  setAdded(false);
                }}
              />
              Personalize it
            </label>

            {personalization && (
              <div className="personalize-fields">
                <label>
                  Color:
                  <select
                    value={selectedColor}
                    onChange={(e) => {
                      setSelectedColor(e.target.value);
                      setAdded(false);
                    }}
                  >
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="blue">Blue</option>
                    <option value="pink">Pink</option>
                  </select>
                </label>

                <label>
                  Text to print
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => {
                      setCustomText(e.target.value);
                      setAdded(false);
                    }}
                    placeholder="Type your text"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="actions">
            <button onClick={handleAddToCart}>
              Add to cart
            </button>

            <button className="btn-outline" onClick={() => navigate("/cart")}>
              Go to cart
            </button>
          </div>

          {added && <p className="msg msg-success">Added to your cart!</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
