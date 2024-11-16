import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';



const UserProtectedRoute:React.FC = () => {
    const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

    return isAuthenticated ? (
        <Outlet /> 
      ) : (
        <Navigate to="/login" />
    );
}

export default UserProtectedRoute;