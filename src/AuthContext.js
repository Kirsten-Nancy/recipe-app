import React, { useState, createContext } from 'react'
import { checkToken } from './utils/authUtil'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkToken)

  return (
    <AuthContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
      {props.children}
    </AuthContext.Provider>
  )
}
