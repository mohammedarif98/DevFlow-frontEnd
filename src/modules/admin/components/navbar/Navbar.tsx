import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { BsBell } from "react-icons/bs";
import { toast } from "react-toastify";
import profile_pic from "../../../../assets/images/pngtree-man-avatar-image-for-profile-png-image_13001882.png";
import { adminLogout } from "../../../../services/axios.PostMethods";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/slices/admin-slice/adminSlice";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((state: any) => state.admin);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  //* ------------ close the dropdown click outside ----------------
  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
        document.removeEventListener('mousedown', handleClickOutSide)
    };
  },[]);

  
  const handleLogout = async () => {
    try {
      await adminLogout();
      dispatch(logout());
      navigate("/admin/login");
    } catch (error) {
      const message = (error as Error).message.replace("Error: ", "");
      toast.error(message);
    }
  };

  return (
    <div
      className={`bg-[#ffffff] border border-b-slate-300 p-1 flex justify-between items-center transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "ml-64" : "ml-0"
      }`}
    >
      <button
        onClick={onToggleSidebar}
        className="bg-slate-200 p-1 hover:bg-gray-300 rounded-sm"
      >
        <AiOutlineMenuFold className="text-black hover:text-gray-700 text-xl font-thin" />
      </button>
      <div className="">
        <form className="">
          <input
            type="text"
            className="bg-gray-100 focus:bg-gray-200 mx-1 px-3 py-1 border-b-[1px] border-b-black md:w-96 rounded-sm focus:outline-none focus:ring-0 "
            placeholder="Enter here . . . ."
          />
        </form>
      </div>

      <div className="flex items-center space-x-4 mr-4 z-10" ref={ dropdownRef } >
        <button className="text-xl p-1 hover:bg-slate-300 rounded-full">
          <BsBell />
        </button>
        <div className="rounded-full" onClick={toggleDropdown}>
          <img
            src={profile_pic}
            alt="profile image"
            style={{ height: "45px" }}
          />
        </div>
        {isDropdownOpen && (
          <div className="absolute top-12 right-1 mt-2 w-52 p-2 bg-white border border-gray-200 rounded-sm shadow-md">
            <div className=" flex justify-start items-center border-b-[2px]">
                <img src={profile_pic} alt="pro-img" style={{ height:"50px" }}/>
                <p className="text-sm">{ `DevFlow ${admin?.username}` }</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              <MdLogout className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
