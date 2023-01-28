import React from 'react'
import '../../Assets/Styles/item_profile.css'
import {useSelector, dispatch} from 'react-redux'

function ItemProfile() {
    // const {singleUser: {}} = useSelector( (state)=> state)
//    console.log('profile')
//    console.log(singleUser)
  return (
    <div  className="admin_main_container">

        <div className="user_profile_container"  >
            
            <div className="dashbord-header">
                <h3>User Profile</h3>
                <div className="action_container">
                    {/* <%if(user.status === "Active"){%> */}
                        <a href=""><span id="danger_btn">Deactivate</span></a>
                    {/* <%}else if(user.status === "Inactive"){%> */}
                        <a href=""><span id="success_btn">Activate</span></a>
                    {/* <%}%> */}
                </div>
            </div>
            <div className="user_profile_main">  
                <div className="user_image_and_name">
                    {/* <img src="" alt="" /> */}
                    {/* <h1 >{user.fullname}</h1> */}
                </div>
            
                <div className="user_basic_info">
                    <div className="user_profile_info">
                        
                        <p><strong>Full Name: </strong>user.FullName</p>

                    </div>
                    <div  className="user_profile_info">
                        
                        <p><strong>Email: </strong> user.Email</p>
                        
                    </div>
                
                    <div  className="user_profile_info">
                    
                        <p><strong>Phone Number: </strong>=user.PhoneNumber</p>

                    </div>
                </div>
                <div>
                    <h3>Contributions</h3>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemProfile