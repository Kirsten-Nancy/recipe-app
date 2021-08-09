import React from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import axiosInstance from "../api"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()

    axiosInstance
      .post("token/", {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access)
        localStorage.setItem("refresh_token", response.data.refresh)
        // Updates the axios instance headers section and
        // the access token will now be added to every request to the backend
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token")

        history.push("/")
        console.log(response)
        console.log(response.data)
      })
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value.trim())}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value.trim())}
        />
        <input type="submit" value="Sign In" className="auth-btn" />
      </form>
    </div>
  )
}

export default Login
