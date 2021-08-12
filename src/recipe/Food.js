import React from "react"
import { Link } from "react-router-dom"

const Food = ({ recipe }) => {
  // console.log("from food card", recipe)
  return (
    <div className="card">
      <Link
        to={{
          pathname: `/recipes/${recipe.id}`,
        }}
      >
        <img src={recipe.image} alt="recipe" />
        <h5>{recipe?.title}</h5>
        <p>{recipe?.description}</p>
      </Link>
    </div>
  )
}

export default Food
