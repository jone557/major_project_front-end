import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import validation from "./validation";
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {login, reset, userInfo}  from '../Features/Auth/authSlice'
import Spinner from '../Componets/spinner'

function Login() {
    const [formData, setFormData] = useState({
      email: '',
      password: "",
    })
    //destructure the form data use state
    const {email, password} = formData
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const {user, isLoading, isError, isSuccess, message } = useSelector( (state)=> state.auth )
  
    useEffect(()=>{
      console.log('login')
     
      if(isSuccess || user){
        if(user.role === 'admin'){
          setTimeout(()=>{
            navigate('/dashboard')
          }, 1000)
        }else{
          setTimeout(()=>{
            navigate('/')
          }, 1000)
        }
      }else {
        navigate('/login')
      }
  
      dispatch(reset())
     
    }, [user, isError, isSuccess, message, navigate, dispatch])
  
    if(isLoading){
        return <Spinner/>
    }
  
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
      const userData = {
        email,
        password,
      }
      dispatch(login(userData))
      dispatch(reset())
    }

    return(
      <div id="signup_body">
            <div className="signup_container">
                <div className="form-container">
                    <form onSubmit={onSubmit}  className="signup_form">
                        <div className="signup_login">
                            <p className="signup_member">Are you New Here?</p>
                            <Link id="signup_a" to="/signup">SIGNUP</Link>
                        </div>
                        <h1 id="signup_h1"> Login</h1>
                        <p className="signup_title">Discover The World's Top Creatives</p>
                        <div className="signup_inside">
                            {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}

                            <label className="signup_label">Email</label>
                            <input 
                                className="signup_input" 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={email} 
                                onChange={onChange}
                            />
                            {/* {errors.email && <p className="error">{errors.email}</p>} */}

                            <label className="signup_label">Password</label>
                            <input 
                                className="signup_input" 
                                type="password" 
                                id="password" 
                                name="password" 
                                value={password}  
                                onChange={onChange} 
                            />
                            {/* {errors.password && <p className="error">{errors.password}</p>} */}
                            
                            <Link id="passforget" to="">Forgot Password?</Link>
                            {/* <button id="signup_button" onClick={handleFormSubmit}>LOGIN</button> */}
                            <button id="signup_button" disabled={isLoading}>{ isLoading ? 'Loading...' : 'Submit' }</button>
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
export default Login;
