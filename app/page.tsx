import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { drinks } from "@/data/drinks";
import DrinkCard from "@/components/DrinkCard";

export const metadata: Metadata = {
  title: "Brew Haven | Coffee Made Your Way",
  description: "Brew Haven coffee shop – build your perfect drink and order online.",
};

const features = [
  { icon: "🎨", title: "Made Your Way", text: "Choose size, milk and extras. The price updates as you go." },
  { icon: "⚡", title: "Fast Pickup", text: "Order online and pick up your drink in as little as 15 minutes." },
  { icon: "🌱", title: "Fresh Beans", text: "Locally roasted beans, ground fresh for every single cup." },
];

// Server Component: it only displays data, no state or events.
export default function HomePage() {
  const popularDrinks = drinks.filter((drink) => drink.popular);

  return (
    <div>
      {/* Hero section */}
      <section className="bg-amber-100">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-amber-950 md:text-5xl">
              Your perfect cup, <span className="text-amber-700">made your way.</span>
            </h1>
            <p className="mt-4 text-lg text-stone-600">
              Pick a drink, customise the size, milk and extras, and watch the price update live.
              Then order ahead and skip the queue.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/menu" className="rounded-lg bg-amber-800 px-6 py-3 font-semibold text-white hover:bg-amber-900">
                View Menu
              </Link>
              <Link
                href="/about"
                className="rounded-lg border border-amber-800 px-6 py-3 font-semibold text-amber-800 hover:bg-amber-200"
              >
                About Us
              </Link>
            </div>
          </div>
          <Image
            src="/images/hot-coffee.svg"
            alt="A cup of hot coffee"
            width={400}
            height={300}
            priority
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-amber-100">
            <p className="text-4xl">{feature.icon}</p>
            <h2 className="mt-2 text-lg font-bold text-amber-950">{feature.title}</h2>
            <p className="mt-1 text-sm text-stone-600">{feature.text}</p>
          </div>
        ))}
      </section>

      {/* Popular drinks – DrinkCard reused with description and a label */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-amber-950">Customer Favourites</h2>
          <Link href="/menu" className="font-semibold text-amber-800 hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularDrinks.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} showDescription label="Popular" />
          ))}
        </div>
      </section>
    </div>
  );
}
