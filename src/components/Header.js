import React from 'react'
import { LOGO } from '../utils/constants'
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user)
  const handleSignOut =()=>{
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
     
  }
  return (
    <div className="flex w-screen justify-between absolute px-8 py-2 bg-gradient-to-b from-black z-10">
      <img className="w-44" src={LOGO} alt="logo"/> 
      {user &&  
      <div className="flex p-2">
        <img className="w-12 h-12" src={user?.photoURL} alt="usericon" />
        <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
      </div>
    }
    </div>
  )
}

export default Header 
