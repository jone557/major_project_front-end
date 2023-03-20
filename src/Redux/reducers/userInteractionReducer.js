import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import swal from 'sweetalert';

const initialState = {
    loading: false,
    interactions: '',
    recommendation: [],
    UserLikedComponent: [],
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
//get singel user interaction
export const SingleUserRecommendation = createAsyncThunk('single-user-recommendation/id', (id) => {

    return axios.get(`http://127.0.0.1:8000/api/singelUser/recommendation/${id}`)
        .then((response) => response.data)
})
//get singel component likes 
export const GetUserLikedComponent = createAsyncThunk('single-user-likes/id', (id) => {

    return axios.get(`http://127.0.0.1:8000/api/userlike/${id}/components`)
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
            state.interactions= action.payload.message[0].interactions
        })
        builder.addCase(SingleUserInteraction.rejected, (state, action) => {
            state = []
            state.error = action.error.message
        })
        //SingleUserRecommendation
        builder.addCase(SingleUserRecommendation.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(SingleUserRecommendation.fulfilled, (state, action) => {
            state.loading = false
            state.recommendation= action.payload.message
        })
        builder.addCase(SingleUserRecommendation.rejected, (state, action) => {
            state = []
            state.error = action.error.message
            console.log(action)
        })
        //Component likes
        builder.addCase(GetUserLikedComponent.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(GetUserLikedComponent.fulfilled, (state, action) => {
            state.loading = false
            state.UserLikedComponent= action.payload.likedComponents
        })
        builder.addCase(GetUserLikedComponent.rejected, (state, action) => {
            state.UserLikedComponent = []
            state.error = action.error.message
            console.log(action)
        })
    }
})

export const {handleChange} = componentSlice.actions

export default componentSlice.reducer;