
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductById, featuredProducts } from "@/data/productsData";
import ProductGrid from "@/components/ProductGrid";
import { cn } from "@/lib/utils";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = id ? getProductById(id) : undefined;
  const relatedProducts = featuredProducts.filter(p => p.id !== id).slice(0, 4);

  if (!product) {
    navigate("/");
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart({...product});
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Mock images for the product gallery
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1561052967-61fc91e48d79?auto=format&fit=crop&q=80&w=800",
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img 
              src={productImages[selectedImage]} 
              alt={product.name} 
              className="h-full w-full object-cover object-center"
            />
          </div>
          
          <div className="flex gap-2 overflow-auto pb-2">
            {productImages.map((img, i) => (
              <button
                key={i}
                className={cn(
                  "h-20 w-20 rounded-md overflow-hidden border-2",
                  selectedImage === i ? "border-primary" : "border-transparent"
                )}
                onClick={() => setSelectedImage(i)}
              >
                <img
                  src={img}
                  alt={`Product view ${i + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">{product.category}</span>
            {product.isNew && (
              <span className="bg-primary px-2 py-0.5 text-xs font-medium text-white rounded-md">
                New
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.rating})</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-woodrose-500 px-2 py-0.5 text-xs font-medium text-white rounded-md">
                    {discountPercentage}% Off
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <Check className="h-4 w-4" /> In Stock
            </p>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet
              tincidunt lobortis, nisi velit dictum sapien, vitae congue elit purus vel eros.
              Vivamus eu libero at nisi mollis ultrices.
            </p>

            <ul className="text-sm space-y-1 mb-4">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" /> Premium quality materials
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" /> 30-day money-back guarantee
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" /> Free shipping on orders over ৳2000
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </Button>
            </div>
            <Button 
              className="flex-1 rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="text-sm space-y-2">
            <p><span className="font-medium">SKU:</span> {product.id.padStart(8, '0')}</p>
            <p><span className="font-medium">Category:</span> {product.category}</p>
            <p><span className="font-medium">Tags:</span> Premium, Quality, {product.category}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-4">
          <h3 className="text-lg font-medium mb-2">Product Description</h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet
            tincidunt lobortis, nisi velit dictum sapien, vitae congue elit purus vel eros.
            Vivamus eu libero at nisi mollis ultrices. Proin sit amet nunc vel ligula eleifend
            consectetur. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Curabitur a hendrerit justo, non iaculis sem.
            Nulla facilisi. Integer tincidunt, purus ac finibus faucibus, nibh magna bibendum ante,
            vel tempor arcu lacus at ligula.
          </p>
          <p className="text-muted-foreground mt-4">
            Maecenas pulvinar leo at ex maximus, in tincidunt tortor fringilla. Phasellus
            venenatis erat sit amet odio finibus, in dictum turpis fermentum. Nullam volutpat
            ultricies ligula, vel finibus nibh dignissim sit amet. Curabitur quis neque ac purus
            scelerisque bibendum. Cras eleifend, ante a hendrerit dignissim, tellus nisi maximus
            elit, eget dictum tellus odio id nisi.
          </p>
        </TabsContent>
        <TabsContent value="specifications" className="pt-4">
          <h3 className="text-lg font-medium mb-2">Product Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium bg-muted">Brand</td>
                    <td className="py-2 px-4">KathGolap</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium bg-muted">Model</td>
                    <td className="py-2 px-4">KG-{product.id.padStart(4, '0')}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium bg-muted">Color</td>
                    <td className="py-2 px-4">Multiple Colors</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium bg-muted">Material</td>
                    <td className="py-2 px-4">Premium Quality</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium bg-muted">Warranty</td>
                    <td className="py-2 px-4">1 Year</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium bg-muted">Origin</td>
                    <td className="py-2 px-4">Bangladesh</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium bg-muted">Shipping</td>
                    <td className="py-2 px-4">Nationwide</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium bg-muted">Return Policy</td>
                    <td className="py-2 px-4">30 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-4">
          <h3 className="text-lg font-medium mb-2">Customer Reviews</h3>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < 5 ? "text-amber-500 fill-amber-500" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="font-medium">Excellent</span>
              </div>
              <p className="font-medium">Ahmed H.</p>
              <p className="text-sm text-muted-foreground mb-2">2 weeks ago</p>
              <p className="text-sm">
                I absolutely love this product! The quality is exceptional and it exceeded all my expectations.
                Delivery was fast and the product was well packaged. Highly recommend!
              </p>
            </div>
            <div className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < 4 ? "text-amber-500 fill-amber-500" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="font-medium">Very Good</span>
              </div>
              <p className="font-medium">Priya M.</p>
              <p className="text-sm text-muted-foreground mb-2">1 month ago</p>
              <p className="text-sm">
                Great purchase! The product is as described and the quality is very good for the price.
                Would definitely buy from KathGolap again.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div>
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetail;
