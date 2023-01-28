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
    const [thisCode, setThisCode] = useState();
    const [css, setCss] = useState();
    const handleLike = () => {
        if (user) {
            // dispatch(Like([id, user.id]));
            document.querySelector('#cop' + id).style.color = 'red';
        }
    }
    var codeOutput = ''
    console.log(component)
    if (component.code_referance) {
        codeOutput = `http://127.0.0.1:3001/component/${component.code_referance}`
        axios.get(`http://127.0.0.1:8000/api/component/code/${component.code_referance}`).then((response) => setThisCode(response.data.message)).catch((err) => { console.log(err) })
        axios.get(`http://127.0.0.1:8000/api/component/css/${component.code_referance}`).then((response) => setCss(response.data.message)).catch((err) => { console.log(err) })
    }
    if (componentstore.loading) {
        return (
            <Spinner/>
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

                <div className='comp-sub-title sub-elem-hdr-marg '>
                    <iframe
                        src={codeOutput}
                        width='600px'
                        height='80px'
                        title='codeOutput'
                        backgroundColor='white'
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
                        language="javascript"
                        value={thisCode}
                        displayName='Jsx'
                        onChange={thisCode}
                    />
                    <Editor
                        language="css"
                        value={css}
                        displayName='Css'
                        onChange={css}
                    />

                </div>

            </div>
        </div>
    )
}

export default SingleComponent