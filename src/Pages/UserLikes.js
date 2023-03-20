import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetUserLikedComponent } from '../Redux/reducers/userInteractionReducer';
import Spinner from '../Componets/spinner';
import ComponentCard from '../Componets/componet-card'

function UserLikes() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user)
    useEffect(()=>{
            if(user) dispatch(GetUserLikedComponent(user.id))
        },[user, dispatch])
    const uIStore = useSelector((state) => state.userInteraction)
    const uComponents = useSelector((state) => state.userInteraction.UserLikedComponent)
    if(uIStore.loading){
        return(
            <Spinner />
        )
    }
    return(
        <>
        <section>
                <div className="cards_container margin_top_4 margin_section">
                <div className='grid g-3'>
                    {
                       uComponents.map((item)=>{
                            return <ComponentCard key={item.id} {...item}/>
                        })
                    }
                </div>
               
                </div>
            </section>
        </>
    )
}
export default UserLikes