
import { useState } from "react";
import Sidebar from "./Sidebar";
import { cn } from "../lib/utils";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 overflow-auto transition-all duration-300 ease-in-out",
          isSidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <div className="container px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
