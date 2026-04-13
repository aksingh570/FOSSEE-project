import { useState } from 'react';
import { WORKSHOPS } from '../data/mockData';
import WorkshopCard from '../components/WorkshopCard';

const TABS = ['Pending', 'Upcoming', 'All'];

export default function InstructorDashboard({ user, toast }) {
  const [tab, setTab] = useState('Pending');
  const [workshops, setWorkshops] = useState(WORKSHOPS);
  const today = new Date();

  const handleAccept = (id) => {
    setWorkshops(ws => ws.map(w =>
      w.id === id ? { ...w, status: 1, instructor: { id: user.id, name: `${user.first_name} ${user.last_name}` } } : w
    ));
    toast?.success('Workshop accepted successfully!');
  };

  const pending  = workshops.filter(w => w.status === 0);
  const upcoming = workshops.filter(w => w.status === 1 && new Date(w.date) >= today);

  const filtered = tab === 'Pending'  ? pending
                 : tab === 'Upcoming' ? upcoming
                 : workshops;

  const stats = {
    pending:  pending.length,
    upcoming: upcoming.length,
    total:    workshops.filter(w => w.status === 1).length,
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden mb-8 p-8 border border-[var(--color-border)]"
             style={{background:'linear-gradient(135deg, hsl(265 72% 25% / 0.5) 0%, hsl(221 83% 25% / 0.5) 100%)'}}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(265_72%_62%/15%),transparent_60%)] pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-1">
              Instructor Dashboard
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-textbase)]">
              Hello, {user.first_name} 👋
            </h1>
            <p className="text-sm text-[var(--color-muted)] mt-1">{user.profile.institute}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Pending Review', value: stats.pending,  color: 'text-amber-400' },
            { label: 'Upcoming',       value: stats.upcoming, color: 'text-[var(--color-primary)]' },
            { label: 'Total Accepted', value: stats.total,    color: 'text-emerald-400' },
          ].map(s => (
            <div key={s.label}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 text-center">
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[var(--color-muted)] mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[var(--color-surface)] border border-[var(--color-border)]
                        rounded-xl p-1 mb-6 overflow-x-auto">
          {TABS.map(t => (
            <button key={t} id={`instructor-tab-${t.toLowerCase()}`} onClick={() => setTab(t)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium whitespace-nowrap
                          transition-all duration-200
                          ${tab === t
                            ? 'bg-[var(--color-accent)] text-white shadow-sm'
                            : 'text-[var(--color-muted)] hover:text-[var(--color-textbase)]'}`}>
              {t}
              {t === 'Pending' && stats.pending > 0 && (
                <span className="ml-1.5 text-xs bg-amber-400/20 text-amber-400 px-1.5 py-0.5 rounded-full">
                  {stats.pending}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[var(--color-muted)]">
            <div className="text-5xl mb-4">🎯</div>
            <p className="font-semibold text-[var(--color-textbase)]">No {tab.toLowerCase()} workshops</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(w => (
              <WorkshopCard key={w.id} workshop={w} isInstructor onAccept={handleAccept} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
