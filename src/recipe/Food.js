import React from "react"
import { Link } from "react-router-dom"

const Food = ({ recipe }) => {
  return (
    <Link
      to={{
        pathname: `/recipes/${recipe.id}`,
      }}
    >
      <div className="card">
        <img
          src="https://img.taste.com.au/e8zdceW_/w643-h428-cfill-q90/taste/2016/11/zucchini-slice-10160-1.jpeg"
          alt=""
        />
        <h5>{recipe?.title}</h5>
        <p>{recipe?.description}</p>
      </div>
    </Link>
  )
}

export default Food
