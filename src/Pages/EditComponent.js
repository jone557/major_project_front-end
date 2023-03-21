import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AddComponent, SingleComponent, UpdateComponent } from '../Redux/reducers/componentReducer';
import {  GetCategory } from '../Redux/reducers/categoryReducer';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Editor from '../Componets/Editor'
import Spinner from '../Componets/spinner';


const EditComponent = () => {
    const categorystore = useSelector((state) => state.category)
    const componentstore = useSelector((state) => state.component)
    const {si_component} = useSelector((state) => state.component)

    const navigate = useNavigate()
    const {id} = useParams();
    const categorys = categorystore.categorys
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(SingleComponent(id))
        dispatch(GetCategory())
        if(si_component.code_referance){
            axios.get(`http://127.0.0.1:8000/api/component/code/${si_component.code_referance}`)
            .then((response) => setComponent({ ...si_component, 
                ['code']: response.data.message.JS, 
                ['css']: response.data.message.CSS,
                ['html']: response.data.message.HTML 
            }))
            .catch((err) => { console.log(err) })
    }
   
    }, [id, dispatch]);
  
    const error = categorystore.error
    const [component, setComponent] = useState({
        category_id: si_component.category_id,
        name: si_component.name,
        discription: si_component.discription,
        code: '',
        css: '',
        html: ''
    })
    const { category_id, name, discription, code, css, html } = component;
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
      //new change
      const [jsSample, setJsSample] = useState(code);
      const [htmlSample, setHtmlSample] = useState(html);
      const [cssSample, setCssSample] = useState( css);
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
   
    if(componentstore.loading){
        return(
            <Spinner />
        )
    }
    return (
        <div className="">

            <div className='component_container'>
                {error ? <div className='show_error'><h2>{error}</h2></div> : ''}
                <div className='compnent-element hdr-mrg '>
                    <h1 className='hdr-title-marg'>Edit component</h1>
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
                            <select name="category_id" className="input" id="categorys" value={category_id} onChange={onChange} required>
                            <option value="" >Select an Option</option>
                                {categorys.map(category => (
                                    <option  key={category.id} value={category.id}>{category.title}</option>
                                ))}
                            </select>
                            <label className='sub-title-marg' htmlFor='code_ref'>Html code Input</label>
                            <textarea id='html' className='sub-title-marg' style={{ width: '43rem' }} name='html' value={html} onChange={onChange} placeholder='submite the Jsx code here after checking in the code editor' rows="10" cols="50" required>
                            </textarea>
                            <label className='sub-title-marg' htmlFor='code_ref'>Css Code Input</label>
                            <textarea id='css' className='sub-title-marg' style={{ width: '43rem' }} name='css' value={css} onChange={onChange} placeholder='submite the css code here after checking in the code editor' rows="10" cols="50" required>
                            </textarea>
                            <label className='sub-title-marg' htmlFor='code_ref'>Jsx Code Input</label>
                            <textarea id='code_ref' className='sub-title-marg' style={{ width: '43rem' }} name='code' value={code} onChange={onChange} placeholder='submite the Jsx code here after checking in the code editor' rows="10" cols="50" >
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