import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import swal from 'sweetalert';

const initialState = {
    loading: false,
    interactions: '',
    error: ''
}

//store UserInteraction
export const StoreInteraction = createAsyncThunk('user/interaction', (interaction) => {
    return axios.post('http://127.0.0.1:8000/api/user/interaction', interaction)
        .then((response) => response.data)
        .catch((err)=>{
            console.log(err)
        })
})

//get singel user interaction
export const SingleUserInteraction = createAsyncThunk('single-user-interaction/id', (id) => {
    return axios.get(`http://127.0.0.1:8000/api/singelUser/interaction/${id}`)
        .then((response) => response.data)
})


const componentSlice = createSlice({
    name: 'Userinteraction',
    initialState,
    reducers: {
        handleChange:(state, {payload: {name, value}}) => {
            state[name] = value 
            console.log(value)
       }

    },
    extraReducers: (builder) => {
        builder.addCase(StoreInteraction.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(StoreInteraction.fulfilled, (state, action) => {
            state.loading = false
            console.log(action)
        })
        builder.addCase(StoreInteraction.rejected, (state, action) => {
            state = []
            state.error = action.error.message
        })
        //singelUserInteraction
        builder.addCase(SingleUserInteraction.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(SingleUserInteraction.fulfilled, (state, action) => {
            state.loading = false
            state.interactions= action.payload.message
        })
        builder.addCase(SingleUserInteraction.rejected, (state, action) => {
            state = []
            state.error = action.error.message
        })
    }
})

export const {handleChange} = componentSlice.actions

export default componentSlice.reducer;