import axios from "axios";

const API_URL_UPDATE = 'http://127.0.0.1:8000/api/updateprofile'

const updateService ={
     update
}   
//update user
const update = async(userData)=>{
    const response = await axios.post(API_URL_UPDATE, userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}


export default updateService