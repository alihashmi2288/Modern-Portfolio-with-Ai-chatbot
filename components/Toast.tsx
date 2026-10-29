'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  text: string;
}

interface ToastContextType {
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [exitingIds, setExitingIds] = useState<Set<string>>(new Set());
  const timerMapRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeToast = useCallback((id: string) => {
    // Prevent double dismissal
    setExitingIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    // Clear auto-dismiss timer if running
    if (timerMapRef.current.has(id)) {
      clearTimeout(timerMapRef.current.get(id)!);
      timerMapRef.current.delete(id);
    }

    // Wait for the 160ms asymmetric slide/fade-out animation before DOM removal
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      setExitingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 160);
  }, []);

  const showToast = useCallback((text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, text }]);

    const timer = setTimeout(() => {
      removeToast(id);
    }, 3500);

    timerMapRef.current.set(id, timer);
  }, [removeToast]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      timerMapRef.current.forEach((t) => clearTimeout(t));
      timerMapRef.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div 
        aria-live="polite" 
        className="fixed top-20 right-6 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none"
      >
        {toasts.map((toast) => {
          const isExiting = exitingIds.has(toast.id);
          return (
            <div
              key={toast.id}
              role="status"
              data-exiting={isExiting ? 'true' : undefined}
              className="toast-item pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-[8px] border border-[#ebebeb] bg-white text-[#171717] shadow-floating"
            >
              <div className="flex items-center gap-2.5 text-sm font-medium">
                {toast.type === 'success' && (
                  <svg className="w-4 h-4 text-[#0070f3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {toast.type === 'error' && (
                  <svg className="w-4 h-4 text-[#ee0000] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {toast.type === 'info' && (
                  <svg className="w-4 h-4 text-[#0070f3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="text-xs sm:text-sm">{toast.text}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[#8f8f8f] hover:text-[#171717] text-base leading-none p-1 transition-[color,transform] duration-160 ease-out-strong active:scale-[0.97] cursor-pointer"
                aria-label="Close notification"
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
