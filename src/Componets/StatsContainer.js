import React from 'react'
import StatCard from './stat-card'
import { useSelector } from 'react-redux'
import '../Assets/Styles/admin-card.css'
import {BsArrowUpRight} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Spinner from './spinner'

const StatsContainer = () => {
    const {userCount, componentCount, categoryCount, isLoading} = useSelector((state)=> state.dashboard)
    // console.log(userCount)
    if(isLoading){
        return(
            <Spinner/>
        )
    }
  return <>
    <div className="flex stat_card_container">
    <div className="row card stat_card gap-1" style={{borderBottom:'#e6cd42 solid 6px'}}>
            <div className="col stat_1">
                <article>
                    <h3 style={{color: '#e6cd42'}}>Users </h3>
                    <p>Total</p>
                    <h3 style={{color: '#e6cd42'}}>{userCount}</h3>
                </article>
            </div>
            <div className="col">
                <div>
                    <Link to='/dashboard/allusers'>
                        <BsArrowUpRight/>
                    </Link>
                </div>
                
            </div>
        </div>
        <div className="row card stat_card gap-1"  style={{borderBottom:'#e68442 solid 6px'}}>
            <div className="col stat_2">
                <article>
                    <h3 style={{color: '#e68442'}}>Components </h3>
                    <p>Total</p>
                    <h3 style={{color: '#e68442'}}>{componentCount}</h3>
                </article>
            </div>
            <div className="col">
                <div><BsArrowUpRight/></div>
    
            </div>
        </div>
        <div className="row card stat_card gap-1" style={{borderBottom:'#70e642 solid 6px'}}>
            <div className="col stat_3">
                <article>
                    <h3 style={{color: '#70e642'}}>Cateory </h3>
                    <p>Total</p>
                    <h3 style={{color: '#70e642'}}>{categoryCount}</h3>
                </article>
            </div>
            <div className="col">
                <div><BsArrowUpRight/></div>
                
            </div>
        </div>
    </div>
        
  </>
    
}

export default StatsContainer