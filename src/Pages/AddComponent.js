import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AddComponent } from '../Redux/reducers/componentReducer';
import {  GetCategory } from '../Redux/reducers/categoryReducer';
import { useNavigate } from "react-router-dom";
import Editor from '../Componets/Editor'
import useLocalStorage from '../Componets/useLocalStorage'

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
        css: '',
        html: ''
    })
    const { category_id, name, discription, code, css, html } = component;
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
            css:'',
            html:''
        })

    }
    //new change
    const [jsSample, setJsSample] = useLocalStorage('html', '');
    const [htmlSample, setHtmlSample] = useLocalStorage('js', '');
    const [cssSample, setCssSample] = useLocalStorage('css', '');
    const [codeOutput, setCodeOutput] = useState('');
    useEffect(() => {
        const timeout = setTimeout(() => {
            setCodeOutput(`
            <html>
              <body>${htmlSample}</body>
              <style>${cssSample}</style>
              <script>${jsSample}</script>
            </html>
          `)
        }, 250)
    
        return () => clearTimeout(timeout)
      }, [htmlSample, cssSample, jsSample])
    
    return (
        <div className="admin_main_container">

            <div className='component_container'>
                {error ? <div className='show_error'><h2>{error}</h2></div> : ''}
                <div className='compnent-element hdr-mrg '>
                    <h1 className='hdr-title-marg'>Add component</h1>
                    {/* codepen compiler for react here */}
                    <div>
                    <iframe 
                    srcDoc={codeOutput} 
                    title=" " 
                    width="80%" 
                    height="200" 
                    loading="lazy" 
                    sandbox="allow-scripts"
                    // frameBorder="0"
                    />
                    </div>
                    <h2>type your input code in the below IDE</h2>
                   <div className="editors-container">
                   <Editor
                        language="xml"
                        value={htmlSample}
                        displayName='Html'
                        onChange={setHtmlSample}
                        
                    />

                    <Editor
                        language="css"
                        value={cssSample}
                        displayName='Css'
                        onChange={setCssSample}
                    />
                    <Editor
                        language="javascript"
                        value={jsSample}
                        displayName='Jsx'
                        onChange={setJsSample}
                    />
                   </div>
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
                            <label className='sub-title-marg' htmlFor='html-co'>Html Code Input</label>
                            <textarea id='html_co' className='sub-title-marg' style={{ width: '43rem' }} name='html' value={html} onChange={onChange} placeholder='submite the html code here after checking in the code editor' rows="10" cols="50" required>
                            </textarea>
                            <label className='sub-title-marg' htmlFor='code_ref'>Js Code Input</label>
                            <textarea id='code_ref' className='sub-title-marg' style={{ width: '43rem' }} name='code' value={code} onChange={onChange} placeholder='submite the Jsx code here after checking in the code editor' rows="10" cols="50" >
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