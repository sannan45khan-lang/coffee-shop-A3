"use client";

// Client Component: controlled inputs (useState), validation on submit,
// and a fake "place order" that only updates React state.

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import FormInput from "./FormInput";
import Button from "./Button";

interface FormData {
  name: string;
  phone: string;
  email: string;
  pickupTime: string;
  payment: string;
}

// Same keys as FormData, each holding an error message (or nothing).
type FormErrors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = { name: "", phone: "", email: "", pickupTime: "", payment: "" };

const pickupTimes = ["ASAP (15 min)", "In 30 minutes", "In 1 hour", "In 2 hours"];

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (form.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }
  if (!/^03\d{9}$/.test(form.phone)) {
    errors.phone = "Enter a valid phone number like 03001234567.";
  }
  if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (form.pickupTime === "") {
    errors.pickupTime = "Please choose a pickup time.";
  }
  if (form.payment === "") {
    errors.payment = "Please choose a payment method.";
  }
  return errors;
}

export default function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  // One change handler for all fields: update only the field that changed.
  function handleChange(name: string, value: string) {
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the page from reloading

    const newErrors = validate(form);
    setErrors(newErrors);

    // If there are no errors, "place" the order (fake action, no server).
    if (Object.keys(newErrors).length === 0) {
      setOrderNumber(Math.floor(1000 + Math.random() * 9000));
      clearCart();
      setForm(emptyForm);
    }
  }

  // Confirmation screen after a successful order.
  if (orderNumber !== null) {
    return (
      <div className="mx-auto max-w-lg rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-green-200">
        <p className="text-5xl">✅</p>
        <h2 className="mt-3 text-2xl font-bold text-green-700">Order placed!</h2>
        <p className="mt-2 text-stone-600">
          Your order number is <span className="font-bold">#{orderNumber}</span>. We will start brewing
          right away.
        </p>
        <Link
          href="/menu"
          className="mt-6 inline-block rounded-lg bg-amber-800 px-5 py-2.5 font-semibold text-white hover:bg-amber-900"
        >
          Order more drinks
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <p className="mb-4 text-lg text-stone-600">Your order is empty. Add a drink before checking out.</p>
        <Link href="/menu" className="rounded-lg bg-amber-800 px-5 py-2.5 font-semibold text-white hover:bg-amber-900">
          Browse the Menu
        </Link>
      </div>
    );
  }

  const grandTotal = totalPrice + Math.round(totalPrice * 0.05);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex max-w-xl flex-col gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-amber-100"
    >
      <FormInput label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Ali Khan" />
      <FormInput label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="03001234567" />
      <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="ali@example.com" />

      <div className="flex flex-col gap-1">
        <label htmlFor="pickupTime" className="font-medium text-stone-700">
          Pickup Time
        </label>
        <select
          id="pickupTime"
          value={form.pickupTime}
          onChange={(e) => handleChange("pickupTime", e.target.value)}
          className={`rounded-lg border bg-white px-4 py-2.5 ${errors.pickupTime ? "border-red-500" : "border-amber-200"}`}
        >
          <option value="">-- Select a time --</option>
          {pickupTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {errors.pickupTime && <p className="text-sm text-red-600">{errors.pickupTime}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-medium text-stone-700">Payment Method</span>
        <div className="flex flex-wrap gap-4">
          {["Cash on Pickup", "Card", "JazzCash"].map((method) => (
            <label key={method} className="flex cursor-pointer items-center gap-2 text-stone-700">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={form.payment === method}
                onChange={(e) => handleChange("payment", e.target.value)}
                className="accent-amber-800"
              />
              {method}
            </label>
          ))}
        </div>
        {errors.payment && <p className="text-sm text-red-600">{errors.payment}</p>}
      </div>

      <div className="flex justify-between border-t border-amber-100 pt-4 text-lg font-bold text-amber-900">
        <span>Total to pay (incl. 5% tax)</span>
        <span>Rs {grandTotal}</span>
      </div>

      <Button type="submit" fullWidth>
        Place Order
      </Button>
    </form>
  );
}
