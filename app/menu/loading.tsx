// Shown automatically by Next.js while a /menu page is loading.
export default function MenuLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="mb-6 text-center text-lg font-medium text-amber-800">☕ Brewing the menu...</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="h-72 animate-pulse rounded-xl bg-amber-100" />
        ))}
      </div>
    </div>
  );
}
