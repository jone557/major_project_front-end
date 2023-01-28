import React, { useState, useEffect } from 'react';

import {useLocation, Navigate, Outlet} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset, userInfo} from '../Features/Auth/authSlice'


function RequiredAuth() {
    const {user} = useSelector((state)=> state.auth)
    const location = useLocation();
    const dispatch = useDispatch()
    console.log('auth')
    console.log(user)
  return (
        user? <Outlet/>
        : <Navigate to='/' state={{ from: location}} replace />
  )
}

export default RequiredAuth