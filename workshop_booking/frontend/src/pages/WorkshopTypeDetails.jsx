import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { WORKSHOP_TYPES } from '../data/mockData';

export default function WorkshopTypeDetails({ user }) {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const wt        = WORKSHOP_TYPES.find(w => w.id === Number(id));
  const [showTnC, setShowTnC] = useState(false);

  if (!wt) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="text-xl font-bold text-[var(--color-textbase)]">Workshop not found</h1>
          <Link to="/types" className="text-[var(--color-primary)] text-sm mt-3 inline-block hover:underline">
            ← Back to Workshop Types
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-up">

        {/* Back */}
        <Link to="/types"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)]
                     hover:text-[var(--color-primary)] transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Workshop Types
        </Link>

        {/* Header card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold bg-[var(--color-primary)]/15 text-[var(--color-primary)]
                               border border-[var(--color-primary)]/30 px-2.5 py-1 rounded-full">
                {wt.duration} day{wt.duration > 1 ? 's' : ''}
              </span>
              <h1 className="text-2xl font-bold text-[var(--color-textbase)] mt-3 gradient-text">
                {wt.name}
              </h1>
            </div>
            {!user?.is_instructor && (
              <Link to="/propose"
                className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white
                           bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]
                           hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200 shrink-0">
                Propose This Workshop
              </Link>
            )}
          </div>

          <div>
            <h2 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">
              Description
            </h2>
            <p className="text-sm text-[var(--color-textbase)] leading-relaxed">{wt.description}</p>
          </div>
        </div>

        {/* T&C accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
          <button
            id="tnc-toggle"
            onClick={() => setShowTnC(s => !s)}
            className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold
                       text-[var(--color-textbase)] hover:bg-[var(--color-surface2)] transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="text-[var(--color-warning)]">📋</span>
              Terms & Conditions
            </span>
            <svg className={`w-4 h-4 text-[var(--color-muted)] transition-transform duration-200 ${showTnC ? 'rotate-180' : ''}`}
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          {showTnC && (
            <div className="px-6 pb-6 border-t border-[var(--color-border)]">
              <p className="text-sm text-[var(--color-muted)] leading-relaxed pt-4">{wt.terms_and_conditions}</p>
            </div>
          )}
        </div>

        {/* Instructor edit hint */}
        {user?.is_instructor && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20
                          text-xs text-[var(--color-primary)] flex items-center gap-2">
            <span>✏️</span>
            As an instructor you can edit this workshop type and upload attachments.
          </div>
        )}
      </div>
    </div>
  );
}
