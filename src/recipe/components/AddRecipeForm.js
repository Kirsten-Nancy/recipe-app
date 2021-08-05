import React from "react"
import { useState } from "react"
// import { v4 as uuidv4 } from "uuid"
import { withRouter } from "react-router-dom"
import AddInstructionsForm from "./AddInstructionsForm"
import AddIngredientsForm from "./AddIngredientsForm"
import toast from "react-hot-toast"

const AddRecipeForm = ({ data, history }) => {
  let initial =
    data === undefined
      ? {
          // id: uuidv4(),
          title: "",
          description: "",
          // img: "https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          // prepTime: "",
          // difficulty: "",
          image: "",
          serving_size: 0,
          ingredients: [""],
          instructions: [""],
        }
      : data

  const [recipe, setRecipe] = useState(initial)
  const [preview, setPreview] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (data === undefined) {
      // formData.append("ingredients", recipe.ingredients)
      // formData.append("instructions", recipe.instructions)
      const formData = new FormData()
      formData.append("title", recipe.title)
      formData.append("description", recipe.description)
      formData.append("image", recipe.image, "image.png")
      formData.append("serving_size", recipe.serving_size)
      for (let i = 0; i < recipe.ingredients.length; i++) {
        formData.append(`ingredients[${i}]name`, recipe.ingredients[i])
      }
      for (let j = 0; j < recipe.instructions.length; j++) {
        formData.append(`instructions[${j}]name`, recipe.instructions[j])
      }
      console.log("ingredients", recipe.ingredients)
      console.log(...formData)
      fetch("http://127.0.0.1:8000/api/recipes/", {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      })
      // setRecipe(initial)
      // console.log(recipe)
      // Redirect to home page after adding recipe

      history.push("/")
      // TODO , toast and redirect only on success
      toast.success("Recipe successfully added.")
    } else {
      // fetch(`http://127.0.0.1:8000/api/recipes/${data.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "multipart/form-data" },
      //   body: formData,
      // })
      // setRecipe(initial)
      // console.log(recipe)
      // history.push("/")
      // toast.success("Recipe successfully edited.")
    }
  }
  const handleUpload = (event) => {
    setPreview(URL.createObjectURL(event.target.files[0]))
    setRecipe({
      ...recipe,
      image: event.target.files[0],
    })
  }
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
        <label htmlFor="file">Choose a recipe cover:</label>
        <input
          type="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleUpload}
        />
        <img src={preview} alt="img" />
        <input
          className="create-btn"
          type="submit"
          value={data === undefined ? "Create Recipe" : "Edit Recipe"}
        />{" "}
      </form>
    </div>
  )
}
export default withRouter(AddRecipeForm)

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
