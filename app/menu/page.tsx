import type { Metadata } from "next";
import { drinks } from "@/data/drinks";
import PageHeader from "@/components/PageHeader";
import MenuBrowser from "@/components/MenuBrowser";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse all our coffees, teas, frappes and hot chocolates. Search, filter and sort.",
};

// Server Component: it loads the data and passes it to the MenuBrowser
// Client Component, which handles search, filter and sort.
export default function MenuPage() {
  return (
    <div>
      <PageHeader title="Our Menu" subtitle="Pick a drink and customise it exactly how you like it." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <MenuBrowser drinks={drinks} />
      </div>
    </div>
  );
}
