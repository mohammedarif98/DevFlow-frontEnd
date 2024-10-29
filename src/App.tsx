import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import UserRouter from "./routes/UserRouter";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={ <UserRouter/> } />     {/* ------ user routes ----- */}
        </Routes>
      </Router>
    </>
  )
}

export default App
