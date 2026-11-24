import Link from "next/link";
import CartBadge from "./CartBadge";

// Server Component: the links never change.
// Only the small CartBadge inside it is a Client Component.

interface NavLink {
  href: string;
  label: string;
}

const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/checkout", label: "Checkout" },
];

interface NavbarProps {
  shopName: string;
}

export default function Navbar({ shopName }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 bg-amber-950 text-amber-50 shadow">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          ☕ {shopName}
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-sm sm:gap-6 sm:text-base">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-amber-300">
              {link.label}
            </Link>
          ))}
          <CartBadge />
        </div>
      </nav>
    </header>
  );
}
