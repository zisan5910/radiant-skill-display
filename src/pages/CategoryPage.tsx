
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import ProductCard, { ProductProps } from "@/components/ProductCard";
import { getProductsByCategory, getAllProducts, categories } from "@/data/productsData";

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<number[]>([0, 15000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);

  // Get category information
  const category = categoryId 
    ? categories.find(c => c.id === categoryId) 
    : { name: "All Products", id: "all" };

  useEffect(() => {
    // Load products based on category
    if (categoryId) {
      const categoryProducts = getProductsByCategory(categoryId);
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    } else {
      const allProducts = getAllProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    }
  }, [categoryId]);

  useEffect(() => {
    let result = [...products];

    // Apply price filter
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply rating filter
    if (selectedRatings.length > 0) {
      result = result.filter((product) => 
        selectedRatings.includes(Math.floor(product.rating))
      );
    }

    // Apply availability filter
    if (availabilityFilter.includes("new") && !availabilityFilter.includes("all")) {
      result = result.filter((product) => product.isNew);
    }
    if (availabilityFilter.includes("discount") && !availabilityFilter.includes("all")) {
      result = result.filter((product) => product.isDiscount);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured - no specific sort
        break;
    }

    setFilteredProducts(result);
  }, [products, sortBy, priceRange, selectedRatings, availabilityFilter]);

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const handleAvailabilityChange = (value: string) => {
    if (value === "all") {
      setAvailabilityFilter(["all"]);
      return;
    }

    setAvailabilityFilter((prev) => {
      // Remove "all" if it exists and another option is selected
      const filtered = prev.filter(v => v !== "all");

      // Toggle the current value
      if (filtered.includes(value)) {
        return filtered.filter(v => v !== value);
      } else {
        return [...filtered, value];
      }
    });
  };

  const handleClearFilters = () => {
    setPriceRange([0, 15000]);
    setSelectedRatings([]);
    setAvailabilityFilter([]);
    setSortBy("featured");
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-4">
          <ChevronLeft className="h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold">{category?.name || "Products"}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters - Sidebar */}
        <div className="space-y-6">
          <div className="mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearFilters}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>

          <Accordion type="single" collapsible defaultValue="price">
            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 px-2">
                  <Slider 
                    defaultValue={priceRange} 
                    min={0} 
                    max={15000} 
                    step={100}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>৳{priceRange[0]}</span>
                    <span>৳{priceRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rating">
              <AccordionTrigger>Rating</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`rating-${rating}`} 
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={() => handleRatingChange(rating)}
                      />
                      <label 
                        htmlFor={`rating-${rating}`}
                        className="text-sm flex items-center"
                      >
                        {rating}+ Stars
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="availability">
              <AccordionTrigger>Availability</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="availability-all" 
                      checked={availabilityFilter.includes("all")}
                      onCheckedChange={() => handleAvailabilityChange("all")}
                    />
                    <label 
                      htmlFor="availability-all"
                      className="text-sm"
                    >
                      All Products
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="availability-new" 
                      checked={availabilityFilter.includes("new")}
                      onCheckedChange={() => handleAvailabilityChange("new")}
                      disabled={availabilityFilter.includes("all")}
                    />
                    <label 
                      htmlFor="availability-new"
                      className={`text-sm ${availabilityFilter.includes("all") ? "text-muted-foreground" : ""}`}
                    >
                      New Arrivals
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="availability-discount" 
                      checked={availabilityFilter.includes("discount")}
                      onCheckedChange={() => handleAvailabilityChange("discount")}
                      disabled={availabilityFilter.includes("all")}
                    />
                    <label 
                      htmlFor="availability-discount"
                      className={`text-sm ${availabilityFilter.includes("all") ? "text-muted-foreground" : ""}`}
                    >
                      On Sale
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Products */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} products
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No Products Found</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
