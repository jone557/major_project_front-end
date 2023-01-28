import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Assets/Styles/search.css'
import {handleChange} from '../Features/AllUsers/allUsersSlice'

const SearchContainer = () => {
  const { isLoading, search } = useSelector((state)=> state.allUsers)
  const dispatch = useDispatch()

  const handleSearch = (e)=>{
    // islloading check 
    dispatch(handleChange({name: e.target.name, value: e.target.value}))
  };
  const handleSubmit = (e)=> {
    e.preventDefault();

  }
  return (
    <form className='form'>
      <h4 className=''>Search</h4>
      <div className="form_center">
        <input className='input m-1' 
         type="text" name='search' onChange={handleSearch} value={search}  />
      </div>
    </form>
  )
}

export default SearchContainer