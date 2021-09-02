import React from 'react'
import { useState, useEffect } from 'react'
import AddRecipeForm from './AddRecipeForm'
import axiosInstance from '../../api'

const RecipeUpdate = ({ match }) => {
  const [recipeToUpdate, setRecipeToUpdate] = useState({
    ingredients: [],
    instructions: [],
  })

  useEffect(() => {
    // TODO: change to axios to add auth headers
    const fetchRecipe = async () => {
      axiosInstance.post(`recipes/${match.params.id}`).then((response) => {
        setRecipeToUpdate(response.data)
      })
    }
    fetchRecipe()
  }, [])

  console.log('title:', recipeToUpdate.title)
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Edit recipe</h1>
      {recipeToUpdate.title === undefined ? (
        <h2>Loading</h2>
      ) : (
        <AddRecipeForm data={recipeToUpdate} />
      )}
    </>
  )
}

export default RecipeUpdate
