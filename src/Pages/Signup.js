import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import validation from "./validation";
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {register, reset}  from '../Features/Auth/authSlice'
import Spinner from '../Componets/spinner'

function Signup() {
  const [errors, setErrors] = useState(null);

    const [formData, setFormData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: "",
    })

    //destructure the form data use state
    const {firstname, lastname, email, password} = formData
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const {user, isLoading, isError, isSuccess, message } = useSelector( (state)=> state.auth    )
  
    useEffect(()=>{
      if(errors != null && Object.keys(errors).length === 0){
        // dispatch(register(formData))
      }
      
      if(isSuccess || user){
        navigate('/')
      }

      // dispatch(reset())
      
    }, [errors, user, isError, isSuccess, message, navigate, dispatch])
  
    // on change function
    const onChange = (e)=>{
      setFormData((previousState)=>({
          ...previousState,
          [e.target.name]: e.target.value,
        })
      )
    }

    // on submit function
    const onSubmit = (e)=>{
      e.preventDefault()
          setErrors(validation(formData));
          dispatch(register(formData))
        const userData = {
          firstname,
          lastname,
          email,
          password,
        }
      
    }

    
  if(isLoading){
      return <Spinner/>
  }
  return(

  <div id="signup_body">
    <div className="signup_container">
	    <div className="form-container">
            <form onSubmit={onSubmit}  className="signup_form">
                <div className="signup_login">
                    <p className="signup_member">Already Member?</p>
                    <Link id="signup_a" to="/login">LOGIN</Link>
                </div>
                <h1 id="signup_h1">Sign up</h1>
                <p className="signup_title">Discover The World's Top Creatives</p>
                <div className="signup_inside">
                    <label className="signup_label">First Name</label>
                    <input 
                        className="signup_input" 
                        type="text" 
                        id="firstname" 
                        name="firstname" 
                        value={firstname} 
                        onChange={onChange} 
                    />
                    {errors?.firstname && <p className="error">{errors.firstname}</p>}

                    <label className="signup_label">Last Name</label>
                    <input 
                        className="signup_input" 
                        type="text" 
                        id="lastname" 
                        name="lastname" 
                        value={lastname} 
                        onChange={onChange} 
                    />
                    {errors?.lastname && <p className="error">{errors.lastname}</p>}

                    <label className="signup_label">Email</label>
                    <input 
                        className="signup_input" 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={onChange}
                    />
                    {errors?.email && <p className="error">{errors.email}</p>}

                    <label className="signup_label">Password</label>
                    <input 
                        className="signup_input" 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}  
                        onChange={onChange} 
                    />

                    {errors?.password && <p className="error">{errors.password}</p>}
                    
                    {/* <div className="signup_check">
                        <input 
                            id="signup_checkbox" 
                            type="checkbox"
                            required/>
                        <label id="signup_boxagree" htmlFor="checkbox"> I agree to these <a className="termandcondition" href="#">Terms and Conditions</a>.</label>
                    </div> */}
                    <button type='submit' id="signup_button">CREATE ACCOUNT</button>
                </div>
		    </form>
        </div>
        <div className="sign_up_right">
             <h1 id="signup_h1">Welcome To EYN!</h1>
        </div>
    </div>
    </div>
  );
}
export default Signup;
