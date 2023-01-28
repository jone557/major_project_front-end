import SearchBar from "../../Componets/search-bar";
import Logo from '../../Assets/Images/avatar.png'
import { Link, useNavigate } from "react-router-dom";
import {GoDashboard} from 'react-icons/go'
import {CgComponents} from 'react-icons/cg'
import {MdOutlineCategory} from 'react-icons/md'
import {FiUsers} from 'react-icons/fi'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset, userInfo} from '../../Features/Auth/authSlice'
import '../../Assets/Styles/admin-sidebar.css'
import { useState, useEffect } from "react";


const AdminSidebar = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selected, setSelected] = useState(null)
    const [active, setActive] = useState(null)
    const {user } = useSelector( (state)=> state.auth )
//     useEffect(()=>{
//         dispatch(userInfo())
//    },[]);

    // active for accordion 
    const isActive = (i)=>{
        if(selected === i){
            return setActive(null);
        }
        setActive(i)
    }

    // toggle for accordion 
    const toggle = (i)=>{
        if(selected === i){
            return setSelected(null);
        }
        setSelected(i)
    }

    // logout
    const onLogout = ()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
     // allusers
     const onAllUser = ()=>{
        navigate('/dashboard/allusers')
    }
    const onAllComponents = ()=>{
        navigate('/dashboard/allComponents')
    }
    const onAddComponent = ()=>{
        navigate('/dashboard/AddComponent')
    }
  return <>
    <nav className="flex justify_content_sb align_items_c admin_top_nav">
        <SearchBar/>
        <li><p className='btn' onClick={onLogout} >Logout</p></li>
    </nav>
    <div className="a_sidebar_container">
        <div className="a_sidebar_top">
            <div className="col center_center m-2">
                <img src={Logo} className="avatar" alt="image" />
                <h3>{
                    user.firstname.charAt(0).toUpperCase()
                    + user.firstname.slice(1) 
                    + " " + user.lastname.charAt(0).toUpperCase()
                    + user.lastname.slice(1)
                    }
                </h3>
            </div>
        </div>
        <div className="a_sidebar_bottom center_center col">
            <ul>
                <li className={selected === 0 ? ('accordion_header link active') : ('accordion_header link')}  onClick={()=>toggle(0)} >
                    <Link to="/dashboard" className="link"><GoDashboard /> Dashbord</Link>
                    </li>
                <li className={selected === 1 ? ('accordion_header link active') : ('accordion_header link')}  onClick={()=>toggle(1)} ><CgComponents/> Components</li>
                <ul className={selected === 1 ? ('accordion_body_container show') : ('accordion_body_container')} >
                    <div className="accordion_body">
                        <li className={active === 10 ? ('active') : ('')}  onClick={()=>isActive(10)}>
                            <p href="/all-events"  onClick={onAllComponents}>All Components</p>
                        </li>
                        {/* <li className={active === 11 ? ('active') : ('')}  onClick={()=>isActive(11)}>
                            <a href="/event/all/active">New Components</a>
                        </li> */}
                        <li  className={active === 12 ? ('active') : ('')}  onClick={()=>isActive(12)}>
                            <p onClick={onAddComponent}> Add Components</p>
                        </li>
                    </div>
                </ul>
                <li className={selected === 2 ? ('accordion_header link active') : ('accordion_header link')}  onClick={()=>toggle(2)}><MdOutlineCategory/>Catagory</li>
                <ul className={selected === 2 ? ('accordion_body_container show') : ('accordion_body_container')} >
                    <div className="accordion_body">
                        {/* <li className={active === 20 ? ('active') : ('')}  onClick={()=>isActive(20)}>
                            <a href="/all-inactive-organizers">All Catagories</a>
                        </li> */}
                        <li className={active === 21 ? ('active') : ('')}  onClick={()=>isActive(21)}>
                            <Link to='/dashboard/addCategory' >Add catagory</Link>
                        </li>
                    </div>
                </ul>
                <li className={selected === 3 ? ('accordion_header link active') : ('accordion_header link')}  onClick={()=>toggle(3)}><FiUsers/> Users </li>
                <ul className={selected === 3 ? ('accordion_body_container show') : ('accordion_body_container')} >
                    <div className="accordion_body">
                        <li className={active === 31 ? ('active') : ('')}  onClick={()=>isActive(31)}>
                            <p onClick={onAllUser}>All users</p>
                        </li>
                    </div>
                </ul>
            </ul>
        </div>
    </div>
  </>
}

export default AdminSidebar;