import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"
import cookie from 'js-cookie'
import { toast } from "react-toastify"
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage"


const initialState = {
    user : getUserFromLocalStorage(),
    isLoading: false,
    // token: token ? token : null,
    isError: false,
    isSuccess: false,
    message: '',
}

// register user 
export const register = createAsyncThunk(
    'auth/register', 
    async(user, thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        console.log(error)
        const message = (
            error.response && 
            error.response.data &&
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// login user 
export const login = createAsyncThunk(
    'auth/login', 
    async(user, thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && 
            error.response.data &&
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// logout
export const logout = createAsyncThunk(
    'auth/logout',
    async (user, thunkAPI)=>{
        try {
            return await authService.logout()
        } catch (error) {
            const message = (error.response && 
                error.response.data &&
                error.response.data.message) || 
                error.message || 
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//  user 
export const userInfo = createAsyncThunk(
    'auth/userinfo', 
    async(user, thunkAPI)=>{
    try {
        return await authService.userInfo()
    } catch (error) {
        const message = (error.response && 
            error.response.data &&
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {       
        reset: (state)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(register.pending, (state, action)=>{
                state.isLoading = true
                state.user = null
            })
            .addCase(register.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                addUserToLocalStorage(state.user)                
                toast.success(`Hi There ${state.user.firstname}`)
            })
            .addCase(register.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state, action)=>{
                state.isLoading = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.fulfilled, (state, action)=>{
                console.log('login.payload')
                console.log(action.payload)
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                addUserToLocalStorage(state.user)
                toast.success(`Welcome back ${state.user.firstname}`)
            })
            .addCase(login.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
                toast.error(action.payload)

            })
            .addCase(logout.fulfilled, (state)=>{
                state.user = null
                removeUserFromLocalStorage()
                toast.success('Successfully Loged out')

            })
            .addCase(userInfo.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(userInfo.fulfilled, (state, action)=>{
                console.log('user.payload')
                console.log(action.payload)
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            // .addCase(userInfo.rejected, (state, action)=>{
            //     state.isLoading = false
            //     state.isError = true
            //     state.message = action.payload
            //     state.user = null
            // })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer
