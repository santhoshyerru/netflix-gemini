import React, { useRef, useState } from 'react'
import Header from './Header'
import { BG_URL } from '../utils/constants'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const handleSignInUp = ()=>{
    setIsLoginForm(!isLoginForm);
  }
  const handleButtonClick = ()=>{
    let message;
    if(name.current)
    message = checkValidData(name.current.value, email.current.value, password.current.value)
    setErrorMessage(message);
    if(message) return
    if(!isLoginForm){
      //Sign Up form
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/67948067?s=400&u=27c23c6903702ec5502612a7e4627d12c07afe9c&v=4"
        }).then(() => {
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
          navigate("/browse");
        }).catch((error) => {
          setErrorMessage(error.message)
        });
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }
    else{
      // sign in form
      signInWithEmailAndPassword(auth,  email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("/browse")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage)
      });

    }
  }
  return (
    <div>
      <Header />
    <div className="absolute"> 
      <img src={BG_URL} alt="background" />
    </div>
    <form onSubmit={(e)=>e.preventDefault()} className='absolute p-12 w-4/12 bg-black my-36 m-auto right-0 left-0 text-white bg-opacity-80'>
    <h1 className='font-bold text-3xl py-4'>{isLoginForm ? "Sign In" : "Sign Up"}</h1>
    {!isLoginForm && 
      <input type="text" placeholder='Full Name' ref={name} className='p-4 my-4 w-full bg-gray-700 rounded-lg'/>
      }
      <input type="text" placeholder="Email Address" className='p-4 my-4 w-full bg-gray-700 rounded-lg' ref={email}/>
      <input type="password" placeholder='password' className='p-4 my-4 w-full bg-gray-700 rounded-lg' ref={password}/>
      <p className='text-red-500 font-bold text-xl'>{errorMessage}</p>
      <button  onClick={handleButtonClick} className='bg-red-700 p-4 my-6 w-full rounded-lg'>{isLoginForm ? "Sign In" : "Sign Up"}</button>
      <p onClick={handleSignInUp} className='py-4'>{isLoginForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In"}</p>
    </form>
    </div>
     
  )
}

export default   Login
