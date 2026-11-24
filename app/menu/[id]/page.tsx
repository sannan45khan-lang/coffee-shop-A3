import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { drinks, getDrinkById } from "@/data/drinks";
import DrinkCustomizer from "@/components/DrinkCustomizer";

// Build one page for every drink at build time: /menu/espresso, /menu/cappuccino, ...
export function generateStaticParams() {
  return drinks.map((drink) => ({ id: drink.id }));
}

// Each drink page gets its own title and description.
export async function generateMetadata({ params }: PageProps<"/menu/[id]">): Promise<Metadata> {
  const { id } = await params;
  const drink = getDrinkById(id);

  if (!drink) {
    return { title: "Drink not found" };
  }
  return { title: drink.name, description: drink.description };
}

// Dynamic route: reads the id from the URL and shows that drink.
// Server Component; only the DrinkCustomizer inside is a Client Component.
export default async function DrinkDetailPage({ params }: PageProps<"/menu/[id]">) {
  const { id } = await params;
  const drink = getDrinkById(id);

  if (!drink) {
    notFound(); // shows app/not-found.tsx
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/menu" className="text-sm font-medium text-amber-800 hover:underline">
        ← Back to menu
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <div>
          <Image
            src={drink.image}
            alt={drink.name}
            width={600}
            height={450}
            priority
            className="w-full rounded-2xl shadow-md"
          />

          <p className="mt-6 text-sm font-medium uppercase tracking-wide text-amber-700">{drink.category}</p>
          <h1 className="text-3xl font-bold text-amber-950 md:text-4xl">{drink.name}</h1>
          <p className="mt-3 text-stone-600">{drink.description}</p>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-amber-100 p-3">
              <p className="text-xs text-stone-500">From</p>
              <p className="font-bold text-amber-900">Rs {drink.price}</p>
            </div>
            <div className="rounded-lg bg-amber-100 p-3">
              <p className="text-xs text-stone-500">Calories</p>
              <p className="font-bold text-amber-900">{drink.calories} kcal</p>
            </div>
            <div className="rounded-lg bg-amber-100 p-3">
              <p className="text-xs text-stone-500">Caffeine</p>
              <p className="font-bold text-amber-900">{drink.caffeineMg} mg</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-stone-500">⭐ {drink.rating} / 5 customer rating</p>
        </div>

        <DrinkCustomizer drink={drink} />
      </div>
    </div>
  );
}
