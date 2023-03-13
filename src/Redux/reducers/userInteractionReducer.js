import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import swal from 'sweetalert';

const initialState = {
    loading: false,
    interactions: [],
    error: ''
}

export const StoreInteraction = createAsyncThunk('user/interaction', (component_id) => {
    return axios.post('http://127.0.0.1:8000/api/user/interaction', component_id)
        .then((response) => response.data)
        .catch((err)=>{
            console.log(err)
        })
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
        builder.addCase(StoreInteraction.fulfilled, (state, action) => {
            state.loading = false
            swal({
                title: "success",
                text: action.payload.message,
                icon: "success",
                buttons: "Ok"
              })
        })
        builder.addCase(StoreInteraction.rejected, (state, action) => {
            state = []
            state.error = action.error.message
        })
    }
})

export const {handleChange} = componentSlice.actions

export default componentSlice.reducer;