import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axiosInstance from '../../api'

const Register = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()

    axiosInstance
      .post('user/register/', {
        email: email,
        first_name: firstName,
        password: password,
      })
      .then((response) => {
        history.push('/login')
        console.log(response)
        console.log(response.data)
        // Prompt the user to login again to obtain the access and refresh token
      })
      .catch((error) => {
        console.log('we are here')
        console.log(error)
      })
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form className='register-form' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(event) => setEmail(event.target.value.trim())}
        />
        <input
          type='text'
          placeholder='Enter your first name'
          value={firstName}
          onChange={(event) => setFirstName(event.target.value.trim())}
        />
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(event) => setPassword(event.target.value.trim())}
        />
        <input type='submit' value='Sign Up' className='auth-btn' />
      </form>
    </div>
  )
}

export default Register
