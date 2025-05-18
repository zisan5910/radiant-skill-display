
import React from "react";
import ProductCard, { ProductProps } from "./ProductCard";

interface ProductGridProps {
  products: ProductProps[];
  title?: string;
  subtitle?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title, 
  subtitle 
}) => {
  return (
    <section className="py-12">
      <div className="container">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">{title}</h2>
        )}
        {subtitle && (
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">{subtitle}</p>
        )}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
