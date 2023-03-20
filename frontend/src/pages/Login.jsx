/* React Libraries */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

/* Importing redux reducers */
import { login, reset } from '../features/auth/authSlice'

/* Components */
import Card from "../components/AuthCard";
import NavBar from '../components/NavBar';

/* Styles */
import "../assets/styles/Login.css";

const Login = () => {

  // Initialize
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Use state initialize
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Get formdata from state
  const { email, password } = formData

  // Get redux states by slice name
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  // Use effect runs whenever [redux-user, redux-isError, redux-isSuccess, redux-message, dispatch, navigate]
  useEffect(() => {
    // If error happens, notify with error message
    if(isError) {
      toast.error(message)
    }
    
    // If success or user object is not null navigate to main page
    if(isSuccess || user) {
      navigate('/contacts')
    }

    // Call redux-reducer reset() to reset states
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  // Everytime changes, it updates state
  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  // On form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password }
    // Calling register async thunk api
    dispatch(login(userData))
  };

  return (
    <>
      <NavBar />
      <Card>
        <h1 className="title">Sign In</h1>
        <p className="subtitle">
          Please log in using your username and password!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="inputs_container">
            <input
              type="text"
              placeholder="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <input type="submit" value="Log In" className="login_button" />
        </form>
        <div className="link_container">
          <Link to="/register" className="small">
            Don't have an account?
          </Link>
        </div>
      </Card>
    </>
  );
};

export default Login;