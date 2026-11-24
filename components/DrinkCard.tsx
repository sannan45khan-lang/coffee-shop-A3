import Image from "next/image";
import Link from "next/link";
import { Drink } from "@/data/types";

// Reused on the Home page (with description + "Popular" label)
// and on the Menu page (compact, without description).

interface DrinkCardProps {
  drink: Drink;
  showDescription?: boolean;
  label?: string;
}

export default function DrinkCard({ drink, showDescription = false, label }: DrinkCardProps) {
  return (
    <Link
      href={`/menu/${drink.id}`}
      className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-amber-100 transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative">
        <Image src={drink.image} alt={drink.name} width={400} height={300} className="h-44 w-full object-cover" />
        {label && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-800 px-3 py-1 text-xs font-semibold text-white">
            {label}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-amber-700">{drink.category}</p>
        <h3 className="text-lg font-bold text-stone-800">{drink.name}</h3>
        {showDescription && <p className="text-sm text-stone-600">{drink.description}</p>}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-bold text-amber-900">Rs {drink.price}</span>
          <span className="text-sm text-stone-500">⭐ {drink.rating}</span>
        </div>
      </div>
    </Link>
  );
}
