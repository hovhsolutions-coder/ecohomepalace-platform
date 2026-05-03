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
    <div className="glass-panel mx-auto grid max-w-6xl gap-4 px-5 py-5 sm:grid-cols-3 sm:px-6">
      {items.map((item) => (
        <div
          key={`${item.value}-${item.label}`}
          className="rounded-[1.25rem] border border-[rgba(20,35,25,0.08)] bg-white/80 px-5 py-4 text-center"
        >
          <p className="text-2xl font-semibold text-[var(--primary-700)]">
            {item.value}
          </p>
          <p className="mt-1 text-sm text-[var(--foreground-soft)]">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
