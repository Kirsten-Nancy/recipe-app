import React from "react"
import { useState, useEffect } from "react"
import { BsPeople } from "react-icons/bs"
import { BiTime } from "react-icons/bi"
import { GiLever } from "react-icons/gi"
// import { IconContext } from "react-icons"

// Fetch directly from api because if you refresh it's not passed the data, because
// It got the data from url parameters
const FoodDetail = ({ match }) => {
  const [recipe, setRecipe] = useState({ ingredients: [], instructions: [] })

  useEffect(() => {
    const fetchRecipe = async () => {
      let response = await fetch(
        `http://127.0.0.1:8000/api/recipes/${match.params.id}`,
        {
          headers: {
            Accept: "application/json; odata=verbose",
          },
        }
      )
      let data = await response.json()
      setRecipe(data)
    }
    fetchRecipe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="food-detail-container">
      <h1>{recipe?.title}</h1>
      <div className="recipe-container">
        <div className="recipe-intro">
          <div className="recipe-img">
            {/* <img src={recipe.img} alt="recipe-img" /> */}
            <img
              src="https://img.taste.com.au/e8zdceW_/w643-h428-cfill-q90/taste/2016/11/zucchini-slice-10160-1.jpeg"
              alt=""
            />
          </div>

          <div className="right">
            <p>{recipe?.description}</p>
            <div className="recipe-parameters">
              <div>
                <BiTime size={32} color="#29BB89" />
                <span>Cook Time</span>
                {/* <span>{recipe.prepTime} Min</span> */}
                <span>60 Min</span>
              </div>
              <div>
                <GiLever size={32} color="#29BB89" />
                <span>Diffuculty level</span>
                {/* <span>{recipe.difficulty}</span> */}
                <span>Easy</span>
              </div>
              <div>
                <BsPeople size={32} color="#29BB89" />
                <span>Serving size</span>
                <span>{recipe.serving_size}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="recipe-content">
          <div className="recipe-ingredients">
            <h3>INGREDIENTS</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => {
                return <li key={index}>{ingredient.name}</li>
              })}
            </ul>
          </div>

          <div className="recipe-prep">
            <h3>INSTRUCTIONS</h3>
            <ol>
              {recipe.instructions.map((instruction, index) => {
                return <li key={index}>{instruction.name}</li>
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FoodDetail
