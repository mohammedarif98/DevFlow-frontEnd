import React, { useEffect, useRef, useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { BsChatSquareTextFill } from "react-icons/bs";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../../utils/configs/user-axios/axios.PostMethods";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/user-slice/userSlice";



const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const prevScrollPos = useRef(window.pageYOffset);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };


  //*---------------- Close the dropdown when clicking outside ----------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  //*---------------- Hide header on scroll down, show on scroll up -----------------------
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(prevScrollPos.current > currentScrollPos || currentScrollPos < 10);
      prevScrollPos.current = currentScrollPos;

      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
      
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen]);


  const handleLogout = async () => {
    try {
      await userLogout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      const message = (error as Error).message.replace("Error: ", "");
      toast.error(message);
    }
  };


  return (
    <div
      className={`fixed top-0 left-0 w-full bg-slate-50 flex items-center justify-between py-2 px-4 md:px-8 border-b border-gray-200 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/*--------- Logo Section -----------*/}
      <div className="flex items-center">
        <Link to="/">
          <span className="font-rubik-wet-paint text-lg md:text-2xl">DevFlow</span>
        </Link>
      </div>

      {/*--------- Search Bar Section -----------*/}
      <div className="flex-grow mx-10 md:ml-12 md:mr-2 lg:ml-12 lg:mr-2">
        <input
          type="text"
          placeholder="Search. . . . ."
          className="w-full md:w-56 lg:w-80 border-b-[1px] border-slate-600 py-1 px-2 focus:outline-none focus:ring-0"
        />
      </div>

      {/*--------- Hamburger Menu Icon ---------*/}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <HiOutlineX className="text-2xl text-gray-700" />
          ) : (
            <HiOutlineMenu className="text-2xl text-gray-700" />
          )}
        </button>
      </div>

      {/*--------- User Profile Section (Desktop) --------- */}
      <div className="hidden md:flex items-center space-x-4 md:space-x-6 lg:space-x-6">
        {user && (
          <>
            <button className="rounded-full hover:bg-gray-200 p-2 transition-colors">
              <Link to="/writeBlog">
                <HiOutlinePencilSquare className="text-2xl text-black" />
              </Link>
            </button>
            <button className="rounded-full hover:bg-gray-200 p-2 transition-colors">
              <Link to="/notification">
                <CiBellOn className="text-2xl text-black" />
              </Link>
            </button>
            <button className="rounded-full hover:bg-gray-200 p-2 transition-colors">
              <Link to="/chat">
                <BsChatSquareTextFill className="text-xl text-black" />
              </Link>
            </button>
            {/*---------- Dropdown Menu ------------*/}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="rounded-full p-2 bg-green-700 hover:bg-green-900 transition-colors"
              >
                <FaRegUser className="text-xl text-white" />
              </button>
              {/*-------- dropdown menu button --------- */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-20">
                  <button className="block w-full text-sm text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile
                  </button>
                  <button className="block w-full text-sm text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Settings
                  </button>
                  <button className="block w-full text-sm text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Apply for author verification
                  </button>
                  <button
                    className="block w-full text-sm text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <Link to="">Logout</Link>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {!user && (
          <>
            <button className="">
              <Link to="/" className="text-black font-semibold">About</Link>
            </button>
            <button className="rounded bg-black text-white py-1 px-6">
              <Link to="/login" className="font-semibold">Login</Link>
            </button>
          </>
        )}
      </div>

      {/*--------- Mobile Menu --------- */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-slate-50 shadow-lg md:hidden">
          <div className="flex flex-col items-start space-y-1 px-2 py-6">
            {user && (
              <>
                <button className="flex items-left">
                  <Link to="/writeBlog">
                    <span className="text-sm text-black">Post Blog</span>
                  </Link>
                </button>
                <button className="flex items-left">
                  <Link to="/notification">
                    <span className="text-sm text-black">Notification</span>
                  </Link>
                </button>
                <button className="flex items-left">
                  <Link to="/chat">
                    <span className="text-sm text-black">Chat</span>
                  </Link>
                </button>
              </>
            )}
            {user ? (
              <button className="flex items-left">
                <Link to="" onClick={handleLogout}>
                  <span className="text-sm text-black">Logout</span>
                </Link>
              </button>
            ) : (
              <button className="flex items-left">
                <Link to="/login">
                  <span className="text-sm text-black">Login</span>
                </Link>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
