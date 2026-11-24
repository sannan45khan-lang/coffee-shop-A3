import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter your details and choose a pickup time to place your coffee order.",
};

// Server Component wrapper (for metadata). The form itself is a Client Component.
export default function CheckoutPage() {
  return (
    <div>
      <PageHeader title="Checkout" subtitle="Tell us who you are and when you will pick up your order." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
