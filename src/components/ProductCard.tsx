
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isDiscount?: boolean;
  discountPrice?: number;
  discount?: boolean;
}

interface ProductCardProps {
  product: ProductProps;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="overflow-hidden border transition-all group product-card-hover h-full flex flex-col">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
          />
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-primary px-2 py-0.5 text-xs font-medium text-white rounded-md">
              New
            </div>
          )}
          {product.isDiscount && product.originalPrice && (
            <div className="absolute top-2 right-2 bg-woodrose-500 px-2 py-0.5 text-xs font-medium text-white rounded-md">
              {discountPercentage}% Off
            </div>
          )}
        </div>
        <CardContent className="flex flex-col flex-grow p-4">
          <div className="mb-1 flex items-center">
            <span className="text-xs text-muted-foreground">{product.category}</span>
          </div>
          <h3 className="font-medium text-sm md:text-base line-clamp-2 mb-1">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"
                )}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-primary/10 hover:text-primary"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
