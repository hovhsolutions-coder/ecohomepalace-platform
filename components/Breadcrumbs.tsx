import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-[var(--foreground-muted)]">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          {index > 0 && <span className="text-[var(--foreground-muted)]">/</span>}
          <Link
            href={item.href}
            className="transition hover:text-[var(--foreground)]"
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
