import React from "react"
import { useState } from "react"
// import { v4 as uuidv4 } from "uuid"
import AddInstructionsForm from "./AddInstructionsForm"
import AddIngredientsForm from "./AddIngredientsForm"

const AddRecipeForm = ({ data }) => {
  let initial =
    data === undefined
      ? {
          // id: uuidv4(),
          title: "",
          description: "",
          // img: "https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          // prepTime: "",
          // difficulty: "",
          serving_size: 0,
          ingredients: [{ name: "" }],
          instructions: [{ name: "" }],
        }
      : data

  const [recipe, setRecipe] = useState(initial)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (data === undefined) {
      fetch("http://127.0.0.1:8000/api/recipes/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      })
      setRecipe(initial)
      console.log(recipe)
    } else {
      fetch(`http://127.0.0.1:8000/api/recipes/${data.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      })
      setRecipe(initial)
      console.log(recipe)
    }

    // let recipeValues = { ...recipe }
    // recipeValues.name = recipeName
    // recipeValues.description = description
    // const recipes = [...data, recipeValues]
    // setRecipe(recipes)
  }

  console.log(recipe.serving_size)
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter recipe name"
          value={recipe.title}
          onChange={(event) =>
            setRecipe({ ...recipe, title: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter recipe description"
          value={recipe.description}
          onChange={(event) =>
            setRecipe({ ...recipe, description: event.target.value })
          }
        />
        {/* <input
          type="text"
          placeholder="Cook time"
          value={recipe.prepTime}
          onChange={(event) =>
            setRecipe({ ...recipe, prepTime: event.target.value })
          }
        />
        <select
          value={recipe.difficulty}
          onChange={(event) =>
            setRecipe({ ...recipe, difficulty: event.target.value })
          }
        > */}
        {/* <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select> */}
        <input
          type="text"
          placeholder="Serving size"
          value={recipe.serving_size}
          onChange={(event) =>
            setRecipe({ ...recipe, serving_size: event.target.value })
          }
        />
        <AddIngredientsForm recipe={recipe} setRecipe={setRecipe} />
        <AddInstructionsForm recipe={recipe} setRecipe={setRecipe} />
        {/* <input type="file" /> */}
        <input
          className="create-btn"
          type="submit"
          value={data === undefined ? "Create Recipe" : "Update Recipe"}
        />
      </form>
    </div>
  )
}
export default AddRecipeForm

//   // const getIngredients = (ingredientsFromChild) => {
//   let recipeValues = { ...recipe }
//   recipeValues.ingredients = ingredientsFromChild
//   setRecipe(recipeValues)

//   // setRecipe((recipe.ingredients = ingredientsFromChild))
//   // let myIngredients = [...recipeValues.ingredients, ingredientsFromChild]
//   // console.log(recipe)
//   // setRecipe([...recipe.ingredients, ingredientsFromChild])
//   // console.log(recipe.ingredients)
// }

// const getInstructions = (instructionsFromChild) => {
//   let recipeValues = { ...recipe }
//   recipeValues.instructions = instructionsFromChild
//   setRecipe(recipeValues)
// }
