import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUsersLine } from "react-icons/fa6";
import { TbCategoryPlus } from "react-icons/tb";
import { GrBlog } from "react-icons/gr";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoListOutline } from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);

  return (
    <div
      className={`bg-[#ffffff] text-black w-64 border border-r-slate-300 h-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out ${
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
              `gap-x-4 font-semibold block py-3 px-5 hover:bg-blue-100 flex items-center space-x-2 ${
                isActive ? "bg-blue-200 text-blue-900 border-r-2 border-r-blue-900" : ""
              }`
            }
          >
            <AiOutlineDashboard className="text-xl" />
            Dashboard
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="/admin/user-list"
            className={({ isActive }) =>
              `gap-x-4 font-normal block py-3 px-5 hover:bg-blue-100 flex items-center space-x-2 ${
                isActive ? "bg-blue-200 text-blue-900 border-r-2 border-r-blue-900" : ""
              }`
            }
          >
            <FaUsersLine className="text-xl" />
            Profile Management
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="/admin/blog-category"
            className={({ isActive }) =>
              `gap-x-4 font-normal block py-3 px-5 hover:bg-blue-100 flex items-center space-x-2 ${
                isActive ? "bg-blue-200 text-blue-900 border-r-2 border-r-blue-900" : ""
              }`
            }
          >
            <TbCategoryPlus className="text-xl" />
            Category Management
          </NavLink>
        </li>

        <li>
          <div
            className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-blue-100"
            onClick={() => setIsBlogDropdownOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-x-4">
              <GrBlog className="text-xl" />
              <span>Blog Management</span>
            </div>
            {isBlogDropdownOpen ? (
              <MdKeyboardArrowUp className="text-lg" />
            ) : (
              <MdKeyboardArrowDown className="text-lg" />
            )}
          </div>
          {isBlogDropdownOpen && (
            <ul className="ml-8 space-y-1 px-5">
              {/* <li>
                <NavLink
                  to="/admin/add-blog"
                  className={({ isActive }) =>
                    `flex py-2 px-3 hover:bg-blue-100 gap-x-2 justify-start items-center relative ${
                      isActive ? "bg-blue-200 text-blue-900 border-l-2 border-l-blue-900 child-active" : ""
                    }`
                  }
                >
                  <IoIosAddCircleOutline className="mt-1 text-xl text-black" />
                  Add Blogs
                </NavLink>
              </li> */}
              <li className="">
                <NavLink
                  to="/admin/list-blogs"
                  className={({ isActive }) =>
                    `flex py-2 px-3 hover:bg-blue-100 gap-x-2 justify-start items-center relative ${
                      isActive ? "bg-blue-200 text-blue-900 border-l-2 border-l-blue-900 child-active" : ""
                    }`
                  }
                >
                  <IoListOutline className=" text-xl text-black"/>
                  List Blogs
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* Inline Styles for Arrows */}
      <style>{`
        .child-active {
          position: relative;
        }
        .child-active::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -10px; /* Adjust to align with parent arrow */
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 6px solid #1e40af; /* Arrowhead color */
        }
      `}</style>
    </div>
  );
};

export default Sidebar;