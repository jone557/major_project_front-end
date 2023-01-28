import React, { useState, useEffect, Component } from 'react';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GetCategory } from './Redux/reducers/categoryReducer';
import { GetComponent } from './Redux/reducers/componentReducer';
import RequiredAuth from './Componets/RequiredAuth';
// ****user pages ****
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import AddComponents from './Pages/AddComponent';
import { Profile } from './Pages/Profile';
import Components from './Pages/Components';
import DemoIframe from './Pages/demo_iframe'
import AllUsers from './Pages/Allusers'
import AllComponents from './Pages/Admin/allComponents';
// import Error from './Pages/Error';
// ****admin pages*****
import Dashboard from './Pages/Admin/dashboard';
import AddCategory from './Pages/Admin/AddCategory';
import UpdateCategory from './Pages/Admin/UpdateCategory';
// import Landing from './Pages/Admin/landingPage';
import ItemProfile from './Pages/Admin/ItemProfile';
import EditComponent from './Pages/EditComponent';
// ****shared layouts*****
import ClientSharedLayout from './Layers/SharedLayouts/ClientSharedLayout';
import AdminSharedLayout from './Layers/SharedLayouts/AdminSharedLayout'
import ComponentSharedLayout from './Layers/SharedLayouts/ComponentSharedLayout';

import Editprofile from './Pages/Editprofile'
import SingleComponent from './Pages/SingleComponent'
import SingleCategory from './Layers/Singel Category/SingelCategory'

import './index.css'
import './Assets/Styles/footer.css'
import './Assets/Styles/componentsPage.css'
import './Assets/Styles/nav.css'
import './Assets/Styles/links.css'
import './Assets/Styles/button.css'
import './Assets/Styles/icons.css'
import './Assets/Styles/list.css'
import './Assets/Styles/header.css'
import './Assets/Styles/card.css'
import './Assets/Styles/main-home.css'
import './Assets/Styles/signup.css'
import './Assets/Styles/admin.css'
import './Assets/Styles/profile.css'
import './Assets/Styles/accordion.css'

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

// axios.interceptors.request.use(function (config){
//   const token = localStorage.getItem('token');
//   config.headers.Authorization = token ? `Bearer ${token}` : '';
//   return config;
// });

function App() {
  const dispatch = useDispatch()
    useEffect(()=>{
      // res = dispatch(userInfo())
      dispatch(GetCategory())
      dispatch(GetComponent())
  
    },[dispatch]);

  return <>
    <Router>
      <Routes>
        <Route path='/' element={<ClientSharedLayout />}>
          <Route index element={<Home />} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route path='profile' element={<Profile />} />
          <Route path='editprofile' element={<Editprofile />} />
          <Route path='components/:id' element={<SingleComponent />} />
          <Route path='components/updateCategory/:id' element={<UpdateCategory />} />
          <Route path='*' element={<DemoIframe />} />
          <Route path='AddComponent' element={<AddComponents />} />
          <Route path='component/edit/:id' element={<EditComponent />} />
          <Route path='/components' element={<ComponentSharedLayout />}>
            <Route index element={<Components />} />
            <Route path='category/:id' element={<SingleCategory />} />
          </Route>
        </Route>
        {/* we want to protect these routes */}
        <Route element={<RequiredAuth />}>
          <Route path='/dashboard' element={<AdminSharedLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='login' element={<Login />} />
            <Route path='addCategory' element={<AddCategory />} />
            <Route path='allComponents' element={<AllComponents />} />
            <Route path='allusers' element={<AllUsers />} />
            <Route path='AddComponent' element={<AddComponents />} />
            <Route path='user/profile/:id' element={<ItemProfile />} />
            <Route path='component/edit/:id' element={<EditComponent />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    <ToastContainer
      draggable={false}
      transition={Zoom}
      autoClose={8000}
    />
  </>;
}

export default App;
