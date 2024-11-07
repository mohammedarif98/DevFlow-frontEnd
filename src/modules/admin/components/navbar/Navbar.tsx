import React from 'react';
import { AiOutlineMenuFold } from "react-icons/ai";


interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  return (
    <div className={`bg-slate-100 border border-b-slate-300 p-3 flex justify-between items-center transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <button onClick={onToggleSidebar} className="bg-slate-200 p-2 hover:bg-gray-300 rounded-sm">
        <AiOutlineMenuFold className="text-black hover:text-gray-700 text-xl font-thin" />
      </button>
      <h1 className="text-xl text-black font-bold">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span>Welcome, Admin</span>
        <button className="bg-black text-white px-4 py-1 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;