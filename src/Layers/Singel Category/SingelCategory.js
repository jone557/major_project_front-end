import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import defaultAvatar from '../../Assets/Images/avatar.png'
import { SingleCategoryComponent as Unique } from '../../Redux/reducers/componentReducer';
import { useParams } from "react-router-dom";
import SideBar from '../Side bar/SideBar'
import Spinner from '../../Componets/spinner'
import ComponentCard from '../../Componets/componet-card'


const SingelCategory = () => {
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Unique(id))

    }, [id]);

    // dispatch(SingleCategory(id));

    let navigate = useNavigate();
    const categorystore = useSelector((state) => state.category)
    const category = categorystore.si_category
    const componentstore = useSelector((state) => state.component)
    const singlecomponent = componentstore.siCategory_component


    if (categorystore.error || componentstore.error) {
        return (
            <h1 style={{ backgroundColor: 'red' }}>network error please connect to internet</h1>
        )
    }
    if (categorystore.loading || componentstore.loading) {
        return (
            <Spinner/>
        )
    }
    return (
        <>
            {/* <div className='side-bar-container'>

                <div className='side-bar'>
                    <Link to='/components'><h1 className='sid-hdr-mrg'>Components</h1></Link>
                    <SideBar />
                </div>
            </div> */}
            <div className='compnent-elements'>

                <div className='hdr-mrg' >
                    <h1 className='hdr-title-marg'>{category.title}</h1>
                    <p className='comp-sub-title sub-title-marg'>{category.discription}</p>
                </div>
                <div className='comp-sub-section sub-section-marg'>
                   
                    <div className='comp-snipt-container'>
                        <div>
                            <h1 className='comp-sub-elem-hdr sub-elem-hdr-marg'>Available components</h1>
                        </div>
                        
                        {
                            singlecomponent.length === 0 ?
                                <h6 className='comp-sub-elem-hdr sub-elem-hdr-marg comp-steps-container'>no components to display </h6>
                                :
                                singlecomponent.map(element => (
                                    <ComponentCard key={element.id} {...element} />
                                    // <div className="card sub-elem-hdr-marg" key={element.id} onClick={() => { navigate('/components/' + (element.id)) }} >

                                    //     <div className='comp-sub-title sub-elem-hdr-marg '>
                                    //         <code>
                                    //             {element.code_referance}
                                    //         </code>
                                    //     </div>
                                    //     <div className="card_bottom center_center gap-1">
                                    //         <div className='card_detail_left center_center gap-0_5'>
                                    //             <a href=""><img src={defaultAvatar} className='profile_img' alt="profile" /></a>
                                    //             <p>yohannes</p>
                                    //         </div>

                                    //         <div className='card_detail_right center_center gap-0_5'>
                                    //             <AiFillHeart /><span>{element.likes}</span>
                                    //             <AiFillEye /><span>{element.viewes}</span>
                                    //         </div>
                                    //     </div>
                                    // </div>
                                ))

                        }

                        


                    </div>
                </div>
            </div>
        </>


    )
}
export default SingelCategory