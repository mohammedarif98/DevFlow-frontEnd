import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import SignUpPage from "./pages/signUp/SignUpPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UserProtectedRoute from "./UserProtectedRoute";
import HomePage from "./pages/home/HomePage";



const UserRoutes = () => {

    const location = useLocation();
    const showNavbar = !['/login','/signup'].includes(location.pathname);

  return (
    <>
      { showNavbar && <Header/> }
        <Routes>
            <Route path='/signup' element= { <SignUpPage /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/' element= { <HomePage /> }/>
            {/* --------------- Protected Routes ------------- */}
            <Route element={<UserProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage /> }/>
            </Route>
        </Routes>
    </>
  )
}



export default UserRoutes;