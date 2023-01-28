
import { React, useState, useEffect } from 'react'
import InfoCard from '../../Componets/Info-card'
import ComponentCard from '../../Componets/componet-card'

import { infoCards } from '../../Assets/Data/data'
import { useDispatch, useSelector } from 'react-redux'
import { homeComponet } from '../../Features/Dashboard/dashboardSlice'
import Spinner from '../../Componets/spinner'

const MainHome = ()=>{
    const [cardData, setCardData] = useState(infoCards)

    const {h_components, isLoading, isSuccess } = useSelector( (state)=> state.dashboard )

    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(homeComponet())
    },[])

    if(isLoading){
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
