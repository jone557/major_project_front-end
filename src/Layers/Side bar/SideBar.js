import React, {useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux'
import { SingleCategory } from '../../Redux/reducers/categoryReducer';
const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categorystore = useSelector((state) => state.category)
  const categorys = categorystore.categorys
  const[clicked, setClicked] = useState()

  const Highlighting = (id) => {
    setClicked(id);
    dispatch(SingleCategory(id));
    navigate('/components/category/' + (id));
    const lists = document.querySelectorAll('.sid-element');
    lists.forEach(list => {
     
      list.classList.remove('highligh-backgroung')
    });
     document.getElementById('sid' + id).classList.add('highligh-backgroung');
   
  }

  return (
    <div className='side-bar-container'>
        <div className='side-bar'>
            <h1 className='sid-hdr-mrg'>Components</h1>
            <div className='sid-elem-cont' >
              {categorys.map(category => (
                  <div id={'sid' + (category.id)} className='sid-element hvr-backgroung ' key={category.id} >
                  
                      <input className='dis-none' type='radio' name='component' id={category.id} onClick={()=>{Highlighting(category.id)}}  ></input>
                  
                    <label className='hvr-pointer' htmlFor={category.id}>{category.title} </label>
                  </div>
              ))}
            </div>
        </div>
    </div>    
  )
}
export default SideBar