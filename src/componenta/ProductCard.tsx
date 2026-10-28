
import type { Product } from "../api";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="aspect-square overflow-hidden bg-soft [&_img]:size-full [&_img]:object-cover [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-105">
        <img
          src={product.imageUrl}
          alt={product.name}
          width="200"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col px-3 pt-3 pb-2.5 sm:px-4 sm:pt-4 sm:pb-3 [&_.price]:mt-1.5 [&_.price]:text-lg sm:[&_.price]:text-xl [&_h2]:mb-1 [&_h2]:text-base sm:[&_h2]:text-lg">
        <h2>{product.name}</h2>

        <p className="line-clamp-2 flex-1 text-sm text-muted">{product.description}</p>

        <p className="price">₪{product.price}</p>
      </div>

      
    </div>
  );
};

export default ProductCard;
