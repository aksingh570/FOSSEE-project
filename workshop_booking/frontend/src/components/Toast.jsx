import { useState, useEffect } from 'react';

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const add = (message, type = 'info') => {
    const id = ++toastId;
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };

  return { toasts, toast: { success: m => add(m,'success'), error: m => add(m,'error'), info: m => add(m,'info') } };
}

export function ToastContainer({ toasts }) {
  const typeMap = {
    success: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    error:   'bg-red-500/20    border-red-500/40    text-red-300',
    info:    'bg-blue-500/20   border-blue-500/40   text-blue-300',
  };
  const iconMap = {
    success: '✓', error: '✕', info: 'ℹ',
  };

  return (
    <div className="fixed bottom-6 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border
                      backdrop-blur-md shadow-xl text-sm font-medium
                      animate-fade-up pointer-events-auto
                      ${typeMap[t.type] ?? typeMap.info}`}
        >
          <span className="font-bold">{iconMap[t.type]}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
