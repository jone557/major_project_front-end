import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai'
import {VscGithub} from 'react-icons/vsc'
import SearchBar from '../../Componets/search-bar'
import logo from '../../Assets/Images/avatar.png'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../../Features/Auth/authSlice'
import AutoOpen from '../../Componets/AutoOpen'
const Navbar = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)
    // useEffect(()=>{
    //      dispatch(userInfo())
    // },[]);
    
    // setUser()
    const onLogout = ()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    // redirect to profile page
    const toProfile = ()=>{
        navigate('/Profile')
    }

    const [showLinks, setShowLinks] = useState(false)
    useEffect(()=>{
        if(showLinks){
            setShowLinks(true)
        }else{
            setShowLinks(false)
        }
    }, [showLinks])
    return(
        <nav>
            {/* nav header */}
            <div className="nav_center margin_section">
                <div className="nav-header center_center gap-1">
                    <Link to="/"><img src={logo} className="logo" alt="logo" /></Link>
                    <AiOutlineMenu className="icon nav-toggle" onClick={()=>{
                        setShowLinks(!showLinks)
                    }} />
                    <Link className='link' to="/components">Components</Link>
                </div>
                {/* nav middle*/}
                <div className="nav_middle_container">
                    <SearchBar/>
                    <AutoOpen/>
                </div>
                {/* nav left */}
                <div className="nav_left_container">
                    <ul>
                        <li><a className='link icon' id='vsCodeIcon' target={'_blank'} href="https://github.com/Engida2312/Major_project_1_front-end"><VscGithub/></a></li>
                        {
                            user ? (<>
                                <li>
                                    <div className="profile_circle_container">
                                        <div className='profile_circle center_center'>
                                            <h4>
                                                {user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()} 
                                            </h4>
                                        </div>
                                        <div className="nav_profile_content">
                                            <ul>
                                                <li><h3>Hi,  {user.firstname}</h3></li>
                                                <li><p className='link' onClick={toProfile} >Profile</p></li>
                                                <li><p className='link' onClick={onLogout} >Logout</p></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </>) : (<>
                                <li><Link className='link' to="/login">Login</Link></li>
                                <li><Link className='btn' to="/Signup">Share your work</Link></li>
                            </>)
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar