
import React from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { featuredProducts, newArrivals, discountProducts } from "@/data/productsData";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <ProductGrid 
        products={featuredProducts}
        title="Featured Products"
        subtitle="Discover our best selling products loved by customers"
      />
      
      <ProductGrid 
        products={newArrivals}
        title="New Arrivals"
        subtitle="The latest additions to our collections"
      />
      
      <ProductGrid 
        products={discountProducts}
        title="Special Offers"
        subtitle="Limited time discounts on selected products"
      />
    </div>
  );
};

export default Index;
