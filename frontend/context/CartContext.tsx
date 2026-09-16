"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  checkout,
} from "@/lib/api";

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
  };
  quantity: number;
  _id: string;
}

interface Cart {
  items: CartItem[];
  total: number;
}

interface CheckoutOrder {
  _id: string;
  total: number;
}

interface CartContextType {
  cart: Cart;
  totalItems: number;
  loading: boolean;
  handleAddToCart: (productId: string, quantity?: number) => Promise<void>;
  handleUpdateItem: (productId: string, quantity: number) => Promise<void>;
  handleRemoveItem: (productId: string) => Promise<void>;
  handleCheckout: () => Promise<CheckoutOrder>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const SESSION_ID = "guest-session-001";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const res = await getCart(SESSION_ID);
      setCart(res.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to fetch cart:", error.message);
      }
    }
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await getCart(SESSION_ID);
        setCart(res.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch cart:", error.message);
        }
      }
    };

    loadCart();
  }, []);

  const handleAddToCart = async (productId: string, quantity: number = 1) => {
    setLoading(true);
    try {
      await addToCart({ sessionId: SESSION_ID, productId, quantity });
      await fetchCart();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to add to cart:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (productId: string, quantity: number) => {
    try {
      await updateCartItem(SESSION_ID, productId, quantity);
      await fetchCart();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to update item:", error.message);
      }
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeCartItem(SESSION_ID, productId);
      await fetchCart();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to remove item:", error.message);
      }
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await checkout(SESSION_ID);

      await fetchCart();

      return response.data;
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error ? error.message : "Checkout failed";
      throw new Error(errorMsg);
    }
  };

  const totalItems =
    cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        loading,
        handleAddToCart,
        handleUpdateItem,
        handleRemoveItem,
        handleCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
