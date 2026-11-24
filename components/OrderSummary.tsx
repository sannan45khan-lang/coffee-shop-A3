"use client";

// Client Component: it reads the cart from Context and the +, − and Remove
// buttons change it, which needs state and event handlers.

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItemRow from "./CartItemRow";
import Button from "./Button";

const TAX_RATE = 0.05; // 5% tax

export default function OrderSummary() {
  const { items, changeQuantity, removeItem, clearCart, totalCount, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <p className="mb-4 text-lg text-stone-600">Your order is empty.</p>
        <Link href="/menu" className="rounded-lg bg-amber-800 px-5 py-2.5 font-semibold text-white hover:bg-amber-900">
          Browse the Menu
        </Link>
      </div>
    );
  }

  const tax = Math.round(totalPrice * TAX_RATE);
  const grandTotal = totalPrice + tax;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onIncrease={() => changeQuantity(item.id, 1)}
            onDecrease={() => changeQuantity(item.id, -1)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>

      <aside className="h-fit rounded-xl bg-white p-6 shadow-sm ring-1 ring-amber-100">
        <h2 className="mb-4 text-xl font-bold text-amber-950">Order Summary</h2>
        <div className="flex flex-col gap-2 text-stone-700">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{totalCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs {totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (5%)</span>
            <span>Rs {tax}</span>
          </div>
          <div className="flex justify-between border-t border-amber-100 pt-2 text-lg font-bold text-amber-900">
            <span>Total</span>
            <span>Rs {grandTotal}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/checkout"
            className="rounded-lg bg-amber-800 px-5 py-2.5 text-center font-semibold text-white hover:bg-amber-900"
          >
            Proceed to Checkout
          </Link>
          <Button variant="secondary" onClick={clearCart} fullWidth>
            Clear Order
          </Button>
        </div>
      </aside>
    </div>
  );
}
