import Link from "next/link";

// Shown for any unknown URL, and when notFound() is called (e.g. /menu/unknown-drink).
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-7xl">☕</p>
      <h1 className="mt-4 text-4xl font-bold text-amber-950">404 – Page Not Found</h1>
      <p className="mt-3 text-stone-600">
        Oops! This cup is empty. The page or drink you are looking for does not exist.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="rounded-lg bg-amber-800 px-5 py-2.5 font-semibold text-white hover:bg-amber-900">
          Go Home
        </Link>
        <Link
          href="/menu"
          className="rounded-lg border border-amber-800 px-5 py-2.5 font-semibold text-amber-800 hover:bg-amber-100"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
}
