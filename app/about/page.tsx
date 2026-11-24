import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Brew Haven, our story, our values and where to find us.",
};

const values = [
  { title: "Quality First", text: "We source our beans from trusted farms and roast them in small batches." },
  { title: "Your Way", text: "Every drink can be customised, because everyone likes their coffee differently." },
  { title: "Friendly Service", text: "Our baristas know regulars by name and remember their favourite order." },
];

const team = [
  { name: "Mannan", role: "Head Barista" },
  { name: "Sannan", role: "Shop Manager" },
  { name: "Abdul Rehman", role: "Pastry & Tea Specialist" },
];

// Server Component: static content only.
export default function AboutPage() {
  return (
    <div>
      <PageHeader title="About Brew Haven" subtitle="A small coffee shop with a big love for good coffee." />

      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-12">
        <section>
          <h2 className="mb-3 text-2xl font-bold text-amber-950">Our Story</h2>
          <p className="leading-relaxed text-stone-700">
            Brew Haven started in 2020 as a tiny coffee cart outside a university campus. Students loved being
            able to choose exactly how their coffee was made, so we kept that idea when we opened our shop.
            Today you can build your drink online, see the price instantly, and pick it up without waiting in line.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-amber-950">What We Believe</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-amber-100">
                <h3 className="font-bold text-amber-900">{value.title}</h3>
                <p className="mt-1 text-sm text-stone-600">{value.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-amber-950">Meet the Team</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="rounded-xl bg-amber-100 p-5 text-center">
                <p className="text-4xl">🧑‍🍳</p>
                <h3 className="mt-2 font-bold text-amber-950">{member.name}</h3>
                <p className="text-sm text-stone-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-amber-100">
          <h2 className="mb-2 text-2xl font-bold text-amber-950">Visit Us</h2>
          <p className="text-stone-700">📍 Main Boulevard, Islamabad</p>
          <p className="text-stone-700">📞 051-1234567</p>
          <p className="text-stone-700">🕗 Mon – Sat 8 AM – 11 PM, Sunday 10 AM – 11 PM</p>
        </section>
      </div>
    </div>
  );
}
