import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { SingleComponent as Unique } from '../Redux/reducers/componentReducer';
import { UpdateComponentview as Viewes } from '../Redux/reducers/componentReducer';
import { UpdateComponentLike as Like } from '../Redux/reducers/componentReducer';
import Editor from '../Componets/Editor'
import { AiFillHeart } from 'react-icons/ai'
import axios from 'axios';
import Spinner from '../Componets/spinner';


function SingleComponent() {    
    const dispatch = useDispatch();
    let { id } = useParams();
    useEffect(() => {
        dispatch(Unique(id))
        dispatch(Viewes(id))
    }, [id]);

    const user = useSelector((state) => state.auth.user)
    const componentstore = useSelector((state) => state.component)
    const component = componentstore.si_component
    const code = componentstore.code

    const [codeOutput, setCodeOutput] = useState('');
    useEffect(() => {
            setCodeOutput(`
            <html>
              <style>${code.CSS}</style>
              <script>${code.JS}</script>
              <body>${code.HTML}</body>
            </html>
          `)
      }, [code.HTML, code.CSS, code.JS]) 
    const handleLike = () => {
        if (user) {
            // dispatch(Like([id, user.id]));
            document.querySelector('#cop' + id).style.color = 'red';
        }
    }
 
    if (componentstore.loading) {
        return (
            <Spinner />
        )
    }
    return (
        <div className='comp-sub-section sub-section-marg'>
            <div className='hdr-mrg'>
                <h1 className='hdr-title-marg'>{component.name}</h1>
                <p className='comp-sub-title sub-title-marg'>{component.discription} </p>
            </div>
            <div className='comp-steps-container hdr-mrg'>
                <h1 className='comp-sub-elem-hdr sub-elem-hdr-marg'>output</h1>

                <div className='comp-sub-title sub-elem-hdr-marg ' >

                    <iframe 
                        srcDoc={codeOutput} 
                        title=" " 
                        width="100%" 
                        height="auto" 
                        loading="lazy" 
                        sandbox="allow-scripts"
                        frameBorder="0"
                    />

                </div>

            </div>
            <div className='comp-steps-container hdr-mrg '>
                <div className='code_flex_container '>
                    <h1 className='comp-sub-elem-hdr sub-elem-hdr-marg'>code</h1>
                    {user ?
                        <AiFillHeart id={'cop' + (id)} title='like this component' className='comp-sub-elem-hdr sub-elem-hdr-marg like_button' onClick={() => {
                            handleLike()
                        }} />
                        : ''}


                </div>

                <div className='comp-sub-title sub-elem-hdr-marg editors-container'>

                    <Editor
                        language="xml"
                        value={code.HTML}
                        displayName='Html'
                    />

                    <Editor
                        language="css"
                        value={code.CSS}
                        displayName='Css'
                    />
                    <Editor
                        language="javascript"
                        value={code.JS}
                        displayName='Jsx'
                    />

                </div>


            </div>
        </div>
    )
}

export default SingleComponent