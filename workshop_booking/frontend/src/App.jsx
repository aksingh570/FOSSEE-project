import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar   from './components/Navbar';
import Footer   from './components/Footer';
import { useToast, ToastContainer } from './components/Toast';

import LoginPage             from './pages/LoginPage';
import RegisterPage          from './pages/RegisterPage';
import ActivationPage        from './pages/ActivationPage';
import CoordinatorDashboard  from './pages/CoordinatorDashboard';
import InstructorDashboard   from './pages/InstructorDashboard';
import WorkshopTypeList      from './pages/WorkshopTypeList';
import WorkshopTypeDetails   from './pages/WorkshopTypeDetails';
import ProposeWorkshop       from './pages/ProposeWorkshop';
import ProfilePage           from './pages/ProfilePage';
import WorkshopDetails       from './pages/WorkshopDetails';

import { CURRENT_USER, INSTRUCTOR_USER } from './data/mockData';

export default function App() {
  // Demo: toggle between coordinator / instructor with query param ?role=instructor
  const params = new URLSearchParams(window.location.search);
  const defaultUser = params.get('role') === 'instructor' ? INSTRUCTOR_USER : CURRENT_USER;

  const [user, setUser] = useState(null); // null = logged out
  const { toasts, toast } = useToast();

  const handleLogin = (username) => {
    // Mock: log in as instructor if username contains "instructor"
    const u = username.toLowerCase().includes('instructor') ? INSTRUCTOR_USER : defaultUser;
    setUser(u);
  };

  const handleLogout = () => {
    setUser(null);
    toast.info('You have been signed out.');
  };

  // Shared props
  const shared = { user, toast };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} onLogout={handleLogout} />

        <main className="flex-1">
          <Routes>
            {/* Public */}
            <Route path="/login"    element={user ? <Navigate to={user.is_instructor ? '/dashboard' : '/status'} /> : <LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
            <Route path="/activate" element={<ActivationPage />} />
            <Route path="/activate/:status" element={<ActivationPage />} />

            {/* Workshop types — public */}
            <Route path="/types"     element={<WorkshopTypeList      {...shared} />} />
            <Route path="/types/:id" element={<WorkshopTypeDetails   {...shared} />} />

            {/* Protected — coordinator */}
            <Route path="/status"  element={user && !user.is_instructor ? <CoordinatorDashboard {...shared} /> : <Navigate to="/login" />} />
            <Route path="/propose" element={user && !user.is_instructor ? <ProposeWorkshop      {...shared} /> : <Navigate to="/login" />} />

            {/* Protected — instructor */}
            <Route path="/dashboard" element={user?.is_instructor ? <InstructorDashboard {...shared} /> : <Navigate to="/login" />} />

            {/* Both roles */}
            <Route path="/details/:id" element={user ? <WorkshopDetails {...shared} /> : <Navigate to="/login" />} />
            <Route path="/profile"     element={user ? <ProfilePage     {...shared} /> : <Navigate to="/login" />} />

            {/* Root redirect */}
            <Route path="/"  element={
              user
                ? <Navigate to={user.is_instructor ? '/dashboard' : '/status'} />
                : <Navigate to="/login" />
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <ToastContainer toasts={toasts} />
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="text-center animate-fade-up">
        <p className="text-8xl font-black text-[var(--color-border)] mb-4">404</p>
        <h1 className="text-2xl font-bold text-[var(--color-textbase)] mb-2">Page not found</h1>
        <p className="text-sm text-[var(--color-muted)] mb-6">
          The page you're looking for doesn't exist.
        </p>
        <a href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                     bg-[var(--color-primary)] hover:bg-[var(--color-primary-dk)] transition-all duration-200">
          ← Go home
        </a>
      </div>
    </div>
  );
}
