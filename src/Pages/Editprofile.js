import React from "react";
import { Link } from "react-router-dom";
import './../Assets/Styles/editprofile.css'
import Logo from './../Assets/Images/avatar.png'
import Pvalidation from "./Pvalidation";
import { useState, useEffect } from "react";
import axios from "axios";
// import swal from 'sweetalert2';
import swal from 'sweetalert';
import {useSelector, useDispatch} from 'react-redux'
import { userUpdate } from "../Features/updateSlice";
import  {userInfo}  from "../Features/Auth/authSlice"

function Editprofile () {
  const { user } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [newUser, setNewUser] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    github: user.github,
    linkedin: user.linkedin,
  });
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userInfo())
  }, [dispatch]);

  const handleInput = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const updateUser = (e) => {
    e.preventDefault();
    const userData = new FormData();

      userData.append('firstname', newUser.firstname);
      userData.append('lastname', newUser.lastname);
      userData.append('email', newUser.email);
      userData.append('github', newUser.github);
      userData.append('linkedin', newUser.linkedin);
     
    axios.post(`/updateprofile/${user.id}`, userData)
    .then((res) => {
      if (res.data.status === 200) {
        swal('Success', res.data.message, 'success');
      } else if (res.data.status === 404) {
        swal('Error', res.data.message, 'error');
      }
    });
    setErrors(Pvalidation(newUser));
  };

  return (
    <div>
      <div className="right">
        <h2 className="edit_h2">Edit Profile</h2>
        <form className="form-style-1" onSubmit={updateUser}>
          <label>Full Name</label>
          <input type="text" className="field-divided" placeholder="First" name="firstname" onChange={handleInput} value={newUser.firstname} />
          {errors?.firstname && <p className="error">{errors.firstname}</p>}
          <input type="text" className="field-divided" placeholder="Last" name="lastname" onChange={handleInput} value={newUser.lastname} />
          {errors?.lastname && <p className="error">{errors.lastname}</p>}
          <label>Email</label>
          <input type="email" className="field-long" onChange={handleInput} name="email" value={newUser.email} />
          {errors?.email && <p className="error">{errors.email}</p>}
          <label>LinkedIn Link</label>
          <input type="text" name="linkedin" className="field-long" onChange={handleInput} value={newUser.linkedin} />
          <label>Github Link</label>
          <input type="text" name="github" className="field-long" onChange={handleInput} value={newUser.github} />
          <button type="submit" className="btn save">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default Editprofile
