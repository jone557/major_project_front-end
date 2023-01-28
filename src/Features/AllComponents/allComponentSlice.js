
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import allComponentServies from "./allComponentServies";


const initialFIlterState = {
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOprions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
    isLoading: false,
    components: [],
    totalComponent: 0,
    numOfPages:1,
    page:1,
    // stats: {},
    ...initialFIlterState,
}

// all users
export const allComponents = createAsyncThunk(
    'components/allComponents',
    async(_, thunkAPI)=>{
        try {
            return await allComponentServies.allComponents()
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

const allComponentSlice = createSlice({
    name: 'allComponents',
    initialState,
    reducers:{
        handleChange:(state, {payload: {name, value}}) => {
             state[name] = value 
             console.log(value)  
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(allComponents.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(allComponents.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                // console.log('comp')
                // console.log(action.payload.totalComponents)
                state.components = action.payload.component
                state.numOfPages = action.payload.numOfPages
                state.totalComponents = action.payload.totalComponents
            })
            .addCase(allComponents.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.success(state.message)
            })
    }
});

export const {handleChange} = allComponentSlice.actions
export default allComponentSlice.reducer