
import React from "react";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm text-white/80">{category.productCount} Products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
