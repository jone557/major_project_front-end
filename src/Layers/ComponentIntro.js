import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ComponentCard from '../Componets/componet-card'
import Spinner from '../Componets/spinner'
import { homeComponet } from '../Features/Dashboard/dashboardSlice'

export default function ComponentIntro() {
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
    return (
        <>
            <div className='hdr-mrg' >
                <h1 className='hdr-title-marg'>Overview</h1>
                <p className='comp-sub-title sub-title-marg'>Our Components are simple, highly customizable and easy to use </p>
            </div>
            <div className='comp-sub-section sub-section-marg'>
                <h1 className='comp-sub-header hdr-title-marg '>Introduction</h1>
                <p className='comp-sub-title sub-title-marg'>You are easy two steps behind to create a highly responsive web app. </p>
                <div className='comp-steps-container'>
                    <h1 className='comp-sub-elem-hdr sub-elem-hdr-marg'>Steps</h1>
                    <ol className='comp-sub-title '>
                        <li>
                            1. choose the component you want to use from the side bar.
                        </li>
                        <li>
                            2. take a look  on the compnent you choose and copy the code.
                        </li>
                    </ol>
                </div>
                <div className='comp-snipt-container w-100'>
                    <h1 className='comp-sub-elem-hdr sub-elem-hdr-marg p-1'>Top components</h1>
                    <div className='grid g-2'>
                    {
                        h_components.slice(0, 6).map((item)=>{
                        // console.log(user)
                            return <ComponentCard key={item.id} {...item}/>
                        })
                    }
                </div>
                </div>
            </div>
        </>
    )
}

