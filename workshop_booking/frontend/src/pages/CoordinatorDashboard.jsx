import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WORKSHOPS } from '../data/mockData';
import WorkshopCard from '../components/WorkshopCard';
import StatusBadge from '../components/StatusBadge';

const TABS = ['All', 'Pending', 'Accepted', 'Deleted'];

export default function CoordinatorDashboard({ user }) {
  const [tab, setTab] = useState('All');
  const myWorkshops = WORKSHOPS.filter(w => w.coordinator.id === user.id);

  const filtered = tab === 'All'
    ? myWorkshops
    : myWorkshops.filter(w => {
        if (tab === 'Pending')  return w.status === 0;
        if (tab === 'Accepted') return w.status === 1;
        if (tab === 'Deleted')  return w.status === 2;
        return true;
      });

  const stats = {
    total:    myWorkshops.length,
    pending:  myWorkshops.filter(w => w.status === 0).length,
    accepted: myWorkshops.filter(w => w.status === 1).length,
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Hero strip */}
        <div className="relative rounded-3xl overflow-hidden mb-8 p-8
                        border border-[var(--color-border)]"
             style={{background:'linear-gradient(135deg, hsl(221 83% 25% / 0.5) 0%, hsl(265 72% 25% / 0.5) 100%)'}}>
          <div className="relative z-10">
            <p className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-1">
              Coordinator Dashboard
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-textbase)]">
              Hello, {user.first_name} 👋
            </h1>
            <p className="text-sm text-[var(--color-muted)] mt-1">{user.profile.institute}</p>
          </div>
          <Link to="/propose"
            className="absolute top-8 right-8 hidden sm:inline-flex items-center gap-2
                       px-5 py-2.5 rounded-xl font-semibold text-sm text-white
                       bg-[var(--color-primary)] hover:bg-[var(--color-primary-dk)]
                       hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200">
            + Propose Workshop
          </Link>
          {/* BG glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(221_83%_62%/15%),transparent_60%)] pointer-events-none" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total',    value: stats.total,    color: 'text-[var(--color-textbase)]' },
            { label: 'Pending',  value: stats.pending,  color: 'text-amber-400' },
            { label: 'Accepted', value: stats.accepted, color: 'text-emerald-400' },
          ].map(s => (
            <div key={s.label}
              className="bg-[var(--color-surface)] border border-[var(--color-border)]
                         rounded-2xl p-5 text-center">
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[var(--color-muted)] mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mobile propose button */}
        <Link to="/propose"
          className="sm:hidden flex items-center justify-center gap-2 w-full mb-6
                     py-3 rounded-xl font-semibold text-sm text-white
                     bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
          + Propose a Workshop
        </Link>

        {/* Tab filter */}
        <div className="flex gap-1 bg-[var(--color-surface)] border border-[var(--color-border)]
                        rounded-xl p-1 mb-6 overflow-x-auto">
          {TABS.map(t => (
            <button key={t} id={`tab-${t.toLowerCase()}`} onClick={() => setTab(t)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium whitespace-nowrap
                          transition-all duration-200
                          ${tab === t
                            ? 'bg-[var(--color-primary)] text-white shadow-sm'
                            : 'text-[var(--color-muted)] hover:text-[var(--color-textbase)]'}`}>
              {t}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full
                ${tab === t ? 'bg-white/20' : 'bg-[var(--color-surface2)]'}`}>
                {t === 'All' ? myWorkshops.length
                  : t === 'Pending'  ? stats.pending
                  : t === 'Accepted' ? stats.accepted
                  : myWorkshops.filter(w => w.status === 2).length}
              </span>
            </button>
          ))}
        </div>

        {/* Workshop grid */}
        {filtered.length === 0 ? (
          <EmptyState tab={tab} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(w => (
              <WorkshopCard key={w.id} workshop={w} isInstructor={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ tab }) {
  return (
    <div className="text-center py-20 text-[var(--color-muted)]">
      <div className="text-5xl mb-4">📋</div>
      <p className="font-semibold text-[var(--color-textbase)]">No {tab.toLowerCase()} workshops</p>
      <p className="text-sm mt-1">
        {tab === 'All'
          ? 'Propose your first workshop to get started.'
          : `You have no ${tab.toLowerCase()} workshops.`}
      </p>
      {tab === 'All' && (
        <Link to="/propose"
          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl font-semibold text-sm text-white
                     bg-[var(--color-primary)] hover:bg-[var(--color-primary-dk)] transition-all duration-200">
          Propose Now
        </Link>
      )}
    </div>
  );
}
