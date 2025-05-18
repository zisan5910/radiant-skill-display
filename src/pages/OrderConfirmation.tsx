
import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderConfirmation: React.FC = () => {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        
        <p className="text-lg mb-8">
          Your order has been placed successfully. We'll contact you shortly to confirm your order details.
        </p>
        
        <div className="p-6 bg-woodrose-50 rounded-lg mb-8">
          <p className="text-sm text-muted-foreground mb-1">Next Steps</p>
          <ol className="text-left list-decimal pl-5 space-y-2">
            <li>Our team will contact you within 24 hours to confirm your order.</li>
            <li>You will need to confirm the payment method during the call.</li>
            <li>Your order will be prepared for shipping after confirmation.</li>
            <li>You'll receive shipping updates via SMS and email.</li>
          </ol>
        </div>
        
        <div className="space-x-4">
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
