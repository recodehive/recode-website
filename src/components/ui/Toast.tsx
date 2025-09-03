import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastIcon = ({ type }: { type: Toast["type"] }) => {
  const iconClass = "w-5 h-5";

  switch (type) {
    case "success":
      return <CheckCircle className={`${iconClass} text-green-500`} />;
    case "error":
      return <XCircle className={`${iconClass} text-red-500`} />;
    case "warning":
      return <AlertCircle className={`${iconClass} text-yellow-500`} />;
    case "info":
      return <Info className={`${iconClass} text-blue-500`} />;
    default:
      return <Info className={`${iconClass} text-gray-500`} />;
  }
};

const ToastComponent: React.FC<{
  toast: Toast;
  onRemove: (id: string) => void;
}> = ({ toast, onRemove }) => {
  const bgColors = {
    success:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    warning:
      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className={`
        p-4 rounded-lg border shadow-lg max-w-md w-full
        ${bgColors[toast.type]}
      `}
    >
      <div className="flex items-start">
        <ToastIcon type={toast.type} />
        <div className="ml-3 flex-1">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastComponent
              key={toast.id}
              toast={toast}
              onRemove={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
