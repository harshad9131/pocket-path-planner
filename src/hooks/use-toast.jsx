
import { useState, useEffect, createContext, useContext } from "react";

const ToastContext = createContext({
  toast: () => {},
  dismiss: () => {},
  toasts: []
});

// Toast provider component
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  
  const toast = ({ title, description, type = "default", duration = 5000 }) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      title,
      description,
      type,
      open: true
    };
    
    setToasts(prev => [newToast, ...prev]);
    
    if (duration !== Infinity) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }
    
    return { id, dismiss: () => dismiss(id) };
  };
  
  const dismiss = (toastId) => {
    setToasts(prev => prev.map(t => 
      t.id === toastId ? { ...t, open: false } : t
    ));
    
    // Remove from DOM after animation
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 300);
  };
  
  return (
    <ToastContext.Provider value={{ toast, dismiss, toasts }}>
      {children}
      <div className="toast-container fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`toast p-4 rounded-lg shadow-lg transition-all transform 
              ${toast.open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              ${toast.type === 'success' ? 'bg-green-500 text-white' : ''}
              ${toast.type === 'error' ? 'bg-red-500 text-white' : ''}
              ${toast.type === 'warning' ? 'bg-yellow-500 text-white' : ''}
              ${toast.type === 'info' ? 'bg-blue-500 text-white' : ''}
              ${toast.type === 'default' ? 'bg-white' : ''}
            `}
          >
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            {toast.description && <div className="text-sm">{toast.description}</div>}
            <button 
              onClick={() => dismiss(toast.id)}
              className="absolute top-2 right-2 text-sm font-bold"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Hook to use the toast functionality
export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return context;
}

// Standalone function to show a toast without using the hook
export const toast = (props) => {
  // Show a warning in the console when used outside the context
  console.warn("Toast used outside provider. Create a ToastProvider at the root of your app for best results.");
  
  // Create a simple DOM element for the toast
  const toastElement = document.createElement('div');
  toastElement.className = `fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg bg-white animate-in fade-in`;
  
  if (props.title) {
    const titleElement = document.createElement('div');
    titleElement.className = "font-semibold";
    titleElement.textContent = props.title;
    toastElement.appendChild(titleElement);
  }
  
  if (props.description) {
    const descElement = document.createElement('div');
    descElement.className = "text-sm";
    descElement.textContent = props.description;
    toastElement.appendChild(descElement);
  }
  
  document.body.appendChild(toastElement);
  
  // Remove after duration
  setTimeout(() => {
    toastElement.classList.add('animate-out', 'fade-out');
    setTimeout(() => {
      document.body.removeChild(toastElement);
    }, 300);
  }, props.duration || 5000);
  
  // Return mock functions
  return {
    id: Date.now().toString(),
    dismiss: () => {
      document.body.removeChild(toastElement);
    },
    update: () => {}
  };
};
