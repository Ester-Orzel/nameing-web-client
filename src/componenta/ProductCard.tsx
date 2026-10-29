
import type { Product } from "../api";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product }: ProductCardProps) => {  return (
    <div className="flex flex-1 flex-col pb-3">
      <img
        src={product.imageUrl}
        alt={product.name}
        width="200"
        className="mb-3 aspect-square w-full bg-soft object-cover"
      />

      <h2 className="mb-1 px-4 text-lg max-sm:px-3 max-sm:text-base">{product.name}</h2>

      <p className="line-clamp-2 flex-1 px-4 text-sm text-muted max-sm:px-3">{product.description}</p>

      <p className="mt-1.5 px-4 font-serif text-xl font-bold text-copper-dark max-sm:px-3 max-sm:text-lg">{product.price} ₪</p>

      
    </div>
  );
};

export default ProductCard;
