
import type { Product } from "../api";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product }: ProductCardProps) => {  return (
    <div>
      <img
        src={product.imageUrl}
        alt={product.name}
        width="200"
      />

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <p>{product.price} ₪</p>

      
    </div>
  );
};

export default ProductCard;
