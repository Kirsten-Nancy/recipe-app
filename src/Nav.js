import React from "react"
import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav>
      <h1>
        Food<span className="logo">Space</span>
      </h1>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create Recipe</Link>
        </li>
        <li>My Recipes</li>
        <li>Profile</li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
      <button>Login</button>
    </nav>
  )
}

export default Nav
