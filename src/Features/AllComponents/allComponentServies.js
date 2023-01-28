
import axios from "axios";

// all users
const allComponents = async()=>{
    const response = await axios.get('/component')
    if(response.data){
        console.log('compoe ')
        console.log(response.data)
    }
    return response.data
}

const allComponentServies ={
    allComponents,
}   

export default allComponentServies