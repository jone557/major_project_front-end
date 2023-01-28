
import { useEffect } from 'react'
import User from './User'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from './spinner'
import PagesBtnContainer from './PagesBtnContainer'
import  { allComponents } from '../Features/AllComponents/allComponentSlice'
import ComponentCard from './componet-card'

const ComponentsContainer = () => {

    const dispatch = useDispatch()
    const {components, isLoading, numOfPages, totalComponents} = useSelector((state)=> state.allComponents)
    
    useEffect(()=>{
        dispatch(allComponents())
    },[])
    
    if(isLoading){
        return(
            <Spinner/>
        )
    }
    
    if(components.length === 0){
        return (
            <h2>No users to display</h2>
        )
    }
    
  return (
    <div className="">
        <h3 className='m-1'>
            {totalComponents} Compoent{components.length > 1 && 's'} found
        </h3>
        <div className='grid g-2'>
            {
                components.map((item)=>{
                    // console.log(user)
                    return <ComponentCard key={item.id} {...item}/>
                })
            }
        </div>
        {numOfPages > 1 && <PagesBtnContainer/>}
    </div>
   
  )
}

export default ComponentsContainer