import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import dashboardService from "./dashboardService";

const initialState = {
    isLoading: false,
    users: [],
    components: [],
    userCount: 0,
    categoryCount: 0,
    componentCount: 0,
    stats: [],
    h_components: [],
}

// all stats
export const showStats = createAsyncThunk(
    'dashboard/stats',
    async(_, thunkAPI)=>{
        try {
            return await dashboardService.showStats()
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

export const homeComponet = createAsyncThunk(
    'dashboard/homeComponet',
    async(_, thunkAPI)=>{
        try {
            return await dashboardService.homeComponet()
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

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    extraReducers: (builder)=>{
        builder
            .addCase(showStats.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(showStats.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                console.log('state.users')
                console.log(action.payload)
                state.users = action.payload.users
                state.components = action.payload.components
                state.categoryCount = action.payload.categoryCount
                state.userCount = action.payload.userCount
                state.componentCount = action.payload.componentCount
                
            })
            .addCase(showStats.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(state.message)
            })
            // **********
            .addCase(homeComponet.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(homeComponet.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                console.log('home.comp')
                console.log(action.payload)
               
                state.h_components = action.payload
               
                
            })
            .addCase(homeComponet.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(state.message)
            })
    }
});

export default dashboardSlice.reducer