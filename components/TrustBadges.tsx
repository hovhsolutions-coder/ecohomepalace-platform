type TrustBadgeItem = {
  value: string;
  label: string;
};

export default function TrustBadges({
  items,
}: {
  items: TrustBadgeItem[];
}) {
  return (
    <div className="glass-panel mx-auto grid max-w-6xl gap-4 px-6 py-5 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={`${item.value}-${item.label}`}
          className="rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
          <p className="text-2xl font-semibold text-[var(--gold-300)]">
            {item.value}
          </p>
          <p className="mt-1 text-sm uppercase tracking-[0.18em] text-white/55">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
