import { useState } from 'react';
import { WORKSHOPS, STATES, DEPARTMENT_LABELS } from '../data/mockData';

const DEPARTMENTS = Object.entries(DEPARTMENT_LABELS).map(([value, label]) => ({ value, label }));
import StatusBadge from '../components/StatusBadge';

export default function ProfilePage({ user, onUpdateUser, toast }) {
  const myWorkshops = WORKSHOPS.filter(w => w.coordinator.id === user.id);
  const [editing, setEditing]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [form, setForm]         = useState({ ...user.profile, first_name: user.first_name, last_name: user.last_name });
  const [errors, setErrors]     = useState({});

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.first_name.trim()) errs.first_name = 'Required';
    if (!form.institute.trim())  errs.institute  = 'Required';
    if (!/^\d{10}$/.test(form.phone_number)) errs.phone_number = 'Enter a valid 10-digit number';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    setEditing(false);
    toast?.success('Profile updated!');
  };

  const stateName = STATES.find(s => s.code === form.state)?.name ?? form.state;

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-fade-up">

        <h1 className="text-2xl font-bold gradient-text mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left: Avatar + quick info ── */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)]
                            rounded-2xl p-6 text-center sticky top-24">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full
                              bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]
                              text-white font-black text-2xl mb-4 mx-auto shadow-glow">
                {user.first_name[0]}{user.last_name[0]}
              </div>
              <h2 className="font-bold text-lg text-[var(--color-textbase)]">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-sm text-[var(--color-muted)] mt-1">{user.email}</p>
              <span className={`inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full
                ${user.is_instructor
                  ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30'
                  : 'bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/30'}`}>
                {user.is_instructor ? 'Instructor' : 'Coordinator'}
              </span>

              <hr className="border-[var(--color-border)] my-5" />

              <div className="text-left space-y-3">
                {[
                  { label: 'Institute', value: user.profile.institute },
                  { label: 'Department', value: DEPARTMENT_LABELS[user.profile.department] ?? user.profile.department },
                  { label: 'State', value: stateName },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-xs text-[var(--color-muted)]">{item.label}</p>
                    <p className="text-sm font-medium text-[var(--color-textbase)] truncate">{item.value}</p>
                  </div>
                ))}
              </div>

              <button
                id="edit-profile-btn"
                onClick={() => setEditing(e => !e)}
                className="mt-6 w-full py-2.5 rounded-xl text-sm font-semibold border border-[var(--color-border)]
                           text-[var(--color-muted)] hover:bg-[var(--color-primary)] hover:text-white
                           hover:border-[var(--color-primary)] transition-all duration-200"
              >
                {editing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* ── Right: Edit form OR workshop history ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {editing ? (
              <form id="profile-form" onSubmit={handleSave}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
                <h2 className="font-semibold text-[var(--color-textbase)] mb-5">Edit Profile</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id="pf_first_name" label="First Name" value={form.first_name}
                    onChange={v => set('first_name', v)} error={errors.first_name} />
                  <Field id="pf_last_name"  label="Last Name"  value={form.last_name}
                    onChange={v => set('last_name', v)} error={errors.last_name} />
                  <Field id="pf_institute" label="Institution" value={form.institute}
                    onChange={v => set('institute', v)} error={errors.institute}
                    className="sm:col-span-2" />
                  <Field id="pf_phone" label="Phone Number" value={form.phone_number}
                    onChange={v => set('phone_number', v)} error={errors.phone_number} />
                  <Field id="pf_location" label="City / Location" value={form.location}
                    onChange={v => set('location', v)} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <SelectF id="pf_dept" label="Department" value={form.department}
                    onChange={v => set('department', v)}
                    options={Object.entries(DEPARTMENT_LABELS).map(([v,l]) => ({ value: v, label: l }))} />
                  <SelectF id="pf_state" label="State" value={form.state}
                    onChange={v => set('state', v)}
                    options={STATES.map(s => ({ value: s.code, label: s.name }))} />
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setEditing(false)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-[var(--color-border)]
                               text-[var(--color-muted)] hover:bg-[var(--color-surface2)] transition-all">
                    Cancel
                  </button>
                  <button id="profile-save" type="submit" disabled={loading}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white
                               bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]
                               hover:shadow-glow hover:-translate-y-0.5
                               disabled:opacity-60 transition-all duration-200">
                    {loading ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              /* Workshop history */
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
                <h2 className="font-semibold text-[var(--color-textbase)] mb-5">Workshop History</h2>
                {myWorkshops.length === 0 ? (
                  <p className="text-sm text-[var(--color-muted)] py-6 text-center">No workshops yet.</p>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
                    <table className="w-full text-sm">
                      <thead className="bg-[var(--color-surface2)]">
                        <tr>
                          {['Workshop','Date','Status'].map(h => (
                            <th key={h} className="text-left px-4 py-3 text-xs font-semibold
                                                   text-[var(--color-muted)] uppercase tracking-wider">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {myWorkshops.map((w, i) => (
                          <tr key={w.id}
                            className={`border-t border-[var(--color-border)] hover:bg-[var(--color-surface2)]
                                        transition-colors ${i % 2 === 0 ? '' : 'bg-[var(--color-surface2)]/30'}`}>
                            <td className="px-4 py-3 font-medium text-[var(--color-textbase)]">
                              {w.workshop_type.name}
                            </td>
                            <td className="px-4 py-3 text-[var(--color-muted)]">
                              {new Date(w.date).toLocaleDateString('en-IN')}
                            </td>
                            <td className="px-4 py-3">
                              <StatusBadge status={w.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, value, onChange, error, type='text', className='' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input id={id} type={type} value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full bg-[var(--color-surface2)] border rounded-xl px-4 py-2.5
                    text-[var(--color-textbase)] text-sm outline-none transition-all duration-200
                    focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20
                    ${error ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]'}`} />
      {error && <p className="text-xs text-[var(--color-danger)] mt-1">{error}</p>}
    </div>
  );
}

function SelectF({ id, label, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <select id={id} value={value} onChange={e => onChange(e.target.value)}
        className="w-full bg-[var(--color-surface2)] border border-[var(--color-border)] rounded-xl px-4 py-2.5
                   text-[var(--color-textbase)] text-sm appearance-none cursor-pointer outline-none
                   focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20
                   transition-all duration-200">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
