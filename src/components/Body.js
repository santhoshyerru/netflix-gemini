import { createBrowserRouter } from "react-router-dom"
import { RouterProvider} from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth";
import {useEffect} from "react";
import React from 'react'
import {auth} from "../utils/firebase"
import Login from './Login'
import Browse from './Browse'
import {useDispatch} from "react-redux"
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const Body = () => {
  const dispatch = useDispatch()

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/browse",
      element: <Browse />
    }
  ])
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
        // ...
      } else {
        dispatch(removeUser());

      }
    });
  }, [])
  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
