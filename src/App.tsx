import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
// import UserRouter from "./routes/UserRouter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider } from './contexts/LoadingContext';
import UserRouter from './modules/user/routes';


function App() {
  return (
    <>
      <ToastContainer />
        <LoadingProvider>
          <Router>
            <Routes>
              <Route path='/*' element={ <UserRouter/> } />     {/* ------ user routes ----- */}
              {/* <Route path='/admin' element={ <AdminRouter/> } />     ------ admin routes ----- */}
            </Routes>
          </Router>
        </LoadingProvider>
    </>
  )
}

export default App
