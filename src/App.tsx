import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
// import UserRouter from "./routes/UserRouter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider } from './contexts/LoadingContext';
import UserRoutes from './modules/user/routes';
import AdminRoutes from './modules/admin/routes';


function App() {
  return (
    <>
      <ToastContainer />
        <LoadingProvider>
          <Router>
            <Routes>
              <Route path='/*' element={ <UserRoutes/> } />            {/* ------ user routes ----- */}
              <Route path='/admin/*' element={ <AdminRoutes/> } />     {/*------ admin routes ----- */}
            </Routes>
          </Router>
        </LoadingProvider>
    </>
  )
}

export default App
