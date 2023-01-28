import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { SingleCategory, UpdateCategory } from '../../Redux/reducers/categoryReducer';

const UpdateCategorys = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SingleCategory(params.id))
    }, []);
    const categorystore = useSelector((state) => state.category)
    const SingleCat = categorystore.si_category
    console.log(SingleCat)
    const error = categorystore.error
    const [category, setCategory] = useState({
        title: '',
        discription: ''
    })
    const { title, discription } = category;
    const onChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(category)
          dispatch(UpdateCategory([params.id, category]))
          navigate('/components')
          setCategory({
            title: '',
            discription: ''
        })
    }
    if(categorystore.loading){
        return(
            <h1>loading...</h1>
        )
    }
    return (
        <div className='component_container'>
                        {error? <div className='show_error'><h2>{error}</h2></div> :''}

            <div className='compnent-elements hdr-mrg'>
                <h1 className='hdr-title-marg'>Update Category</h1>
                <form onSubmit={onSubmit}>
                    <div className='flex' style={{ display: 'flex', flexDirection: 'column', width: '20rem' }}>
                        <label className='sub-title-marg' htmlFor='Cname'>Name</label>
                        <input className='sub-title-marg' value={title} type='text' id='Cname' placeholder='Component Name' name='title' onChange={onChange} required></input>
                        <label className='sub-title-marg' htmlFor='Cdescription'>Description</label>
                        <input className='sub-title-marg' value={discription} type='text' id='Cdescription' placeholder='Description' name='discription' onChange={onChange} ></input>
                        <input className='sub-title-marg submit' type='submit' value='Update ' />
                    </div>
                </form>
            </div>
        </div>

    )
}

export default UpdateCategorys;