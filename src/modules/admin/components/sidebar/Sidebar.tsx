import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsersLine } from "react-icons/fa6";
import { TbCategoryPlus } from "react-icons/tb";
import { GrBlog } from "react-icons/gr";
import { AiOutlineDashboard } from "react-icons/ai";



interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`bg-slate-100 text-black w-64 border border-r-slate-300 h-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className='flex justify-center p-4'>
        <Link to="/admin/dashboard" className="text-2xl font-rubik-wet-paint">DevFlow</Link>
      </div>
      <ul className="mt-10 space-y-1">
        <li className='mb-4'>
          <Link to="/admin/dashboard" className="gap-x-4 font-normal block py-3 px-10 hover:bg-black hover:text-white flex items-center space-x-2"><AiOutlineDashboard className='text-xl'/>Dashboard</Link>
        </li>
        <li className=''>
          <Link to="" className="gap-x-4 font-normal block py-3 px-10 hover:bg-black hover:text-white flex items-center space-x-2"><FaUsersLine className='text-xl'/>Users</Link>
        </li>
        <li className=''>
          <Link to="" className="gap-x-4 font-normal block py-3 px-10 hover:bg-black hover:text-white flex items-center space-x-2"><TbCategoryPlus className='text-xl'/>Category</Link>
        </li>
        <li className=''>
          <Link to="" className="gap-x-4 font-normal block py-3 px-10 hover:bg-black hover:text-white flex items-center space-x-2"><GrBlog className='text-xl'/>Blogs</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;