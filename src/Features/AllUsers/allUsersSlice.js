import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import allUsersService from "./allUsersService";

const initialFIlterState = {
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOprions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
    isLoading: false,
    users: [],
    totalUsers: 0,
    numOfPages:1,
    page:1,
    // stats: {},
    ...initialFIlterState,
}

// all users
export const allUser = createAsyncThunk(
    'users/allUsers',
    async(_, thunkAPI)=>{
        try {
            return await allUsersService.allUser()
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

const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers:{
        handleChange:(state, {payload: {name, value}}) => {
             state[name] = value 
             console.log(value)  
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(allUser.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(allUser.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload.users
                state.numOfPages = action.payload.numOfPages
                state.totalUsers = action.payload.totalUsers
            })
            .addCase(allUser.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.success(state.message)
            })
    }
});

export const {handleChange} = allUsersSlice.actions
export default allUsersSlice.reducer