
import type { Product } from "../api";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="product-card-media">
        <img
          src={product.imageUrl}
          alt={product.name}
          width="200"
          loading="lazy"
        />
      </div>

      <div className="product-card-body">
        <h2>{product.name}</h2>

        <p className="product-card-desc">{product.description}</p>

        <p className="price">{product.price} ₪</p>
      </div>

      
    </div>
  );
};

export default ProductCard;
