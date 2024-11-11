import React from 'react';
import { AiOutlineMenuFold } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { toast } from 'react-toastify';
import { FaRegUser } from "react-icons/fa";
import { adminLogout } from '../../../../services/axios.PostMethods';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../redux/slices/admin-slice/adminSlice';

interface NavbarProps {
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state: any) => state.admin);

    const handleLogout = async () => {
        try {
            await adminLogout();
            dispatch(logout()); 
            navigate('/admin/login');
        } catch (error) {
            const message = (error as Error).message.replace("Error: ", "");
            toast.error(message);
        }
    };

    return (
        <div className={`bg-white border border-b-slate-300 p-2 flex justify-between items-center transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <button onClick={onToggleSidebar} className="bg-slate-200 p-1 hover:bg-gray-300 rounded-sm">
                <AiOutlineMenuFold className="text-black hover:text-gray-700 text-xl font-thin" />
            </button>
            <div className=''>
                <form className=''>
                    <input type="text" className='bg-gray-100 focus:bg-gray-200 mx-1 px-3 py-1 border-b-[1px] border-b-black md:w-96 rounded-sm focus:outline-none focus:ring-0 ' placeholder='Enter here ......' />
                </form>
            </div>
            
            <div className="flex items-center space-x-4 mr-4">
                <button className='text-xl p-1 hover:bg-slate-300 rounded-full'><BsBell /></button>
                <button onClick={handleLogout} className="text-xl p-2 mr-36 bg-emerald-700 hover:bg-emerald-600 rounded-full"><FaRegUser className='' /></button>
            </div>
          
        </div>
    );
};

export default Navbar;