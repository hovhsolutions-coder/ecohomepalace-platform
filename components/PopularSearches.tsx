import Link from "next/link";

type SearchLink = {
  label: string;
  href: string;
};

export default function PopularSearches({
  items,
}: {
  items: SearchLink[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Link key={item.label} href={item.href} className="premium-card group">
          <p className="section-kicker">Popular search</p>
          <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
            {item.label}
          </h3>
          <p className="mt-4 text-sm text-[var(--primary-600)] transition duration-200 group-hover:text-[var(--foreground)]">
            Explore this local comparison path
          </p>
        </Link>
      ))}
    </div>
  );
}
