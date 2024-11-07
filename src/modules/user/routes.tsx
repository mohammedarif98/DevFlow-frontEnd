import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/SignUp/SignUpPage";
import LoginPage from "./pages/Login/LoginPage";
import Home from "./pages/Home/Home";



const UserRoutes = () => {

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



export default UserRoutes