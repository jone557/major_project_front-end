import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import swal from 'sweetalert';

const initialState = {
    loading: false,

    image: '',
    error: ''
}


export const getImage = createAsyncThunk('userImage/id', (id) => {
    return axios.get(`http://127.0.0.1:8000/api/userImage/${id}`)
        .then((response) => response.data)
})

const componentSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        handleChange:(state, {payload: {name, value}}) => {
            state[name] = value 
            console.log(value)
       }

    },

    extraReducers: (builder) => {
        builder.addCase(getImage.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getImage.fulfilled, (state, action) => {
            state.image = action.payload
            state.loading = false
        })
        builder.addCase(getImage.rejected, (state, action) => {
            state= []
            state.error = action.error.message
        })

    }
})

export const {handleChange} = componentSlice.actions

export default componentSlice.reducer;