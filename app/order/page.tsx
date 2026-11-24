import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import OrderSummary from "@/components/OrderSummary";

export const metadata: Metadata = {
  title: "Your Order",
  description: "Review the drinks in your order, change quantities and see the total.",
};

// This page stays a Server Component so it can export metadata.
// The interactive part (OrderSummary) is a Client Component.
export default function OrderPage() {
  return (
    <div>
      <PageHeader title="Your Order" subtitle="Check your drinks before you place the order." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <OrderSummary />
      </div>
    </div>
  );
}
