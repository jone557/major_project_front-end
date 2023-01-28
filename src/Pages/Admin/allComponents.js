

import { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ComponentsContainer from '../../Componets/ComponentsContainer';
import SearchContainer from '../../Componets/SearchContainer';
// import {userProfile, reset}  from '../Features/Users/usersSlice'


const AllComponents = () => {
    // const {components, isLoading, isSuccess, message } = useSelector( (state)=> state.allComponents )
    
    // const navigate = useNavigate();
    // const dispatch = useDispatch()

    return <>
        <div className="admin_main_container">
            <SearchContainer/>
            
            <ComponentsContainer/>

        </div>
    </>
}

export default AllComponents;
