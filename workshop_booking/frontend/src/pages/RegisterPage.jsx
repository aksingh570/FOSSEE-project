import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { STATES } from '../data/mockData';

const DEPARTMENTS = [
  { value: 'computer engineering',           label: 'Computer Science' },
  { value: 'information technology',         label: 'Information Technology' },
  { value: 'civil engineering',              label: 'Civil Engineering' },
  { value: 'electrical engineering',         label: 'Electrical Engineering' },
  { value: 'mechanical engineering',         label: 'Mechanical Engineering' },
  { value: 'chemical engineering',           label: 'Chemical Engineering' },
  { value: 'aerospace engineering',          label: 'Aerospace Engineering' },
  { value: 'biosciences and bioengineering', label: 'Biosciences & BioEngineering' },
  { value: 'electronics',                    label: 'Electronics' },
  { value: 'energy science and engineering', label: 'Energy Science and Engineering' },
];

const POSITIONS = [
  { value: 'coordinator', label: 'Coordinator — I want to organise a workshop' },
  { value: 'instructor',  label: 'Instructor — I want to conduct a workshop' },
];

const SOURCES = [
  'FOSSEE website', 'Google', 'Social Media', 'From other College',
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', username: '',
    password: '', confirm_password: '',
    title: 'Mr', position: 'coordinator',
    institute: '', department: 'computer engineering',
    phone_number: '', location: '', state: 'IN-MH',
    how_did_you_hear_about_us: 'FOSSEE website',
  });
  const [errors, setErrors] = useState({});

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = 'Required';
    if (!form.last_name.trim())  e.last_name  = 'Required';
    if (!form.email.includes('@')) e.email     = 'Valid email required';
    if (!form.username.trim())   e.username   = 'Required';
    if (form.password.length < 8) e.password  = 'Minimum 8 characters';
    if (form.password !== form.confirm_password) e.confirm_password = 'Passwords do not match';
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.institute.trim()) e.institute = 'Required';
    if (!/^\d{10}$/.test(form.phone_number)) e.phone_number = 'Enter a valid 10-digit number';
    return e;
  };

  const next = () => {
    const e = validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(2);
  };

  const submit = async (e) => {
    e.preventDefault();
    const e2 = validateStep2();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    navigate('/activate');
  };

  const InputField = ({ id, label, field, type = 'text', required = true }) => (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">
        {label}{required && <span className="text-[var(--color-danger)] ml-0.5">*</span>}
      </label>
      <input
        id={id} type={type} value={form[field]}
        onChange={e => set(field, e.target.value)}
        className={`w-full bg-[var(--color-surface2)] border rounded-xl px-4 py-3
                    text-[var(--color-textbase)] text-sm placeholder:text-[var(--color-muted)]/60
                    outline-none transition-all duration-200
                    focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20
                    ${errors[field] ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]'}`}
        placeholder={label}
      />
      {errors[field] && <p className="text-xs text-[var(--color-danger)] mt-1">{errors[field]}</p>}
    </div>
  );

  const SelectField = ({ id, label, field, options }) => (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <select
        id={id} value={form[field]} onChange={e => set(field, e.target.value)}
        className="w-full bg-[var(--color-surface2)] border border-[var(--color-border)] rounded-xl px-4 py-3
                   text-[var(--color-textbase)] text-sm appearance-none cursor-pointer outline-none
                   focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20
                   transition-all duration-200"
      >
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
    </div>
  );

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20"
          style={{background:'radial-gradient(ellipse at 80% 20%, hsl(265 72% 20% / 0.3) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, hsl(221 83% 20% / 0.3) 0%, transparent 50%)'}}>

      <div className="w-full max-w-lg animate-fade-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl
                          bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]
                          shadow-glow mb-4">
            <span className="text-white font-black text-2xl">F</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-textbase)]">Create Account</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">Join the FOSSEE Workshop Portal</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-6 px-2">
          {[1,2].map(s => (
            <div key={s} className="flex items-center gap-3 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                transition-all duration-300
                ${step >= s
                  ? 'bg-[var(--color-primary)] text-white shadow-glow'
                  : 'bg-[var(--color-surface2)] text-[var(--color-muted)] border border-[var(--color-border)]'}`}>
                {s}
              </div>
              <span className={`text-xs font-medium ${step >= s ? 'text-[var(--color-textbase)]' : 'text-[var(--color-muted)]'}`}>
                {s === 1 ? 'Account Info' : 'Personal Info'}
              </span>
              {s < 2 && <div className={`flex-1 h-px ${step > s ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'} transition-colors`} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 shadow-2xl">
          {step === 1 ? (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField id="id_first_name" label="First Name" field="first_name" />
                <InputField id="id_last_name"  label="Last Name"  field="last_name" />
              </div>
              <InputField id="id_email"    label="Email"    field="email"    type="email" />
              <InputField id="id_username" label="Username" field="username" />
              <InputField id="id_password"         label="Password"         field="password"         type="password" />
              <InputField id="id_confirm_password" label="Confirm Password" field="confirm_password" type="password" />

              <SelectField id="id_position" label="I am a…" field="position" options={POSITIONS} />

              <button id="register-next" onClick={next}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white mt-2
                           bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]
                           hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200">
                Continue →
              </button>
            </div>
          ) : (
            <form id="register-form" onSubmit={submit} className="flex flex-col gap-4" noValidate>
              <SelectField id="id_title" label="Title" field="title"
                options={['Prof.','Dr.','Shri','Smt','Ku','Mr.','Mrs.','Ms.'].map(v=>({value:v,label:v}))} />
              <InputField id="id_institute" label="Institution / College" field="institute" />
              <SelectField id="id_department" label="Department" field="department" options={DEPARTMENTS} />
              <InputField id="id_phone_number" label="Phone Number (10 digits)" field="phone_number" />
              <InputField id="id_location" label="City / Location" field="location" required={false} />
              <SelectField id="id_state" label="State" field="state"
                options={STATES.map(s => ({ value: s.code, label: s.name }))} />
              <SelectField id="id_source" label="How did you hear about us?" field="how_did_you_hear_about_us"
                options={SOURCES.map(s => ({ value: s, label: s }))} />

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm border border-[var(--color-border)]
                             text-[var(--color-muted)] hover:bg-[var(--color-surface2)] transition-all duration-200">
                  ← Back
                </button>
                <button id="register-submit" type="submit" disabled={loading}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm text-white
                             bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]
                             hover:shadow-glow hover:-translate-y-0.5
                             disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                  {loading ? 'Creating…' : 'Create Account'}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-[var(--color-muted)] mt-6 pt-6 border-t border-[var(--color-border)]">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--color-primary)] font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
