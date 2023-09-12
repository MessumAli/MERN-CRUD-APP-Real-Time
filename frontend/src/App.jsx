import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import AllUser from './components/AllUser'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<AllUser />} />
          <Route path='/createUser' element={<CreateUser />} />
          <Route path='/updateuser/:id' element={<UpdateUser />} />
        </Routes>
        <ToastContainer autoClose={2000} closeOnClick={true} theme='dark' pauseOnFocusLoss={false} pauseOnHover={false} draggable={false} hideProgressBar={true} position='top-center' type='error'/>
      </Router>
    </div>
  )
}

export default App
