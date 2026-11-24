"use client";

// Client Component: the user picks size, milk and extras (useState + onClick),
// the price updates live, and "Add to Order" changes the shared cart.

import { useState } from "react";
import Link from "next/link";
import { Drink } from "@/data/types";
import { sizes, milks, extras } from "@/data/options";
import { useCart } from "@/context/CartContext";
import OptionPicker from "./OptionPicker";
import Button from "./Button";

interface DrinkCustomizerProps {
  drink: Drink;
}

export default function DrinkCustomizer({ drink }: DrinkCustomizerProps) {
  const { addItem } = useCart();

  const [size, setSize] = useState("Small");
  const [milk, setMilk] = useState("Whole Milk");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Add the extra if it is not selected, remove it if it is.
  function toggleExtra(name: string) {
    if (selectedExtras.includes(name)) {
      setSelectedExtras(selectedExtras.filter((extra) => extra !== name));
    } else {
      setSelectedExtras([...selectedExtras, name]);
    }
  }

  // Live price: base price + size + milk + every selected extra.
  const sizePrice = sizes.find((s) => s.name === size)?.extraPrice ?? 0;
  const milkPrice = milks.find((m) => m.name === milk)?.extraPrice ?? 0;
  const extrasPrice = extras
    .filter((extra) => selectedExtras.includes(extra.name))
    .reduce((sum, extra) => sum + extra.extraPrice, 0);
  const unitPrice = drink.price + sizePrice + milkPrice + extrasPrice;
  const totalPrice = unitPrice * quantity;

  function handleAddToOrder() {
    addItem({
      id: `${drink.id}-${Date.now()}`,
      drinkId: drink.id,
      name: drink.name,
      image: drink.image,
      size,
      milk,
      extras: selectedExtras,
      unitPrice,
      quantity,
    });
    setAdded(true);
  }

  return (
    <div className="flex flex-col gap-5 rounded-xl bg-white p-6 shadow-sm ring-1 ring-amber-100">
      <h2 className="text-xl font-bold text-amber-950">Customise your drink</h2>

      <OptionPicker label="Cup Size" options={sizes} selected={size} onSelect={setSize} />
      <OptionPicker label="Milk" options={milks} selected={milk} onSelect={setMilk} />

      <div>
        <h3 className="mb-2 font-semibold text-stone-800">Extras</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {extras.map((extra) => (
            <label key={extra.name} className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
              <input
                type="checkbox"
                checked={selectedExtras.includes(extra.name)}
                onChange={() => toggleExtra(extra.name)}
                className="h-4 w-4 accent-amber-800"
              />
              {extra.name} <span className="text-stone-400">+Rs {extra.extraPrice}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <h3 className="font-semibold text-stone-800">Quantity</h3>
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="h-8 w-8 rounded-full bg-amber-100 font-bold text-amber-900 hover:bg-amber-200"
        >
          −
        </button>
        <span className="w-6 text-center font-semibold">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="h-8 w-8 rounded-full bg-amber-100 font-bold text-amber-900 hover:bg-amber-200"
        >
          +
        </button>
      </div>

      <div className="flex flex-col gap-3 border-t border-amber-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-stone-500">Rs {unitPrice} each</p>
          <p className="text-2xl font-bold text-amber-900">Total: Rs {totalPrice}</p>
        </div>
        <Button onClick={handleAddToOrder}>Add to Order</Button>
      </div>

      {added && (
        <p className="rounded-lg bg-green-100 p-3 text-sm text-green-800">
          ✅ {drink.name} added to your order!{" "}
          <Link href="/order" className="font-semibold underline">
            View order
          </Link>
        </p>
      )}
    </div>
  );
}
