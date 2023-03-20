import axios from 'axios'

const API_URL = 'http://localhost:8080/api/users/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)

    if(response.data) {
        // it can be also done using http-only cookies
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService