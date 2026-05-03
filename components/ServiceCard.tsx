import Link from "next/link";
import type { FrontendService } from "@/lib/publicData";

export default function ServiceCard({
  service,
  showDetailLink = true,
}: {
  service: FrontendService;
  showDetailLink?: boolean;
}) {
  const detailHref = service.routeSlug ? `/services/${service.routeSlug}` : null;
  const cardHref = detailHref ?? `/intake?service=${service.intakeSlug}`;

  return (
    <article className="premium-card group flex h-full flex-col justify-between">
      <Link
        href={cardHref}
        aria-label={service.title}
        className="absolute inset-0 z-0 rounded-[1.5rem]"
      />

      <div className="relative z-10">
        <div className="mb-5 inline-flex rounded-full border border-[rgba(47,138,103,0.12)] bg-[rgba(47,138,103,0.08)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-600)]">
          {service.eyebrow}
        </div>
        <h3 className="text-2xl font-semibold text-[var(--foreground)]">
          {service.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
          {service.description}
        </p>
      </div>

      <div className="relative z-10 mt-8 flex flex-col gap-3">
        <Link
          href={`/intake?service=${service.intakeSlug}`}
          className="gold-button inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
        >
          Get quotes
        </Link>
        {showDetailLink && detailHref ? (
          <Link
            href={detailHref}
            className="inline-flex items-center justify-center rounded-full border border-[rgba(20,35,25,0.1)] bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--foreground-soft)] transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(31,93,69,0.2)] hover:text-[var(--foreground)]"
          >
            Learn more
          </Link>
        ) : null}
      </div>
    </article>
  );
}
