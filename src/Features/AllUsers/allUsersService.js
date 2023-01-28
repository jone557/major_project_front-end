import axios from "axios";

// all users
const allUser = async()=>{
    const response = await axios.get('/users')
    if(response.data){
        console.log(response.data)
    }
    return response.data
}

const allUsersService ={
    allUser,
}   

export default allUsersService