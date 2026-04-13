export default function StatusBadge({ status }) {
  const map = {
    0: { label: 'Pending',  cls: 'bg-amber-500/15 text-amber-400  border border-amber-500/30' },
    1: { label: 'Accepted', cls: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' },
    2: { label: 'Deleted',  cls: 'bg-red-500/15 text-red-400  border border-red-500/30' },
  };
  const { label, cls } = map[status] ?? map[0];
  return (
    <span className={`inline-flex items-center gap-1 text-[0.7rem] font-semibold
                      uppercase tracking-wider px-2.5 py-1 rounded-full ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}
