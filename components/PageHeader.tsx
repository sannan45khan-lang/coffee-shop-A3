// Title banner shown at the top of every page, each time with different text.

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-amber-100 py-10 text-center">
      <h1 className="text-3xl font-bold text-amber-950 md:text-4xl">{title}</h1>
      {subtitle && <p className="mx-auto mt-2 max-w-xl px-4 text-stone-600">{subtitle}</p>}
    </section>
  );
}
