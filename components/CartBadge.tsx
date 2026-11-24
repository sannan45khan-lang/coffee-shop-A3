"use client";

// Client Component: it reads the cart from React Context (useCart),
// and the number must update instantly when a drink is added.

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartBadge() {
  const { totalCount } = useCart();

  return (
    <Link
      href="/order"
      className="rounded-full bg-amber-500 px-3 py-1 text-sm font-semibold text-amber-950 hover:bg-amber-400"
    >
      🛒 Order ({totalCount})
    </Link>
  );
}
