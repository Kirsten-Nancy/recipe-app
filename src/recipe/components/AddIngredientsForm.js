import React from "react"
import { AiFillDelete } from "react-icons/ai"
import { IconContext } from "react-icons"

const AddIngredientsForm = ({ recipe, setRecipe }) => {
  const handleChange = (event, index) => {
    // const ingredientList = recipe.ingredients.map((ingredient, idx) => {
    //   return idx === index ? (ingredient = event.target.value) : ingredient
    // })
    // console.log(recipe.ingredients)
    const ingredientList = recipe.ingredients.map((ingredient, idx) => {
      return idx === index ? event.target.value : ingredient
    })

    setRecipe({ ...recipe, ingredients: ingredientList })
  }

  const handleAdd = () => {
    const ingredientList = [...recipe.ingredients, ""]
    setRecipe({ ...recipe, ingredients: ingredientList })
  }

  const handleDelete = (index) => {
    if (recipe.ingredients.length > 1) {
      const ingredientList = recipe.ingredients.filter(
        (ingredient, idx) => idx !== index
      )
      setRecipe({ ...recipe, ingredients: ingredientList })
    } else {
      alert("You need to have at least one ingredient")
    }
  }

  return (
    <div>
      {recipe.ingredients.map((ingredient, index) => {
        return (
          <div key={index} className="ingredient-field">
            <input
              className="ingredient-input"
              type="text"
              placeholder="Enter ingredient"
              value={ingredient.name}
              onChange={(event) => handleChange(event, index)}
            />
            <IconContext.Provider value={{ className: "delete-icon" }}>
              <AiFillDelete onClick={() => handleDelete(index)} />
            </IconContext.Provider>
          </div>
        )
      })}

      <input
        className="add-btn"
        type="button"
        value="Add ingredient"
        onClick={handleAdd}
      />
    </div>
  )
}
export default AddIngredientsForm
