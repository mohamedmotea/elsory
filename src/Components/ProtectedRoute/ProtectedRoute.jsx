import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
  const navigate = useNavigate()
useEffect(()=>{
  if(localStorage.getItem('token') == null){
  return  navigate('/login')
  }

},[])
    return (
      children
    )
  
}
