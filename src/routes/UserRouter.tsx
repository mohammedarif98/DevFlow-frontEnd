// import React from 'react'
import Login from '../pages/user-pages/Login';
import SignUp from '../pages/user-pages/SignUp';
import Header from '../components/user-components/Header/Header';
// import Footer from '../components/user-components/Footer/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/user-pages/Home';



const UserRouter = () => {

    const location = useLocation();
    const showNavbar = !['/login','/signup'].includes(location.pathname);

  return (
    <>
        { showNavbar && <Header/> }
            <Routes>
                <Route path='/login' element={ <Login /> } />
                <Route path='/signup' element= { <SignUp /> } />
                <Route path='/' element= { <Home /> } />
            </Routes>
    </>
  )
}



export default UserRouter