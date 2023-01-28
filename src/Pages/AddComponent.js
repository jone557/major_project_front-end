import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AddComponent } from '../Redux/reducers/componentReducer';
import {  GetCategory } from '../Redux/reducers/categoryReducer';
import { useNavigate } from "react-router-dom";


const Landing = () => {
    const categorystore = useSelector((state) => state.category)
    const categorys = categorystore.categorys
    const user = useSelector((state) => state.auth.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(GetCategory())
      }, []);
    const error = categorystore.error
    const ref = Math.random().toString(36).slice(2);
    const [component, setComponent] = useState({
        user_id:'',
        category_id: '',
        name: '',
        discription: '',
        code: '',
        css: ''
    })
    const { category_id, name, discription, code, css } = component;
    const onChange = (e) => {
        setComponent({ ...component, [e.target.name]: e.target.value ,['user_id']:user.id})
    }
    function validate() {

    }
    const onSubmit = async (e) => {
        e.preventDefault();
        validate();
        console.log(component)
         dispatch(AddComponent(component))
        // navigate('/components')
        setComponent({
            category_id: '',
            name: '',
            discription: '',
            code: '',
            css:''
        })

    }
    return (
        <div className="admin_main_container">

            <div className='component_container'>
                {error ? <div className='show_error'><h2>{error}</h2></div> : ''}
                <div className='compnent-element hdr-mrg '>
                    <h1 className='hdr-title-marg'>Add component</h1>
                    {/* codepen compiler for react here */}
                    <iframe src="https://codepen.io/engida2312/embed/yLjrpYL?default-tab=js%2Cresult&editable=true" title=" " width="100%" height="500" frameBorder="0" marginwidth="0" marginheight="0" loading="lazy" allowtransparency="true" allowFullScreen></iframe>
                    <form onSubmit={onSubmit}>
                        <div className='flex' style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                            <label className='sub-title-marg' htmlFor='Cname'>Name</label>
                            <input className='sub-title-marg input' type='text' id='Cname' value={name} placeholder='Component Name' name='name' onChange={onChange} required ></input>
                            <label className='sub-title-marg' htmlFor='Cdescription'>Description</label>
                            <textarea className='sub-title-marg' type='text' id='Cdescription' value={discription} placeholder='Description' name='discription' onChange={onChange} ></textarea>
                            <label className='sub-title-marg' htmlFor='category'>Category</label>
                            <select name="category_id" className="input" id="categorys" value="none" onChange={onChange} required>
                                {}
                                <option value="none" selected="selected" disabled hidden>Select an Option</option>
                                {categorys.map(category => (
                                    <option  key={category.id} value={category.id}>{category.title}</option>
                                ))}
                            </select>
                            <label className='sub-title-marg' htmlFor='code_ref'>Jsx Code Input</label>
                            <textarea id='code_ref' className='sub-title-marg' style={{ width: '43rem' }} name='code' value={code} onChange={onChange} placeholder='submite the Jsx code here after checking in the code editor' rows="10" cols="50" required>
                            </textarea>
                            <label className='sub-title-marg' htmlFor='code_ref'>Css Code Input</label>
                            <textarea id='css' className='sub-title-marg' style={{ width: '43rem' }} name='css' value={css} onChange={onChange} placeholder='submite the css code here after checking in the code editor' rows="10" cols="50" required>
                            </textarea>
                            <input className='sub-title-marg btn' type='submit' value='Add Component' />
                        </div>
                    </form>
                </div>
                <br></br>

            </div>
        </div>

    )
};
export default Landing;