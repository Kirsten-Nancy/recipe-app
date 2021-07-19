import React from "react"
import { useState } from "react"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <form className="register-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPass}
          onChange={(event) => setConfirmPass(event.target.value)}
        />
        <input type="submit" value="Register" className="auth-btn" />
      </form>
    </div>
  )
}

export default Register
