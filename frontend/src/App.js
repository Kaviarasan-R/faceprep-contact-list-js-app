/* React Libraries */
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SkeletonTheme } from 'react-loading-skeleton'

/* Pages */
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ContactList from "./pages/Contacts"
import UserDetails from "./pages/UserDetails"

/* React Toastify */
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {  
  return (
    <div className='App'>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/contacts/:uuid" element={<UserDetails />} />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
      <ToastContainer />
    </div>
  )
}

