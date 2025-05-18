
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "Discover Premium Products at KathGolap",
  subtitle = "Shop the latest trends in fashion, electronics, and more with exclusive deals and offers.",
  imageUrl = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
  primaryButtonText = "Shop Now",
  primaryButtonLink = "/category/fashion",
  secondaryButtonText = "View Deals",
  secondaryButtonLink = "/deals",
}) => {
  return (
    <div className="relative overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-12 text-center md:text-left mb-8 md:mb-0 z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {title}
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="rounded-full">
              <Link to={primaryButtonLink}>{primaryButtonText}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 relative z-10">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={imageUrl}
              alt="Hero Image"
              className="w-full h-auto object-cover"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
