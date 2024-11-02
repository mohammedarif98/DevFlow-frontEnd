import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import UserRouter from "./routes/UserRouter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <ToastContainer />
        <Router>
          <Routes>
            <Route path='/*' element={ <UserRouter/> } />     {/* ------ user routes ----- */}
          </Routes>
        </Router>
    </>
  )
}

export default App
