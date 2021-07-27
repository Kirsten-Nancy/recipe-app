import React from "react"
import { Link } from "react-router-dom"
import { FaEdit, FaTrash } from "react-icons/fa"

const Food = ({ recipe }) => {
  return (
    <div className="card">
      <Link
        to={{
          pathname: `/recipes/${recipe.id}`,
        }}
      >
        <img
          src="https://img.taste.com.au/e8zdceW_/w643-h428-cfill-q90/taste/2016/11/zucchini-slice-10160-1.jpeg"
          alt=""
        />
        <h5>{recipe?.title}</h5>
        <p>{recipe?.description}</p>
      </Link>
      <Link
        to={{
          pathname: `/update/${recipe.id}`,
        }}
      >
        {" "}
        <FaEdit />
      </Link>

      <FaTrash />
    </div>
  )
}

export default Food
