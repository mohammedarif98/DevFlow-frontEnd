import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUsersLine } from "react-icons/fa6";
import { TbCategoryPlus } from "react-icons/tb";
import { GrBlog } from "react-icons/gr";
import { AiOutlineDashboard } from "react-icons/ai";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`bg-white text-black w-64 border border-r-slate-300 h-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-center p-4">
        <Link to="/admin/dashboard" className="text-xl font-rubik-wet-paint">
          DevFlow Admin
        </Link>
      </div>
      <ul className="mt-10 space-y-[1px]">
        <li className="mb-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `gap-x-4 font-semibold block py-3 px-10 hover:bg-blue-100 flex items-center space-x-2 ${
                isActive ? "bg-blue-100 text-blue-900 border-r-2 border-r-blue-900" : ""
              }`
            }
          >
            <AiOutlineDashboard className="text-xl" />
            Dashboard
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `gap-x-4 font-normal block py-3 px-10 hover:bg-blue-100 flex items-center space-x-2 ${
                isActive ? "bg-blue-100 text-blue-900 border-r-2 border-r-blue-900" : ""
              }`
            }
          >
            <FaUsersLine className="text-xl" />
            Users
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="/admin/category"
            className={({ isActive }) =>
              `gap-x-4 font-normal block py-3 px-10 hover:bg-blue-100 flex items-center space-x-2 ${
                isActive ? "bg-blue-100 text-blue-900 border-r-2 border-r-blue-900" : ""
              }`
            }
          >
            <TbCategoryPlus className="text-xl" />
            Category
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="/admin/blogs"
            className={({ isActive }) =>
              `gap-x-4 font-normal block py-3 px-10 hover:bg-blue-100 flex items-center space-x-2 ${
                isActive ? "bg-blue-100 text-blue-900 border-r-2 border-r-blue-900" : ""
              }`
            }
          >
            <GrBlog className="text-xl" />
            Blogs
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;