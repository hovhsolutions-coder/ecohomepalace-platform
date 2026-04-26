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

  return (
    <article className="premium-card group flex h-full flex-col justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--gold-300)]/70">
          {service.eyebrow}
        </p>
        <h3 className="mt-4 text-2xl font-semibold text-white">
          {service.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-white/68">
          {service.description}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Link
          href={`/intake?service=${service.intakeSlug}`}
          className="gold-button inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
        >
          Start matching
        </Link>
        {showDetailLink && detailHref ? (
          <Link
            href={detailHref}
            className="inline-flex items-center justify-center rounded-full border border-[var(--gold-border)] px-5 py-3 text-sm font-semibold text-white/88 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--gold-300)] hover:bg-white/5"
          >
            View service page
          </Link>
        ) : null}
      </div>
    </article>
  );
}
