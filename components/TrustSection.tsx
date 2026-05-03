type TrustSectionProps = {
  title?: string;
  intro?: string;
  points: string[];
};

export default function TrustSection({
  title = "Trust Signals",
  intro,
  points,
}: TrustSectionProps) {
  return (
    <section className="mt-12">
      <p className="section-kicker">{title}</p>
      {intro ? <p className="section-copy mt-4">{intro}</p> : null}
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {points.map((point) => (
          <div
            key={point}
            className="rounded-[1.25rem] border border-[rgba(20,35,25,0.08)] bg-white/82 px-6 py-5 text-sm font-medium text-[var(--foreground-soft)] shadow-[0_10px_24px_rgba(20,35,25,0.05)]"
          >
            {point}
          </div>
        ))}
      </div>
    </section>
  );
}
