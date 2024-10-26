import React, { useContext } from 'react'
import { useEffect } from 'react'
import {Navigate} from "react-router-dom"
import {BlogContext} from '../Context/UserContext.jsx'

const Logout = () => {

  const {Logout} = useContext(BlogContext);

  useEffect(()=>{
    Logout();
  } , [])
  return <Navigate to={'/'}/>
}

export default Logout