"use client";

// Client Component: search text, category and sort order are state (useState)
// that change when the user types or clicks, so this must run in the browser.

import { useState } from "react";
import { Drink } from "@/data/types";
import { categories } from "@/data/drinks";
import DrinkCard from "./DrinkCard";
import SearchBar from "./SearchBar";

interface MenuBrowserProps {
  drinks: Drink[];
}

export default function MenuBrowser({ drinks }: MenuBrowserProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // 1. Search by name  2. Filter by category
  let shownDrinks = drinks.filter((drink) => {
    const matchesSearch = drink.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || drink.category === category;
    return matchesSearch && matchesCategory;
  });

  // 3. Sort (we copy the array first so the original stays unchanged)
  if (sortBy === "price-low") {
    shownDrinks = [...shownDrinks].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    shownDrinks = [...shownDrinks].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    shownDrinks = [...shownDrinks].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "name") {
    shownDrinks = [...shownDrinks].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 md:flex-row">
        <div className="md:flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search drinks, e.g. latte" />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-amber-200 bg-white px-4 py-2.5"
        >
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === cat ? "bg-amber-800 text-white" : "bg-amber-100 text-amber-900 hover:bg-amber-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-stone-500">Showing {shownDrinks.length} drinks</p>

      {shownDrinks.length === 0 ? (
        <p className="rounded-xl bg-white p-10 text-center text-stone-500">
          No drinks match your search. Try another name or category.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shownDrinks.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} />
          ))}
        </div>
      )}
    </div>
  );
}
