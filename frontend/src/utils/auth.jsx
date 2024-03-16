import React from 'react'
import { jwtDecode } from 'jwt-decode'

export const AdminAuth = () => {
  let auth = false;
      const data = jwtDecode(localStorage.getItem("token")).isAdmin
      if(data){
        auth= true
      }
  
  return auth
}
