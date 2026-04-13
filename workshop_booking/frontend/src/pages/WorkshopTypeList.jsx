import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WORKSHOP_TYPES } from '../data/mockData';

const PER_PAGE = 6;

export default function WorkshopTypeList({ user }) {
  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState('');

  const filtered = WORKSHOP_TYPES.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible    = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Workshop Types</h1>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              {WORKSHOP_TYPES.length} available workshops
            </p>
          </div>
          {user?.is_instructor && (
            <Link to="/add-type"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white
                         bg-[var(--color-primary)] hover:bg-[var(--color-primary-dk)] hover:shadow-glow
                         hover:-translate-y-0.5 transition-all duration-200 shrink-0">
              + Add Workshop Type
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]"
               fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
          </svg>
          <input
            id="workshop-type-search"
            type="search"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search workshop types…"
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)]
                       rounded-xl pl-11 pr-4 py-3 text-sm text-[var(--color-textbase)]
                       placeholder:text-[var(--color-muted)] outline-none
                       focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20
                       transition-all duration-200"
          />
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className="text-center py-20 text-[var(--color-muted)]">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-semibold text-[var(--color-textbase)]">No results for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((wt, i) => (
              <TypeCard key={wt.id} wt={wt} delay={i * 60} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <PagBtn disabled={page === 1} onClick={() => setPage(p => p - 1)} label="←" />
            {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
              <PagBtn key={p} active={p === page} onClick={() => setPage(p)} label={String(p)} />
            ))}
            <PagBtn disabled={page === totalPages} onClick={() => setPage(p => p + 1)} label="→" />
          </div>
        )}
      </div>
    </div>
  );
}

function TypeCard({ wt, delay }) {
  return (
    <article
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6
                 hover:border-[var(--color-primary)]/40 hover:-translate-y-1 hover:shadow-xl
                 transition-all duration-250 flex flex-col gap-4 animate-fade-up group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Duration badge */}
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold bg-[var(--color-primary)]/15 text-[var(--color-primary)]
                         border border-[var(--color-primary)]/30 px-2.5 py-1 rounded-full">
          {wt.duration} day{wt.duration > 1 ? 's' : ''}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1">
        <h2 className="font-bold text-[var(--color-textbase)] text-[1rem] leading-snug group-hover:text-[var(--color-primary)] transition-colors">
          {wt.name}
        </h2>
        <p className="text-sm text-[var(--color-muted)] mt-2 line-clamp-3 leading-relaxed">
          {wt.description}
        </p>
      </div>

      {/* CTA */}
      <Link
        to={`/types/${wt.id}`}
        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl
                   text-sm font-semibold border border-[var(--color-border)]
                   text-[var(--color-muted)] hover:border-[var(--color-primary)]
                   hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5
                   transition-all duration-200"
      >
        View Details
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </Link>
    </article>
  );
}

function PagBtn({ label, onClick, disabled, active }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-all duration-150
        ${active
          ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
          : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}
        disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  );
}
