
import { ProductProps } from "@/components/ProductCard";
import { getAllProducts } from "@/data/productsData";

export const searchProducts = (query: string): ProductProps[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  const allProducts = getAllProducts();
  
  return allProducts.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  });
};
