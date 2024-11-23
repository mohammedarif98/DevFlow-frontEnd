import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import SignUpPage from "./pages/signUp/SignUpPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UserProtectedRoute from "./UserProtectedRoute";
import HomePage from "./pages/home/HomePage";
import CreateBlog from "./pages/home/blog/CreateBlog";



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
              <Route path="/create-blog" element={<CreateBlog /> }/>
            </Route>
        </Routes>
    </>
  )
}



export default UserRoutes;