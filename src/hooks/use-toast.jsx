
import { useState, useEffect, createContext, useContext } from "react";
import "./toast.css";

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
      <div className="toast-container">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`toast ${toast.type} ${toast.open ? 'toast-animate-in' : 'toast-animate-out'}`}
          >
            {toast.title && <div className="toast-title">{toast.title}</div>}
            {toast.description && <div className="toast-description">{toast.description}</div>}
            <button 
              onClick={() => dismiss(toast.id)}
              className="toast-close-button"
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
  toastElement.className = `toast ${props.type || 'default'} toast-fade-in`;
  toastElement.style.position = "fixed";
  toastElement.style.bottom = "1rem";
  toastElement.style.right = "1rem";
  toastElement.style.zIndex = "50";
  
  if (props.title) {
    const titleElement = document.createElement('div');
    titleElement.className = "toast-title";
    titleElement.textContent = props.title;
    toastElement.appendChild(titleElement);
  }
  
  if (props.description) {
    const descElement = document.createElement('div');
    descElement.className = "toast-description";
    descElement.textContent = props.description;
    toastElement.appendChild(descElement);
  }
  
  document.body.appendChild(toastElement);
  
  // Remove after duration
  setTimeout(() => {
    toastElement.classList.add('toast-fade-out');
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
