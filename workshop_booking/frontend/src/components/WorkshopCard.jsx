import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function WorkshopCard({ workshop, isInstructor, onAccept }) {
  const { id, workshop_type, date, status, coordinator } = workshop;
  const dateObj   = new Date(date);
  const isPast    = dateObj < new Date();
  const formatted = dateObj.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  return (
    <article
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5
                 hover:border-[var(--color-primary)]/40 hover:-translate-y-0.5 hover:shadow-xl
                 transition-all duration-250 flex flex-col gap-4 animate-fade-up"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-[var(--color-textbase)] text-[0.95rem] leading-snug">
            {workshop_type.name}
          </h3>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            {workshop_type.duration} day{workshop_type.duration > 1 ? 's' : ''} workshop
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Details */}
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-xs text-[var(--color-muted)] mb-0.5">Date</dt>
          <dd className={`font-medium ${isPast ? 'text-[var(--color-muted)]' : 'text-[var(--color-textbase)]'}`}>
            {formatted}
          </dd>
        </div>
        {isInstructor && coordinator && (
          <div>
            <dt className="text-xs text-[var(--color-muted)] mb-0.5">Coordinator</dt>
            <dd className="font-medium text-[var(--color-textbase)] truncate">
              {coordinator.name}
            </dd>
          </div>
        )}
      </dl>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[var(--color-border)]">
        <Link
          to={`/details/${id}`}
          className="flex-1 text-center py-1.5 rounded-lg text-sm font-medium
                     text-[var(--color-primary)] border border-[var(--color-primary)]/40
                     hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200"
        >
          View Details
        </Link>
        {isInstructor && status === 0 && onAccept && (
          <button
            id={`accept-workshop-${id}`}
            onClick={() => onAccept(id)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium
                       bg-emerald-500/15 text-emerald-400 border border-emerald-500/30
                       hover:bg-emerald-500 hover:text-white transition-all duration-200"
          >
            Accept
          </button>
        )}
      </div>
    </article>
  );
}
