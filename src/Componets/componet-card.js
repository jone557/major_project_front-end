
import Button from '../Componets/button'
import {AiFillEye}from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import defaultAvatar from '../Assets/Images/avatar.png'
import '../Assets/Styles/profile_card.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { display } from '@mui/system'
import { DelateComponent } from '../Redux/reducers/componentReducer'

const ComponentCard = ({id, user_id, name, category_id, viewes, likes, created_at, firstname})=>{
    const {user, isLoading} = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onEdit = ()=>{
        navigate(`/component/edit/${id}`)
    }
    const onDelete = ()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            dispatch(DelateComponent(id))
              navigate('/')
            }
          })
    }
    return<>
        <div className="card wrapper align_items_c" onClick={() => { navigate('/components/' + (id)) }}>
           <div className="card_top center_center gap-1">
                <h3 className='center_centeer'>{name}</h3>
           </div>
           <div className="card_bottom center_center gap-1">
                <div className='card_detail_left center_center gap-0_5'>
                    <a href=""><img src={defaultAvatar} className='profile_img' alt="profile" /></a>
                    <p>{firstname}</p>
                    <p></p>
                </div>

                <div className='card_detail_right center_center gap-0_5'>
                    <AiFillHeart/><span>{likes}</span>
                    <AiFillEye/><span>{viewes}</span>
                </div>
           </div>
           {
               ( user && user?.id == user_id ) || user?.role == 'admin'? (<>
                     <div className="content ">
                        <br />
                        <hr />
                        <h4>More content</h4>
                        <br/>
                        <div className="center_center justify_content_sb ">
                            <div className='flex justify_content_sb w-100'>
                                <button style={{backgroundColor: '#e6cd42'}} className='btn deactivate-btn' 
                                    onClick={onEdit}>Edit
                                </button>
                                <button className='btn deactivate-btn' 
                                    onClick={onDelete}>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </>) : (<>
                    
                </>)
            }
          
        </div>
    </>
}

export default ComponentCard;