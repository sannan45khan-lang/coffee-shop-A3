import Image from "next/image";
import { CartItem } from "@/data/types";

// One line in the order summary. The parent passes the handlers.

interface CartItemRowProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItemRow({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-amber-100 sm:flex-row sm:items-center">
      <Image src={item.image} alt={item.name} width={96} height={72} className="rounded-lg" />

      <div className="flex-1">
        <h3 className="font-bold text-stone-800">{item.name}</h3>
        <p className="text-sm text-stone-500">
          {item.size} · {item.milk}
        </p>
        {item.extras.length > 0 && (
          <p className="text-sm text-stone-500">Extras: {item.extras.join(", ")}</p>
        )}
        <p className="text-sm text-stone-500">Rs {item.unitPrice} each</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onDecrease} className="h-8 w-8 rounded-full bg-amber-100 font-bold hover:bg-amber-200">
          −
        </button>
        <span className="w-6 text-center font-semibold">{item.quantity}</span>
        <button onClick={onIncrease} className="h-8 w-8 rounded-full bg-amber-100 font-bold hover:bg-amber-200">
          +
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 sm:w-40 sm:justify-end">
        <span className="font-bold text-amber-900">Rs {item.unitPrice * item.quantity}</span>
        <button onClick={onRemove} className="text-sm text-red-600 hover:underline">
          Remove
        </button>
      </div>
    </div>
  );
}
