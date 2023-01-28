
import { useEffect } from 'react'
import User from './User'
import { useSelector, useDispatch } from 'react-redux'
import { allUser } from '../Features/AllUsers/allUsersSlice'
import Spinner from './spinner'
import PagesBtnContainer from './PagesBtnContainer'

const UsersContainer = () => {

    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(allUser())
    },[])
    const {users, isLoading, numOfPages, totalUsers, pages} = useSelector((state)=> state.allUsers)
    
    if(isLoading){
        return(
            <Spinner/>
        )
    }
    
    if(users.length === 0){
        return (
            <h2>No users to display</h2>
        )
    }
    
  return (
    <div className="">
        <h3 className='m-1'>
            {totalUsers} user{users.length > 1 && 's'} found
        </h3>
        <div className='grid g-2'>
            {
                users.map((user)=>{
                    // console.log(user)
                    return <User key={user.id} {...user}/>
                })
            }
        </div>
        {numOfPages > 1 && <PagesBtnContainer/>}
    </div>
   
  )
}

export default UsersContainer