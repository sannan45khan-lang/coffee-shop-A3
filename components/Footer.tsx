import Link from "next/link";

interface FooterProps {
  shopName: string;
}

export default function Footer({ shopName }: FooterProps) {
  return (
    <footer className="mt-auto bg-amber-950 text-amber-100">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
        <div>
          <h3 className="mb-2 font-bold">☕ {shopName}</h3>
          <p className="text-sm text-amber-200">Fresh coffee, made your way.</p>
        </div>
        <div>
          <h3 className="mb-2 font-bold">Opening Hours</h3>
          <p className="text-sm text-amber-200">Mon – Sat: 8 AM – 11 PM</p>
          <p className="text-sm text-amber-200">Sunday: 10 AM – 11 PM</p>
        </div>
        <div>
          <h3 className="mb-2 font-bold">Quick Links</h3>
          <div className="flex flex-col gap-1 text-sm text-amber-200">
            <Link href="/menu" className="hover:text-white">Menu</Link>
            <Link href="/order" className="hover:text-white">Your Order</Link>
            <Link href="/about" className="hover:text-white">About Us</Link>
          </div>
        </div>
      </div>
      <p className="border-t border-amber-900 py-4 text-center text-xs text-amber-300">
        © 2026 {shopName}. CS4032 Web Programming – Assignment 3.
      </p>
    </footer>
  );
}
