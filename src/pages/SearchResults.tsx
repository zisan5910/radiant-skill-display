
import React from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "@/utils/searchUtils";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = searchProducts(query);

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {results.length > 0 
            ? `Search results for "${query}"`
            : `No results found for "${query}"`}
        </h1>
      </div>

      {results.length > 0 ? (
        <ProductGrid 
          products={results}
          title=""
          subtitle=""
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-8">
            We couldn't find any products matching your search.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/category/fashion">
              <Button variant="outline">Browse Fashion</Button>
            </Link>
            <Link to="/category/electronics">
              <Button variant="outline">Browse Electronics</Button>
            </Link>
            <Link to="/category/others">
              <Button variant="outline">Browse Others</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
