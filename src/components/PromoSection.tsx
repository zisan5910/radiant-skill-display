
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PromoSection: React.FC = () => {
  return (
    <section className="py-12 bg-woodrose-100">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left justify-center">
            <span className="text-woodrose-700 font-medium mb-2">Special Offer</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Up to 40% Off Selected Items</h2>
            <p className="text-gray-700 mb-6 max-w-md">
              Don't miss out on our limited time discounts across fashion, electronics, and more. Shop now before they're gone!
            </p>
            <Button asChild className="rounded-full">
              <Link to="/deals">Shop Deals</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-woodrose-50">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
                alt="Electronics on sale"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4">
                <span className="text-white font-medium">Electronics</span>
                <span className="text-white/80 text-sm">Up to 30% Off</span>
              </div>
            </div>
            <div className="aspect-square relative overflow-hidden rounded-lg bg-woodrose-50">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
                alt="Fashion on sale"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4">
                <span className="text-white font-medium">Fashion</span>
                <span className="text-white/80 text-sm">Up to 40% Off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
