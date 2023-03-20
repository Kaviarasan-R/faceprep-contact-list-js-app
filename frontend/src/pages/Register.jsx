/* React Libraries */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

/* Importing redux reducers */
import { register, reset } from '../features/auth/authSlice'

/* Components */
import Card from "../components/AuthCard";
import NavBar from '../components/NavBar';

const Register = () => {

  // Initialize
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Use state initialize
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Get formdata from state
  const { username, email, password } = formData

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
    const userData = { username, email, password }
    // Calling register async thunk api
    dispatch(register(userData))
  };

  return (
    <>
      <NavBar />
      <Card>
        <h1 className="title">Sign Up</h1>
        <p className="subtitle">
          Please Register yourself with username, email and password!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="inputs_container">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
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
          <input type="submit" value="Sign Up" className="login_button" />
        </form>
        <div className="link_container">
          <Link to="/login" className="small">
            Already have an account?
          </Link>
        </div>
      </Card>
    </>
  );
};

export default Register;