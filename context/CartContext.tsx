"use client";

// The cart is needed on many pages (navbar badge, drink page, order page, checkout),
// so we keep it in one React Context and wrap the whole app with <CartProvider>.
// It must be a Client Component because it uses useState.

import { createContext, useContext, useState } from "react";
import { CartItem } from "@/data/types";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  changeQuantity: (id: string, amount: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(item: CartItem) {
    setItems([...items, item]);
  }

  // amount is +1 or -1. If the quantity reaches 0 the item is removed.
  function changeQuantity(id: string, amount: number) {
    const updated = items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + amount } : item
    );
    setItems(updated.filter((item) => item.quantity > 0));
  }

  function removeItem(id: string) {
    setItems(items.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  // Derived values: calculated from items on every render.
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, changeQuantity, removeItem, clearCart, totalCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Small helper hook so components can write: const { items } = useCart();
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return context;
}
