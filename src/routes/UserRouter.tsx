import Header from '../components/user-components/Header/Header';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/user-pages/HomePage';
import SignUpPage from '../pages/user-pages/SignUpPage';
import LoginPage from '../pages/user-pages/LoginPage';



const UserRouter = () => {

    const location = useLocation();
    const showNavbar = !['/login','/signup'].includes(location.pathname);

  return (
    <>
        { showNavbar && <Header/> }
            <Routes>
                <Route path='/signup' element= { <SignUpPage /> } />
                <Route path='/login' element={ <LoginPage /> } />
                <Route path='/' element= { <Home /> } />
            </Routes>
    </>
  )
}



export default UserRouter