
import React, { Fragment ,useRef,useState,useEffect} from 'react'
import './LoginSignup.css'
import Loader from '../layout/Loader/Loader'
import {Link} from "react-router-dom"
import { MdMailOutline ,MdLockOpen ,MdFaceIcon, MdFace2} from 'react-icons/md'
import {useDispatch,useSelector} from "react-redux"
import { clearErrors,login ,register} from '../../actions/userAction'
import {useAlert} from "react-alert";
import {useNavigate} from "react-router-dom"
import { useLocation,useParams } from 'react-router-dom'


const  LoginSignup=()=> {
    const location=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const params=useParams()
    const alert=useAlert();


    const {error,loading ,isAuthenticated}=useSelector(state=>state.user)

    const loginTab=useRef(null)
    const registerTab=useRef(null)
    const switcherTab=useRef(null)

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",

    })
    const {name,email,password}= user;
    
    const [avatar,setAvatar]=useState()
    const[avatarPreview,setAvatarPreview]=useState("/Profile.png");

    const loginSubmit=(e)=>{
        e.preventDefault();
        // console.log(" Login Form submited")
        dispatch(login(loginEmail,loginPassword))
    }
    const registerSubmit=(e)=>{
        e.preventDefault();
        const myForm= new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avatar",avatar);
        // console.log("Sign Up Form Submited")
        dispatch(register(myForm))
    };

    const registerDataChange=(e)=>{
        if(e.target.name==="avatar"){
            const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0])
        }
        else{
            setUser({...user,[e.target.name]:e.target.value})
        }

    }

    // console.log(location.state.redirect)
    const redirect=
    location?location.state?location.state.redirect:"account":"account"

    console.log(redirect)
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(isAuthenticated){
            navigate(`/${redirect}`)
        }
    },[dispatch,error,alert,navigate,isAuthenticated])

    const switchTabs=(e,tab)=>{
        if(tab==="login"){
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")
            // console.log(switcherTab.current.classList)
            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
            console.log(registerTab.current.classList)
        }
        if(tab==="register"){
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")
            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")

        }


    }

  return (

    <Fragment>(loading ?<Loader/> :
    <Fragment>
        <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
                <div>
                    <div className="login_signUp_toggle">
                        <p onClick={(e)=> switchTabs(e,"login")}>LOGIN</p>
                        <p onClick={(e)=> switchTabs(e,"register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <MdMailOutline/>
                        <input type="email"
                        placeholder='Email' 
                        required
                        value={loginEmail}
                        onChange={(e)=>setLoginEmail(e.target.value)}/>
                    </div>
                    <div className="loginPassword">
                        <MdLockOpen/>
                        <input type="password"
                        placeholder='Password'
                        required 
                        value={loginPassword}
                        onChange={(e)=>setLoginPassword(e.target.value)}/>
                    </div>
                    <Link to="/password/forgot">Forgot Password ?</Link>
                    <input type="submit"  value="login" className='loginBtn'/>
                </form>
                <form className='signUpForm'
                ref={registerTab}
                encType='multipart/form-data'
                onSubmit={registerSubmit}>
                    <div className='signUpName'>
                        <MdFace2/>
                        <input type="text"
                        placeholder='Name'
                        required 
                        name='name'
                        value={name}
                        onChange={registerDataChange}/>
                    </div>
                    <div className="signUpEmail">
                        <MdMailOutline/>
                        <input type="email"
                        placeholder='Email'
                        required 
                        name='email'
                        value={email}
                        onChange={registerDataChange}/>
                    </div>
                    <div className="signUpPassword">
                        <MdLockOpen/>
                        <input type="password"
                        placeholder='Password'
                        required 
                        name='password'
                        value={password}
                        onChange={registerDataChange}/>
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input type="file"
                        name='avatar'
                        accept='image/'
                        onChange={registerDataChange} />
                    </div>
                    <input type="submit"
                    value="Register"
                    className='signUpBtn'
                    // disabled={loading ? true:false} 
                    />

                </form>
            </div>
        </div>
    </Fragment>
    )</Fragment>
  )
}

export default LoginSignup

//7:57:01