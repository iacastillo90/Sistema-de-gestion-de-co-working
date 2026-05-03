import { useEffect } from 'react';

export function Toast({ toast, setToast }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, setToast]);

  if (!toast) return null;

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
      <div className={`alert alert-${toast.type} d-flex align-items-center gap-3 shadow-lg mb-0`} style={{ borderRadius: '14px', border: 'none', padding: '1rem 1.25rem' }}>
        <span className="fw-semibold">{toast.msg}</span>
        <button className="btn-close ms-auto" onClick={() => setToast(null)}></button>
      </div>
    </div>
  );
}
