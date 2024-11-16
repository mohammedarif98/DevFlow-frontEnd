import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';



const AdminProtectedRoute:React.FC = () => {
    const isAuthenticated = useSelector((state: any) => state.admin.isAuthenticated);

    return isAuthenticated ? (
        <Outlet /> 
      ) : (
        <Navigate to="/admin/login" />
    );
}

export default AdminProtectedRoute