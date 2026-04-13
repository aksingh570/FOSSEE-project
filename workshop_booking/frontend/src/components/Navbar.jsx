import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
      ${scrolled
        ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-700/60'
        : 'bg-slate-900/80 backdrop-blur-sm'}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600
                            flex items-center justify-center font-black text-white text-sm shadow-md">
              F
            </div>
            <span className="font-bold text-slate-100 text-[0.95rem] tracking-tight">
              FOSSEE Workshops
            </span>
          </Link>

          {/* Desktop Nav Links — centre */}
          <nav className="hidden md:flex items-center gap-1">
            <NavPill to="/types" label="Workshop Types" path={location.pathname} />
            {user && (
              user.is_instructor
                ? <NavPill to="/dashboard" label="Dashboard" path={location.pathname} />
                : <>
                    <NavPill to="/status"  label="My Workshops"    path={location.pathname} />
                    <NavPill to="/propose" label="Propose Workshop" path={location.pathname} />
                  </>
            )}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <UserDropdown user={user} onLogout={onLogout} />
            ) : (
              <>
                <Link to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300
                             hover:text-slate-100 hover:bg-slate-800 transition-colors duration-150">
                  Sign in
                </Link>
                <Link to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white
                             bg-blue-600 hover:bg-blue-500 transition-colors duration-150 shadow-sm">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation"
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-lg
                       text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300
              ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300
              ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300
              ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300
        ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="border-t border-slate-700/60 bg-slate-900 px-4 py-3 flex flex-col gap-1">
          <MobileLink to="/types"  label="Workshop Types" />
          {user ? (
            user.is_instructor
              ? <MobileLink to="/dashboard" label="Dashboard" />
              : <>
                  <MobileLink to="/status"  label="My Workshops" />
                  <MobileLink to="/propose" label="Propose Workshop" />
                </>
          ) : null}
          {user
            ? <>
                <MobileLink to="/profile" label="Profile" />
                <button onClick={onLogout}
                  className="text-left w-full px-3 py-2.5 rounded-lg text-sm font-medium
                             text-red-400 hover:bg-red-900/20 transition-colors">
                  Sign out
                </button>
              </>
            : <>
                <MobileLink to="/login"    label="Sign in" />
                <MobileLink to="/register" label="Sign up" />
              </>
          }
        </div>
      </div>
    </header>
  );
}

function NavPill({ to, label, path }) {
  const active = path === to || (to !== '/' && path.startsWith(to));
  return (
    <Link to={to}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150
        ${active
          ? 'text-blue-400 bg-blue-900/30'
          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'}`}>
      {label}
    </Link>
  );
}

function MobileLink({ to, label }) {
  return (
    <Link to={to}
      className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200
                 hover:bg-slate-800 transition-colors">
      {label}
    </Link>
  );
}

function UserDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const initials = `${user.first_name[0]}${user.last_name[0]}`;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        id="user-menu-btn"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800
                   transition-colors duration-150"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600
                        flex items-center justify-center text-white font-bold text-xs shrink-0">
          {initials}
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-slate-100 leading-none">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {user.is_instructor ? 'Instructor' : 'Coordinator'}
          </p>
        </div>
        <svg
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-52
                        bg-slate-800 border border-slate-700
                        rounded-xl shadow-2xl shadow-black/50 py-1 z-50
                        fade-in">
          <div className="px-4 py-3 border-b border-slate-700/80">
            <p className="text-sm font-semibold text-slate-100">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-xs text-slate-400 mt-0.5 truncate">{user.email}</p>
          </div>
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300
                       hover:bg-slate-700 hover:text-slate-100 transition-colors">
            <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            My Profile
          </Link>
          <button
            id="logout-btn"
            onClick={() => { setOpen(false); onLogout(); }}
            className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm
                       text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors">
            <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
