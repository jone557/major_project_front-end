import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import swal from 'sweetalert';

const initialState = {
    loading: false,
    components: [],
    si_component: '',
    siUser_component: [],
    siCategory_component: [],
    error: ''
}

// single component
export const SingleComponent = createAsyncThunk('single-component/id', (id) => {
    return axios.get(`http://127.0.0.1:8000/api/single-component/${id}`)
        .then((response) => response.data)
})
// single category component
export const SingleCategoryComponent = createAsyncThunk('singleCategry-component/id', (id) => {
    return axios.get(`http://127.0.0.1:8000/api/singleCategory-component/${id}`)
        .then((response) => response.data)
})
// single user component
export const SingleUserComponent = createAsyncThunk('singleUser-component/id', (id) => {
    return axios.get(`http://127.0.0.1:8000/api/singleUser-component/${id}`)
        .then((response) => response.data)
})
// getcomponent
export const GetComponent = createAsyncThunk('component', () => {
    return axios.get('http://127.0.0.1:8000/api/component')
        .then((response) => response.data)
})
//addComponent
export const AddComponent = createAsyncThunk('component/add-component', (newComponent) => {
    return axios.post('http://127.0.0.1:8000/api/add-component', newComponent)
        .then((response) => response.data)
})
//update component view
export const UpdateComponentview = createAsyncThunk('component/update-componentview', (id) => {
    return axios.put(`http://127.0.0.1:8000/api/update-componentview/${id}`)
        .then((response) => response.data)
})
//update component like
export const UpdateComponentLike = createAsyncThunk('component/update-componentlike', (id) => {
    return axios.put(`http://127.0.0.1:8000/api/update-componentlike/${id}`)
        .then((response) => response.data)
})

//update component
export const UpdateComponent = createAsyncThunk('component/update-component', ([id, component]) => {
    return axios.put(`http://127.0.0.1:8000/api/update-component/${id}`, component)
        .then((response) => response.data)
})
//update component
export const DelateComponent = createAsyncThunk('component/update-component', (id) => {
    return axios.delete(`http://127.0.0.1:8000/api/delete-component/${id}`)
        .then((response) => response.data)
})
const componentSlice = createSlice({
    name: 'component',
    initialState,
    reducers: {
        // addcomponent: Addcomponent

    },
    extraReducers: (builder) => {
        //Get Component
        builder.addCase(GetComponent.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(GetComponent.fulfilled, (state, action) => {
            state.components = action.payload.component
            state.loading = false
        })
        builder.addCase(GetComponent.rejected, (state, action) => {
            state.si_component = []
            state.error = action.error.message
        })

        //Single Component
        builder.addCase(SingleComponent.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(SingleComponent.fulfilled, (state, action) => {
            state.si_component = action.payload.message[0]
            state.loading = false
        })
        builder.addCase(SingleComponent.rejected, (state, action) => {
            state.error = action.error.message
        })

        //Single Category Component
        builder.addCase(SingleCategoryComponent.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(SingleCategoryComponent.fulfilled, (state, action) => {
            state.siCategory_component = action.payload.message
            state.loading = false
        })
        builder.addCase(SingleCategoryComponent.rejected, (state, action) => {
            state.error = action.error.message
        })

        //Single User Component
        builder.addCase(SingleUserComponent.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(SingleUserComponent.fulfilled, (state, action) => {
            state.siUser_component = action.payload.message
            state.loading = false
        })
        builder.addCase(SingleUserComponent.rejected, (state, action) => {
            state.error = action.error.message
        })

        //Add Component
        builder.addCase(AddComponent.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(AddComponent.fulfilled, (state, action) => {
            state.loading = false
            swal({
                title: "success",
                text: action.payload.message,
                icon: "success",
                buttons: "Ok"
            })
        })
        builder.addCase(AddComponent.rejected, (state, action) => {
            state = []
            state.error = action.error.message
        })

        //Update Component
        builder.addCase(UpdateComponent.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(UpdateComponent.fulfilled, (state, action) => {
            state.loading = false
            swal({
                title: "success",
                text: action.payload.message,
                icon: "success",
                buttons: "Ok"
            })

        })
        builder.addCase(UpdateComponent.rejected, (state, action) => {
            state = []
            state.error = action.error.message
        })

        //Update Component
        builder.addCase(UpdateComponentLike.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(UpdateComponentLike.fulfilled, (state, action) => {
            state.loading = false

        })
        builder.addCase(UpdateComponentLike.rejected, (state, action) => {
            state = []
            state.error = action.error.message
        })

        //Update Component
        builder.addCase(UpdateComponentview.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(UpdateComponentview.fulfilled, (state, action) => {
            state.loading = false

        })
        builder.addCase(UpdateComponentview.rejected, (state, action) => {
            state = []
            state.error = action.error.message
        })
    }
})


export default componentSlice.reducer;