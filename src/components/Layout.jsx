
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { cn } from "../lib/utils";
import { useIsMobile } from "../hooks/use-mobile";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);
  
  const handleSignOut = async () => {
    await signOut();
    toast.success("Successfully signed out");
    navigate("/auth");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 overflow-auto transition-all duration-300 ease-in-out",
          isMobile ? (isSidebarOpen ? "ml-0 opacity-30" : "ml-0") : (isSidebarOpen ? "ml-64" : "ml-16")
        )}
        onClick={() => isMobile && isSidebarOpen && setIsSidebarOpen(false)}
      >
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex justify-between items-center px-4 py-2">
            {isMobile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSidebarOpen(!isSidebarOpen);
                }}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            )}
            <div className="ml-auto flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="p-2 text-sm text-gray-600 hover:text-primary"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>
        <div className="container px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
