import React from 'react'
import { useState, useEffect } from 'react'
import InfoCard from '../../Componets/Info-card'
import ComponentCard from '../../Componets/componet-card'

import { infoCards } from '../../Assets/Data/data'
import { useDispatch, useSelector } from 'react-redux'
import { homeComponet } from '../../Features/Dashboard/dashboardSlice'
import Spinner from '../../Componets/spinner'
import { AppContext, AppProvider } from '../../context/context'
import { SingleUserRecommendation } from '../../Redux/reducers/userInteractionReducer';

const MainHome = ()=>{
    const user = useSelector((state) => state.auth.user)
    const priviousInteraction = useSelector((state) => state.userInteraction.recommendation)

    
    useEffect(()=>{
        dispatch(homeComponet())
        if(user) dispatch(SingleUserRecommendation(user.id))
    },[])
    const {searchRequest, error, isSearchLoading } = React.useContext(AppContext)

    const [cardData, setCardData] = useState(infoCards)

    const {h_components, isLoading, isSuccess } = useSelector( (state)=> state.dashboard )

    
    const dispatch = useDispatch()
    function scrolll(){
        const left = document.querySelector('.for_you_container');
        if(left) left.scrollBy(-350, 0)        
    }
    function scrollr(){
        const right = document.querySelector('.for_you_container');
        if(right) right.scrollBy(350, 0);
    }

    if(isLoading || isSearchLoading){
        return(
            <Spinner/>
        )
    }
    
    return(
        
        <main>
            <section>
                <div className="row">
                    <div className="col">
                        <div className="output_container">
                        </div>
                    </div>
                    <div className="col">
                        <div className="code_container">
                            
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="info_card_container margin_section">
                    {
                        cardData.map((data)=>{
                            return(
                                <InfoCard key={data.id} data = {data} />
                            )
                        })
                    }
                </div>
            </section>
            
            

          {user? <section>
            <div className='hdr-mrg'>
                    <h1 className='hdr-title-marg'>For you</h1>
            </div>
            <div className="flx_container margin_top_4 margin_section">
            <div className="arrow-box ">
                <button id="Larrow" class="Larrow hov " onClick={scrolll}></button>
            </div>
                <div className='for_you_container'>
                    {
                        Array.isArray(priviousInteraction)? priviousInteraction.map((item)=>{
                        // console.log(user)
                            return <ComponentCard key={item.id} {...item}/>
                        }) : <h1>{priviousInteraction}</h1>
                    }
                </div>
               
                <div className="arrow-box">
                <button id="Rarrow" class="Rarrow hov " onClick={scrollr}></button>
             </div>
                </div>

            </section>
            : ''
            }
            <section>
                <div className="cards_container margin_top_4 margin_section">
                <div className='grid g-3'>
                    {
                        h_components.slice(0, 6).map((item)=>{
                        // console.log(user)
                            return <ComponentCard key={item.id} {...item}/>
                        })
                    }
                </div>
               
                </div>
            </section>
        </main>
    )
}

export default MainHome
