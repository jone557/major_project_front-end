import React,{ useState, useEffect } from 'react'
import ComponentCard from '../Componets/componet-card'
import Logo from './../Assets/Images/avatar.png'
import {  useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import swal from 'sweetalert2';
import { SingleUserComponent } from '../Redux/reducers/componentReducer';
import {BsLinkedin, BsGithub} from 'react-icons/bs'

export const Profile = () => {
  const {user} = useSelector((state)=> state.auth)
  const socialLinks = [
    {
      id:1,
      icon: <BsLinkedin/>,
      url: `${user.linkedin}`,
    },
    {
      id:2,
      icon: <BsGithub/>,
      url:   `${user.github}`,
    },
    
  ]
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {siUser_component} = useSelector((state)=> state.component)
  useEffect(()=>{
    dispatch(SingleUserComponent(user.id))
  },[dispatch,user.id])
  // const [userInput,setUserInput] = useState([]);
  // const [error,setError] = useState([]);
  // const [userImage,setUserImage] = useState([]);
  // const [loading, setLoading] = useState(true);

 // redirect to edit profile page
 const toEditProfile = ()=>{
  axios.get(`/editprofile/${user.id}`).then(res=>{       
    if(res.data.status === 200){
      console.log(res.data)
        // setUserInput(res.data.user);
        // setUserImage(res.data.user);
        // setLoading(false);
        navigate(`/Editprofile`)
    }
    else if(res.data.status === 404){
        swal("Error",res.data.message,"error");
    }
  })
}
  const toUploadComponent = ()=>{
    navigate(`/AddComponent`)
  }

  return (
    <div className='user_profile_container  flex col w-90'>
			
         <div className="upper">
	   	<div className="userimage">
	   		<img className="user_img" src={Logo} alt="av"/>

		</div>
	   	<h1 className="profile_h1">{user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1) + ' ' + user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}</h1>
	   	<p className="profile_p">{user.role}</p>

		 <div className="collection">
	   	<button className='btn'>Collections</button>
		</div>
		<div className='liked'>
	   	<button className='btn'onClick={toUploadComponent}>Upload Component</button>
	   
	   </div>

	  <div className='flex col justify_content_sb align_items_l '>

      <button className="btn" onClick={toEditProfile}>Edit Profile</button>
      
      <div className=" ">
        <ul className='flex gap-1 p-1'>
          {
            socialLinks.map((link)=>{
              return(
                <li key={link.id}><a target={'_blank'} className="icon" href={link.url}> {link.icon}</a></li>
                )
              })
            }
        </ul>
      </div>
      </div>
	</div>
	   <hr/>

   <div className="lower">
   
   <section>
     <div className="cards_container margin_top_4 margin_section">
     {
          siUser_component.map((item)=>{
              // console.log(user)
              
              return <ComponentCard key={item.id} {...item}/>
          })
      }
      </div>
        {/* <div className="cards_container margin_top_4 margin_section">
            <ComponentCard/>
            <ComponentCard/>
            <ComponentCard/>
            <ComponentCard/>
        </div> */}
      </section>
   	
   </div>
    </div>
  )
}
