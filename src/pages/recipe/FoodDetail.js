import React from 'react'
import { useState, useEffect } from 'react'
import { BsPeople } from 'react-icons/bs'
import { BiTime } from 'react-icons/bi'
import { GiLever } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosInstance from '../../api'

// Fetch directly from api because if you refresh it's not passed the data, because
// It got the data from url parameters
const FoodDetail = ({ match, history }) => {
  const [userId, setUserId] = useState(null)
  const [recipe, setRecipe] = useState({ ingredients: [], instructions: [] })

  useEffect(() => {
    axiosInstance.get(`recipes/${match.params.id}`).then((response) => {
      console.log(response.data)
      setRecipe(response.data)
    })
    checkUser()
  }, [match.params.id])

  const checkUser = () => {
    axiosInstance.get('user/current/').then((response) => {
      setUserId(response.data.id)
      console.log(response.data)
    })
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`recipes/${recipe.id}`).then((response) => {
          console.log(response.data)
          // Redirect to homepage after delete
          history.push('/')
        })
        Swal.fire('Deleted!', 'Your recipe has been deleted.', 'success')
      }
    })
  }

  return (
    <div className='food-detail-container'>
      <h1>{recipe?.title}</h1>
      <div className='recipe-container'>
        <div className='recipe-intro'>
          <div className='left'>
            <p>{recipe?.description}</p>
            <div className='recipe-parameters'>
              <div>
                <BiTime size={32} color='#29BB89' />
                <span>Cook Time</span>
                {/* <span>{recipe.prepTime} Min</span> */}
                <span>60 Min</span>
              </div>
              <div>
                <GiLever size={32} color='#29BB89' />
                <span>Diffuculty level</span>
                {/* <span>{recipe.difficulty}</span> */}
                <span>Easy</span>
              </div>
              <div>
                <BsPeople size={32} color='#29BB89' />
                <span>Serving size</span>
                <span>{recipe.serving_size}</span>
              </div>
            </div>
            {userId === recipe.author ? (
              <>
                <Link
                  to={{
                    pathname: `/update/${recipe.id}`,
                  }}
                >
                  <button className='edit-btn'>Edit recipe</button>
                </Link>

                <button onClick={handleDelete} className='delete-btn'>
                  Delete recipe
                </button>
              </>
            ) : (
              ''
            )}
          </div>
          <div className='recipe-img'>
            {/* <img src={recipe.img} alt="recipe-img" /> */}
            <img src={recipe.image} alt='' />
          </div>
        </div>
        <div className='recipe-content'>
          <div className='recipe-ingredients'>
            <h3>INGREDIENTS</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => {
                return <li key={index}>{ingredient.name}</li>
              })}
            </ul>
          </div>

          <div className='recipe-prep'>
            <h3>INSTRUCTIONS</h3>

            {recipe.instructions.map((instruction, index) => {
              return (
                <div key={index} className='instruction-div'>
                  <p className='step'>STEP {index + 1}</p>
                  <p>{instruction.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default FoodDetail
