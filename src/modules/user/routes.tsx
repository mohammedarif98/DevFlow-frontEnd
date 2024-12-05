import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import SignUpPage from "./pages/signUp/SignUpPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UserProtectedRoute from "./UserProtectedRoute";
import HomePage from "./pages/home/HomePage";
import CreateBlog from "./pages/home/blog/CreateBlog";
import BlogDetail from "./pages/home/BlogDetail";
import UpdateBlog from "./pages/home/blog/UpdateBlog";
import UsersDetailPage from "./pages/home/UsersDetailPage";
import CategoryDetailPage from "./pages/home/CategoryDetailPage";



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
              <Route path="/profile" element={ <ProfilePage /> }/>
              <Route path="/create-blog" element={ <CreateBlog /> }/>
              <Route path="/blog-detail/:blogId" element={ <BlogDetail /> }/>
              <Route path="/update-blog/:blogId" element={ <UpdateBlog /> }/>
              <Route path="/users-datails/:usersId" element={ <UsersDetailPage /> }/>
              <Route path="/category-detail" element={ <CategoryDetailPage /> }/>
            </Route>
        </Routes>
    </>
  )
}



export default UserRoutes;