import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import axiosInstance from '../api'

const Nav = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext)

  useEffect(() => {
    console.log(isAuthenticated, 'from nav')
  }, [])

  const handleLogout = async () => {
    const response = await axiosInstance.post('user/logout/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token'),
    })
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setIsAuthenticated(false)
    //check this
    // axiosInstance.defaults.headers['Authorization'] = null
  }

  return (
    <nav>
      <h1>
        Food<span className='logo'>Space</span>
      </h1>

      <ul className='nav-links'>
        {isAuthenticated && (
          <>
            <Link to='/home'>Home</Link>

            <Link to='/create'>Create Recipe</Link>

            <Link to='/my-recipes/'>My Recipes</Link>
          </>
        )}
      </ul>
      {isAuthenticated && (
        <button className='login-btn' onClick={handleLogout}>
          Logout
        </button>
      )}

      {!isAuthenticated && (
        <>
          <Link to='/register'>
            <button className='login-btn'>Register</button>
          </Link>

          <Link to='/login'>
            <button className='login-btn'>Login</button>
          </Link>
        </>
      )}
    </nav>
  )
}

export default Nav
