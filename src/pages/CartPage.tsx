
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ChevronLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" /> Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold mt-2">Shopping Cart</h1>
      </div>

      {cart.items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Browse our products and discover amazing deals!</p>
          <Button asChild className="rounded-full">
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg border mb-4 overflow-hidden">
              <div className="bg-muted py-3 px-4 hidden sm:grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              <div className="divide-y">
                {cart.items.map((item) => (
                  <div 
                    key={item.id}
                    className="py-4 px-4 sm:grid sm:grid-cols-12 sm:gap-4 flex flex-wrap items-center"
                  >
                    <div className="col-span-6 flex items-center gap-4 mb-4 sm:mb-0">
                      <Link to={`/product/${item.id}`} className="block w-20 h-20 shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </Link>
                      <div className="flex-grow min-w-0">
                        <Link to={`/product/${item.id}`} className="font-medium hover:text-primary line-clamp-2">
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-center mb-4 sm:mb-0 w-1/2 sm:w-auto">
                      <div className="sm:hidden text-xs text-muted-foreground mb-1">Price</div>
                      {formatPrice(item.price)}
                    </div>
                    
                    <div className="col-span-2 text-center mb-4 sm:mb-0 w-1/2 sm:w-auto">
                      <div className="sm:hidden text-xs text-muted-foreground mb-1">Quantity</div>
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-center flex justify-between items-center w-full sm:w-auto">
                      <div>
                        <div className="sm:hidden text-xs text-muted-foreground mb-1">Total</div>
                        <span className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Link to="/">
                <Button variant="link" size="sm" className="flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" /> Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
          
          <div>
            <div className="rounded-lg border p-6 sticky top-20">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.totalItems} items)</span>
                  <span>{formatPrice(cart.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(cart.totalPrice * 0.05)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold mb-6">
                <span>Total</span>
                <span>{formatPrice(cart.totalPrice + (cart.totalPrice * 0.05))}</span>
              </div>
              
              <Button asChild className="w-full">
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Secure payment powered by trusted payment gateways
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
