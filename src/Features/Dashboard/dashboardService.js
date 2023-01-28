import axios from "axios";

// all stats
const showStats = async()=>{
    const response = await axios.get('/dashboard')
    if(response.data){
        console.log('dashboard')
        console.log(response.data)
    }
    return response.data
}

const homeComponet = async()=>{
    const response = await axios.get('/homeComponent')
    if(response.data){
        console.log('home')
        console.log(response.data)
    }
    return response.data
}

const dashboardService ={
    showStats,
    homeComponet,
}   

export default dashboardService