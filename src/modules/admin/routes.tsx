import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/Login/LoginPage';
import { useState } from 'react';



const AdminRoutes: React.FC = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const showNavbarAndSidebar = location.pathname !== '/admin/login';
  
    return (
      <div className="flex flex-col h-screen bg-slate-200">
        {showNavbarAndSidebar && (
          <>
            <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar isOpen={isSidebarOpen} />
              <div className={`flex-1 p-6 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <Routes>
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/dashboard' element={<DashboardPage />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };


export default AdminRoutes