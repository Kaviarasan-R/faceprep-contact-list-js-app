import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

// States
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// @usage   Register user
// @desc    Calling backend api's inside async thunk api for register
// @params  thunk api name & callback function
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            // calling backend in auth service
            return await authService.register(user)
        } catch (error) {
            const message = 
            (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) ||
            error.message ||
            error.toString()

            // returns error message with the help of async thunkAPI
            // it can be used in extraReducers function by addCase.
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// @usage   Login user
// @desc    Calling backend api's inside async thunk api for login
// @params  thunk api name & callback function
export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            const message = 
            (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) ||
            error.message ||
            error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// @usage   Logout user
// @desc    Logout user by removing localstorage
// @params  thunk api name & callback function
export const logout = createAsyncThunk(
    'auth/logout', 
    async () => {
        await authService.logout()
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // reducers are the only way to change states in Redux
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    // extra reducers also is a way to change states
    // but it is used for async operations
    // change states in different promise levels --> (pending, fulfilled, reject)
    extraReducers: (builder) => {
        builder
            // register async thunk api
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            // login async thunk api
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            // logout async thunk api
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

// export reducer functions
export const { reset } = authSlice.actions
export default authSlice.reducer