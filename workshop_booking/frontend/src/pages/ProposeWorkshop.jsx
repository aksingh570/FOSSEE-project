import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { WORKSHOP_TYPES } from '../data/mockData';

export default function ProposeWorkshop({ user, toast }) {
  const navigate = useNavigate();
  const today    = new Date().toISOString().split('T')[0];

  const [form, setForm]     = useState({ workshop_type: '', date: '', tnc_accepted: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [tncContent, setTncContent] = useState('');

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const handleTypeChange = (id) => {
    set('workshop_type', id);
    const wt = WORKSHOP_TYPES.find(w => w.id === Number(id));
    setTncContent(wt?.terms_and_conditions ?? '');
  };

  const validate = () => {
    const e = {};
    if (!form.workshop_type) e.workshop_type = 'Please select a workshop type';
    if (!form.date)          e.date          = 'Please pick a date';
    else if (form.date < today) e.date       = 'Date must be in the future';
    if (!form.tnc_accepted)  e.tnc_accepted  = 'You must accept the terms and conditions';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    toast?.success('Workshop proposed successfully!');
    navigate('/status');
  };

  const selectedWt = WORKSHOP_TYPES.find(w => w.id === Number(form.workshop_type));

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-up">

        <Link to="/status"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)]
                     hover:text-[var(--color-primary)] transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold gradient-text">Propose a Workshop</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Fill in the details and we'll match you with an instructor.
          </p>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8">
          <form id="propose-form" onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

            {/* Workshop type */}
            <div>
              <label htmlFor="id_workshop_type"
                className="block text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">
                Workshop Type <span className="text-[var(--color-danger)]">*</span>
              </label>
              <select
                id="id_workshop_type"
                value={form.workshop_type}
                onChange={e => handleTypeChange(e.target.value)}
                className={`w-full bg-[var(--color-surface2)] border rounded-xl px-4 py-3
                            text-[var(--color-textbase)] text-sm appearance-none cursor-pointer outline-none
                            focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20
                            transition-all duration-200
                            ${errors.workshop_type ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]'}`}
              >
                <option value="">— Select a workshop type —</option>
                {WORKSHOP_TYPES.map(wt => (
                  <option key={wt.id} value={wt.id}>{wt.name} ({wt.duration}d)</option>
                ))}
              </select>
              {errors.workshop_type && <p className="text-xs text-[var(--color-danger)] mt-1">{errors.workshop_type}</p>}
            </div>

            {/* Workshop type preview */}
            {selectedWt && (
              <div className="bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/20
                              rounded-xl p-4 text-sm text-[var(--color-muted)] leading-relaxed animate-fade-in">
                <p className="font-semibold text-[var(--color-primary)] mb-1">{selectedWt.name}</p>
                <p className="line-clamp-2">{selectedWt.description}</p>
              </div>
            )}

            {/* Date */}
            <div>
              <label htmlFor="id_date"
                className="block text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">
                Proposed Date <span className="text-[var(--color-danger)]">*</span>
              </label>
              <input
                id="id_date"
                type="date"
                min={today}
                value={form.date}
                onChange={e => set('date', e.target.value)}
                className={`w-full bg-[var(--color-surface2)] border rounded-xl px-4 py-3
                            text-[var(--color-textbase)] text-sm outline-none
                            focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20
                            transition-all duration-200
                            ${errors.date ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]'}`}
              />
              {errors.date && <p className="text-xs text-[var(--color-danger)] mt-1">{errors.date}</p>}
            </div>

            {/* T&C */}
            {tncContent && (
              <div className="bg-[var(--color-surface2)] border border-[var(--color-border)] rounded-xl p-4">
                <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">
                  Terms & Conditions
                </p>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{tncContent}</p>
              </div>
            )}

            {/* Accept T&C */}
            <div className="flex items-start gap-3">
              <input
                id="id_tnc_accepted"
                type="checkbox"
                checked={form.tnc_accepted}
                onChange={e => set('tnc_accepted', e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
              />
              <label htmlFor="id_tnc_accepted" className="text-sm text-[var(--color-textbase)] cursor-pointer">
                I accept the{' '}
                <span className="text-[var(--color-primary)]">terms and conditions</span>
                {' '}for this workshop.
              </label>
            </div>
            {errors.tnc_accepted && <p className="text-xs text-[var(--color-danger)] -mt-4">{errors.tnc_accepted}</p>}

            <div className="flex gap-3 pt-2">
              <Link to="/status"
                className="flex-1 text-center py-3 rounded-xl text-sm font-semibold
                           border border-[var(--color-border)] text-[var(--color-muted)]
                           hover:bg-[var(--color-surface2)] transition-all duration-200">
                Cancel
              </Link>
              <button
                id="propose-submit"
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white
                           bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]
                           hover:shadow-glow hover:-translate-y-0.5
                           disabled:opacity-60 disabled:cursor-not-allowed
                           transition-all duration-200"
              >
                {loading ? 'Submitting…' : 'Propose Workshop'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
