import React from "react"
import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav>
      <h1>
        Food<span className="logo">Space</span>
      </h1>
      <ul className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/create">Create Recipe</Link>

        <Link to="/my-recipes/">My Recipes</Link>
        <li>Profile</li>
      </ul>

      <Link to="/register">
        <button className="login-btn">Register</button>
      </Link>

      <Link to="/login">
        <button className="login-btn">Login</button>
      </Link>

      <Link to="/logout">
        <button className="login-btn">Logout</button>
      </Link>
    </nav>
  )
}

export default Nav
