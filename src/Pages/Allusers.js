import { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../Assets/Styles/table.css'
import SearchContainer from '../Componets/SearchContainer';
import UsersContainer from '../Componets/UsersContainer';
// import {userProfile, reset}  from '../Features/Users/usersSlice'


const AllUsers = () => {
    const {users, isLoading, isSuccess, message } = useSelector( (state)=> state.allUsers )
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // find single user profile 
    // const findUser = (id)=>{
    //     // console.log('click')
    //     dispatch(userProfile(id))
    //     navigate(`/dashboard/user/profile/${id}`)
    // }

    return <>
        <div className="admin_main_container">
            <SearchContainer/>
            
            <UsersContainer/>

            {/* <table>
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td onClick={()=>findUser(u.id)} data-column="First Name">{u.firstname}</td>
                            <td data-column="Last Name">{u.lastname}</td>
                            <td data-column="Job Title">{u.email}</td>
                            <td data-column="Twitter">{u.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    </>
}

export default AllUsers;
