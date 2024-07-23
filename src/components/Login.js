import React from 'react'
import Header from './Header'
import { BG_URL } from '../utils/constants'

const Login = () => {
  return (
    <div>
      <Header />
    <div className="absolute"> 
      <img src={BG_URL} alt="background" />
    </div>
    <form className='absolute p-12 w-4/12 bg-black my-36 m-auto right-0 left-0 text-white bg-opacity-80'>
    <h1 className='font-bold text-3xl py-4'>Sign In</h1>
      <input type="text" placeholder="Email Address" className='p-4 my-4 w-full bg-gray-700 rounded-lg'/>
      <input type="password" placeholder='password' className='p-4 my-4 w-full bg-gray-700 rounded-lg'/>
      <button className='bg-red-700 p-4 my-6 w-full rounded-lg'>Sign In</button>
      <p className='py-4'>New to Netflix? Sign Up Now</p>
    </form>
    </div>
     
  )
}

export default   Login
