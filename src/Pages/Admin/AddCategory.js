import React, { useState,  useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux';
import { AddCategory } from '../../Redux/reducers/categoryReducer';
import { useNavigate } from "react-router-dom";

const AddCategorys = () => {
    const categorystore = useSelector((state) => state.category)
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        dispatch(AddCategory(category))
        // navigate('/components')
        setCategory({
            title: '',
            discription: ''
        })
    }
    return (
        <div className="admin_main_container">
            <div className='component_container'>
                {error? <div className='show_error'><h2>{error}</h2></div> :''}
                <div className='hdr-mrg'>
                    <h1 className='hdr-title-marg'>Add Category</h1>                    
                    <form onSubmit={onSubmit}>
                        <div className='flex' style={{ display: 'flex', flexDirection: 'column', width: '20rem' }}>
                            <label className='sub-title-marg' htmlFor='Cname'>Name</label>
                            <input className='sub-title-marg input' value={title} type='text' id='Cname' placeholder='Component Name' name='title' onChange={onChange} required></input>
                            <label className='sub-title-marg' htmlFor='Cdescription'>Description</label>
                            <textarea rows={10} className='sub-title-marg description' value={discription} type='text' id='Cdescription' placeholder='Description' name='discription' onChange={onChange} ></textarea>
                            <input className='sub-title-marg  submit btn' type='submit' value='Add Category' />
                        </div>
                    </form>
                </div>
                <br></br>
                {/* <iframe height="375" width="700" src="https://www.interviewbit.com/embed/snippet/f37b06918e8a8b08bef3" title='Interviewbit Ide snippet/f37b06918e8a8b08bef3' loading="lazy" allow="clipboard-write" allowFullScreen referrerpolicy="unsafe-url" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"></iframe> */}

            </div>
        </div>
    )
}

export default AddCategorys;