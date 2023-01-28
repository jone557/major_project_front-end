import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AddComponent, SingleComponent, UpdateComponent } from '../Redux/reducers/componentReducer';
import {  GetCategory } from '../Redux/reducers/categoryReducer';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const EditComponent = () => {
    const categorystore = useSelector((state) => state.category)
    const {si_component} = useSelector((state) => state.component)
    
    const {id} = useParams();
    const categorys = categorystore.categorys
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(SingleComponent(id))
        dispatch(GetCategory())
        if(si_component.code_referance){
            axios.get(`http://127.0.0.1:8000/api/component/code/${si_component.code_referance}`).then((response) => setComponent({ ...si_component, ['code']: response.data.message })).catch((err) => { console.log(err) })
            axios.get(`http://127.0.0.1:8000/api/component/css/${si_component.code_referance}`).then((response) => setComponent({ ...si_component, ['css']: response.data.message })).catch((err) => { console.log(err) })
    }
   
    }, []);
  
    const error = categorystore.error
    const ref = Math.random().toString(36).slice(2);
    const [component, setComponent] = useState({
        category_id: si_component.category_id,
        name: si_component.name,
        discription: si_component.discription,
        code: '',
        css: ''
    })
    const { category_id, name, discription, code, css } = component;
    const onChange = (e) => {
        setComponent({ ...component, [e.target.name]: e.target.value })
    }
    function validate() {

    }
    const onSubmit = async (e) => {
        e.preventDefault();
        validate();
        console.log(component)
         dispatch(UpdateComponent([ id, component]))
        // navigate('/components')
        // setComponent({
        //     category_id: '',
        //     name: '',
        //     discription: '',
        //     code: '',
        //     css:''
        // })

    }
    return (
        <div className="admin_main_container">

            <div className='component_container'>
                {error ? <div className='show_error'><h2>{error}</h2></div> : ''}
                <div className='compnent-element hdr-mrg '>
                    <h1 className='hdr-title-marg'>Edit component</h1>
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
                            <input className='sub-title-marg btn' type='submit' value='Edit Component' />
                        </div>
                    </form>
                </div>
                <br></br>

            </div>
        </div>

    )
};
export default EditComponent;