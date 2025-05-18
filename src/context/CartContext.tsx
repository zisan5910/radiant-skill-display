
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ProductProps } from "@/components/ProductCard";

export interface CartItem extends ProductProps {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: ProductProps }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

interface CartContextType {
  cart: CartState;
  addToCart: (product: ProductProps) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateCartTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };

        const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
        
        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalPrice,
        };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        
        const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
        
        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalPrice,
        };
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        const updatedItems = state.items.filter((item) => item.id !== id);
        const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
        
        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalPrice,
        };
      }

      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
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

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
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
