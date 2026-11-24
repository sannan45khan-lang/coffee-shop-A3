import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SHOP_NAME = "Brew Haven";

// "%s" is replaced by each page's own title, e.g. "Menu | Brew Haven".
export const metadata: Metadata = {
  title: {
    default: SHOP_NAME,
    template: `%s | ${SHOP_NAME}`,
  },
  description: "Order freshly made coffee, tea and shakes, customised your way.",
};

// Root layout: shared by every page. Navbar and Footer appear on all routes.
// CartProvider wraps everything so every page can use the same cart.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <CartProvider>
          <Navbar shopName={SHOP_NAME} />
          <main className="flex-1">{children}</main>
          <Footer shopName={SHOP_NAME} />
        </CartProvider>
      </body>
    </html>
  );
}
