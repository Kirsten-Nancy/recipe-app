import React from "react"
import { useState, useEffect } from "react"
import AddRecipeForm from "./components/AddRecipeForm"

const RecipeUpdate = ({ match }) => {
  const [recipeToUpdate, setRecipeToUpdate] = useState({
    ingredients: [],
    instructions: [],
  })

  useEffect(() => {
    const fetchRecipe = async () => {
      let response = await fetch(
        `http://127.0.0.1:8000/api/recipes/${match.params.id}`,
        {
          headers: {
            Accept: "application/json;",
          },
        }
      )
      let data = await response.json()
      setRecipeToUpdate(data)
    }
    fetchRecipe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log("title:", recipeToUpdate.title)
  return (
    <>
      <h1>Update recipe</h1>
      {recipeToUpdate.title === undefined ? (
        <h2>Loading</h2>
      ) : (
        <AddRecipeForm data={recipeToUpdate} />
      )}
    </>
  )
}

export default RecipeUpdate
