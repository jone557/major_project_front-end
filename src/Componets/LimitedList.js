import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../Assets/Styles/admin-card.css'
import Spinner from './spinner'
import User from './User'
import ComponentCard from './componet-card'
import { showStats } from '../Features/Dashboard/dashboardSlice'

const LimitedList = () => {
    const {users, components, isLoading} = useSelector((state)=> state.dashboard)

    const usersData = users.slice().sort((a, b) => b.users - b.users)
    const componentsData = components.slice().sort((a, b) => b.components - b.components)

    usersData.reverse()
    componentsData.reverse()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(showStats())
    },[])

    if(isLoading){
        return(
            <Spinner/>
        )
    }
  return <>
    <div className="">
        <h3 className='m-1'>New Users</h3>
        <div className='grid g-2'>
            {
                usersData.slice(0, 5).map((item)=>{
                    return <User key={item.id} {...item}/>
                })
            }
        </div>
        <h3 className='m-1'>New Components</h3>
        <div className='grid g-2'>
            {
                componentsData.slice(0, 5).map((item)=>{
                    return <ComponentCard key={item.id} {...item}/>
                })
            }
        </div>
    </div>
  </>
    
}

export default LimitedList