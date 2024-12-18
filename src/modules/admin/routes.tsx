import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import DashboardPage from './pages/dashboard/DashboardPage';
import LoginPage from './pages/login/LoginPage';
import { useState } from 'react';
import UserListPage from './pages/userProfiles/UserListPage';
import AdminProtectedRoute from './AdminProtectedRoute';
import CategoryPage from './pages/blogCategory/CategoryPage';
import BlogsPage from './pages/blog/BlogsPage';
import BlogDetailPage from './pages/blog/BlogDetailPage';


const AdminRoutes: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showNavbarAndSidebar = location.pathname !== '/admin/login';

  return (
    <div className="flex flex-col min-h-[918px] bg-[#e7edff]">
      {showNavbarAndSidebar && (
        <>
          <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`flex-1 p-6 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
              <Routes>
                <Route element={<AdminProtectedRoute/>}>
                  <Route path='/dashboard' element={<DashboardPage />}/>
                  <Route path='/user-list' element={<UserListPage/>}/>
                  <Route path='/blog-category' element={<CategoryPage/>}/>
                  <Route path='/list-blogs' element={<BlogsPage/>} />
                  <Route path='/blog-detailPage/:blogId' element={<BlogDetailPage/>} />
                </Route>
              </Routes>
            </div>
          </div>
        </>
      )}
      { !showNavbarAndSidebar &&(
        <Routes>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      )}
    </div>
  );
};



export default AdminRoutes