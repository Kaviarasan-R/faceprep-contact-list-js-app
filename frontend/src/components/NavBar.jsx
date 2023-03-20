/* React libraries */
import { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'

/* Redux libraries */
import { useSelector, useDispatch } from 'react-redux'

import { useOnHoverOutside } from "../features/hooks/useOnHoverOutside";
import Menu from "./Menu";

/* Redux reducers */
import { logout, reset } from '../features/auth/authSlice'

/* Styles */
import '../assets/styles/NavBar.css'

/* MUI Icons */
import MenuIcon from '@mui/icons-material/Menu';

function NavBar() {
  
  /* Redux & Router initialize */
  const navigate = useNavigate()
  const dispatch = useDispatch()

  /* Getting redux state */
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    /* Calling redux reducers to change states */
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const dropdownRef = useRef(null); // Create a reference for dropdown container
  const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);

  // Function to close dropdown
  const closeHoverMenu = () => {
    setMenuDropDownOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu); // Call the hook

  return (
    <div className='nav-page'>
      <div className='nav-container'>
        <header>
          <MenuIcon className='menu-icon' style={{ display: 'none' }} onClick={() => setMenuDropDownOpen(!isMenuDropDownOpen)} />
          {isMenuDropDownOpen && <Menu />}
          <nav className='nav-links'>
            <Link className='nav-link nav-home' to={'/'}>Home</Link>
            <div className='nav-bars'>
              <Link className='nav-link' to={'/contacts'}>Contacts</Link>
              {/* Display logout only when user logged in */}
              {user ? (
                <button className='nav-link' onClick={onLogout}>Logout</button>
              ) : (
                <>
                  {/* Display login & register only when user not logged in */}
                  <Link className='nav-link' to={'/login'}>Login</Link>
                  <Link className='nav-link' to={'/register'}>Register</Link>
                </>
              )}
            </div>
          </nav>
        </header>
      </div>
    </div>
  )
}

export default NavBar