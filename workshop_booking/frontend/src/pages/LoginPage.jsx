import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
  const [form, setForm]     = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required';
    if (!form.password)        e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    // Simulate auth delay
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    onLogin(form.username);
  };

  const Field = ({ id, label, type = 'text', field }) => (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={form[field]}
        autoComplete={type === 'password' ? 'current-password' : 'username'}
        onChange={e => { setForm(f => ({ ...f, [field]: e.target.value })); setErrors(er => ({ ...er, [field]: '' })); }}
        className={`w-full bg-[var(--color-surface2)] border rounded-xl px-4 py-3
                    text-[var(--color-textbase)] text-sm placeholder:text-[var(--color-muted)]
                    outline-none transition-all duration-200
                    focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20
                    ${errors[field] ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]'}`}
        placeholder={label}
      />
      {errors[field] && <p className="text-xs text-[var(--color-danger)] mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16"
          style={{background:'radial-gradient(ellipse at 20% 30%, hsl(221 83% 20% / 0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, hsl(265 72% 20% / 0.3) 0%, transparent 55%)'}}>

      <div className="w-full max-w-md animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl
                          bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]
                          shadow-glow mb-4">
            <span className="text-white font-black text-2xl">F</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-textbase)]">Welcome back</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">Sign in to FOSSEE Workshop Portal</p>
        </div>

        {/* Card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)]
                        rounded-3xl p-8 shadow-2xl">
          <form id="login-form" onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <Field id="id_username" label="Username" field="username" />
            <Field id="id_password" label="Password" type="password" field="password" />

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white
                         bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]
                         hover:shadow-glow hover:-translate-y-0.5
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition-all duration-200 mt-1"
            >
              {loading
                ? <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin-slow" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                    </svg>
                    Signing in…
                  </span>
                : 'Sign in'
              }
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex flex-col gap-2 text-sm text-center">
            <Link to="/register" className="text-[var(--color-primary)] hover:underline font-medium">
              New here? Create an account
            </Link>
            <Link to="/forgot-password" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
