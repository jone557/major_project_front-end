import { createSlice} from "@reduxjs/toolkit"
import { useSelector } from 'react-redux'


const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    
}

const updateSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        userUpdate(state, action) {
            const {firstname, lastname, email, github, linkedin } = action.payload;
            // const {user} = state.find((user) => user.id === id);    
            if (user) {
                user.firstname = firstname;
                user.lastname = lastname;
                user.email = email;
                user.github = github;
                user.linkedin = linkedin;
            }
        }
    },
  });

  export default updateSlice.reducer;