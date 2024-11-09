import React from 'react';
import { AiOutlineMenuFold } from "react-icons/ai";
import { toast } from 'react-toastify';
import { adminLogout } from '../../../../services/axios.PostMethods';
import { useNavigate } from 'react-router-dom';


interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  
  const navigate = useNavigate();

  //*---------------- api call -----------------
  const handleLogout = async() => {
    try{
      await adminLogout();
      navigate('/admin/login')
    }catch(error){
      const message = (error as Error).message.replace("Error: ", "");
      toast.error(message);
    }
  }

  return (
    <div className={`bg-slate-100 border border-b-slate-300 p-2 flex justify-between items-center transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <button onClick={onToggleSidebar} className="bg-slate-200 p-1 hover:bg-gray-300 rounded-sm">
        <AiOutlineMenuFold className="text-black hover:text-gray-700 text-xl font-thin" />
      </button>
      <div className=''>
        <form className=''>
          <input type="text" className='bg-gray-100 focus:bg-gray-200 mx-1 px-3 py-1 border-b-[1px] border-b-black md:w-96 rounded-sm focus:outline-none focus:ring-0 ' placeholder='Enter here ......' />
        </form>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={ handleLogout } className="bg-black text-white px-4 py-1 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;