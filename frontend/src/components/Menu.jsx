/* React libraries */
import { Link, useNavigate } from 'react-router-dom'

/* Redux libraries */
import { useSelector, useDispatch } from 'react-redux'

/* Redux reducers */
import { logout, reset } from '../features/auth/authSlice'

/* Styles */
import '../assets/styles/Menu.css'

export default function Menu() {

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


    return (
        <div className='dropdown'>
            <div className="dropdown-content">
                <Link className='nav-dropdown-link' to={'/'}>Home</Link>
                <Link className='nav-dropdown-link' to={'/contacts'}>Contacts</Link>
                {/* Display logout only when user logged in */}
                {user ? (
                    <button className='nav-dropdown-link' onClick={onLogout}>Logout</button>
                ) : (
                    <>
                        {/* Display login & register only when user not logged in */}
                        <Link className='nav-dropdown-link' to={'/login'}>Login</Link>
                        <Link className='nav-dropdown-link' to={'/register'}>Register</Link>
                    </>
                )}
            </div>
        </div>
    )
}