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
      <p className="text-sm uppercase tracking-[0.2em] text-white/50">{title}</p>
      {intro ? (
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">{intro}</p>
      ) : null}
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {points.map((point) => (
          <div
            key={point}
            className="rounded-2xl border border-white/10 bg-zinc-950 px-6 py-5"
          >
            <span className="font-medium text-white/80">{point}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
