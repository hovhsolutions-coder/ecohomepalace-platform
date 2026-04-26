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
        <Link
          key={item.label}
          href={item.href}
          className="premium-card group"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-white/45">
            Popular search
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">
            {item.label}
          </h3>
          <p className="mt-4 text-sm text-[var(--gold-300)] transition duration-200 group-hover:text-white">
            Explore matching path
          </p>
        </Link>
      ))}
    </div>
  );
}
