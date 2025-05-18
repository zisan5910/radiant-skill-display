
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ProductProps } from "@/components/ProductCard";
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  product: ProductProps;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: ProductProps }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductProps) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const initialState: CartState = {
  items: [],
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex((item) => item.product.id === action.payload.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        const newItem = { product: action.payload, quantity: 1 };
        
        return {
          ...state,
          items: [...state.items, newItem],
        };
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.product.id !== action.payload);
      
      return {
        ...state,
        items: updatedItems,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        const updatedItems = state.items.filter((item) => item.product.id !== id);
        
        return {
          ...state,
          items: updatedItems,
        };
      }

      const updatedItems = state.items.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, () => {
    const savedCart = localStorage.getItem("kathgolap-cart");
    return savedCart ? JSON.parse(savedCart) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("kathgolap-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductProps) => {
    dispatch({ type: "ADD_ITEM", payload: product });
    toast({
      title: "Product added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => {
      const price = item.product.discount 
        ? (item.product.discountPrice || 0)
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ 
        cartItems: cart.items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        getCartTotal 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
