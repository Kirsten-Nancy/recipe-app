import React from 'react'
import { Link } from 'react-router-dom'

const Food = ({ recipe }) => {
  return (
    <div className='card'>
      <Link
        to={{
          pathname: `/recipes/${recipe.id}`,
        }}
      >
        <img src={recipe.image} alt='recipe' />
        <div className='card-content'>
          <h5>{recipe?.title}</h5>
          <p>{recipe?.description}</p>
        </div>
      </Link>
    </div>
  )
}

export default Food
