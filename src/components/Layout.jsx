
import { useState, useEffect } from "react";
import Sidebar from "./SimpleSidebar";
import { useIsMobile } from "../hooks/use-mobile";
import "./Layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  const getMainClassName = () => {
    let className = "layout-main";
    
    if (isMobile) {
      className += " mobile";
      if (isSidebarOpen) {
        className += " sidebar-open";
      }
    } else {
      className += isSidebarOpen ? " sidebar-open" : " sidebar-collapsed";
    }
    
    return className;
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content */}
      <main 
        className={getMainClassName()}
        onClick={() => isMobile && isSidebarOpen && setIsSidebarOpen(false)}
      >
        <header className="layout-header">
          <div className="header-content">
            {isMobile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSidebarOpen(!isSidebarOpen);
                }}
                className="menu-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            )}
            <div className="app-title">
              <span>Pocket Finance</span>
            </div>
          </div>
        </header>
        <div className="content-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
