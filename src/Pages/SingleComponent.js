import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { SingleComponent as Unique } from '../Redux/reducers/componentReducer';
import { UpdateComponentview as Viewes } from '../Redux/reducers/componentReducer';
import { UpdateComponentLike as Like } from '../Redux/reducers/componentReducer';
import { StoreInteraction,  GetUserLikedComponent } from '../Redux/reducers/userInteractionReducer';
import Editor from '../Componets/Editor'
import { AiFillHeart } from 'react-icons/ai'
import axios from 'axios';
import Spinner from '../Componets/spinner';
import CommentSection from '../Componets/CommentSection';
import CommentCard from '../Componets/CommentCard';
import { Async } from 'react-async';

function SingleComponent() {    
    const dispatch = useDispatch();
    let { id } = useParams();
    const user = useSelector((state) => state.auth.user)
    
    const [interaction, setInteraction]= useState({
        user_id: user? user.id:'',
        component_id: id
    })
    const [isLiked, setIsLiked] = useState(false);

    const componentstore = useSelector((state) => state.component)
    const component = componentstore.si_component
    const code = componentstore.code
    const uComponents = useSelector((state) => state.userInteraction.UserLikedIds)

    const [codeOutput, setCodeOutput] = useState('');
    const componentId = parseInt(id);

    useEffect(() => {
        dispatch(Unique(id))
        dispatch(Viewes(id))
        if(user) {
            
            Uinteracted(user.id);
            dispatch(GetUserLikedComponent(user.id))
        }
        if(uComponents.length !== 0){
            uComponents.indexOf(componentId) === -1 ?
                console.log(`${id} is not an element of array A`)
            :
                setIsLiked(true);
              
        }
    }, [id]);

    async function   Uinteracted(id) {
         await dispatch(StoreInteraction(interaction))
        setInteraction({
                    user_id: '',
                    component_id: ''
                })
        dispatch(GetUserLikedComponent(id))
   }

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
            const like = !isLiked;
            setIsLiked(like);
            dispatch(Like([id, user.id, like]));
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
                        <AiFillHeart id={'cop' + (id)} title='like this component' className={`comp-sub-elem-hdr sub-elem-hdr-marg ${isLiked ? "like_button":""}`} onClick={() => {
                            handleLike()
                        }} />
                        : ''}


                </div>

                <div className='comp-sub-title sub-elem-hdr-marg editors-container'>

                    <Editor
                        language="xml"
                        value={code.HTML}
                        displayName='Html'
                        onChange= ''
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
            <CommentSection />
            
        </div>
        
        
    )
    
    
}

export default SingleComponent