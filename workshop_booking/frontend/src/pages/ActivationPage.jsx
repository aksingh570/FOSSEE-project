import { Link } from 'react-router-dom';

export default function ActivationPage({ status }) {
  // status: undefined = pending, "0" = verified, "1" = expired, "2" = already verified
  const states = {
    pending: {
      icon: '✉️',
      title: 'Check your inbox',
      body: 'We sent a verification link to your email address. Click it to activate your account.',
      cta: null,
    },
    '0': {
      icon: '✓',
      title: 'Email verified!',
      body: 'Your account has been activated successfully. You can now sign in.',
      cta: { label: 'Go to login', to: '/login' },
    },
    '1': {
      icon: '⚠',
      title: 'Link expired',
      body: 'Your activation link has expired. Please register again.',
      cta: { label: 'Register again', to: '/register' },
    },
    '2': {
      icon: '✓',
      title: 'Already verified',
      body: 'Your email is already verified. You can sign in now.',
      cta: { label: 'Go to login', to: '/login' },
    },
  };

  const key = status ?? 'pending';
  const { icon, title, body, cta } = states[key] ?? states.pending;
  const isSuccess = key === '0' || key === '2';
  const isError   = key === '1';

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center animate-fade-up">
        {/* Icon circle */}
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-4xl mb-6
          ${isSuccess ? 'bg-emerald-500/20 ring-2 ring-emerald-500/30'
          : isError   ? 'bg-amber-500/20  ring-2 ring-amber-500/30'
          :              'bg-blue-500/20   ring-2 ring-blue-500/30'}`}>
          {icon}
        </div>

        <h1 className="text-2xl font-bold text-[var(--color-textbase)] mb-3">{title}</h1>
        <p className="text-sm text-[var(--color-muted)] max-w-xs mx-auto leading-relaxed">{body}</p>

        {cta && (
          <Link to={cta.to}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl font-semibold text-sm text-white
                       bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]
                       hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200">
            {cta.label}
          </Link>
        )}

        {key === 'pending' && (
          <p className="text-xs text-[var(--color-muted)] mt-8">
            Didn't get it? Check spam, or{' '}
            <button className="text-[var(--color-primary)] hover:underline">resend email</button>.
          </p>
        )}
      </div>
    </main>
  );
}
