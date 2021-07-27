import { useState, useEffect } from "react"
import Food from "./Food"

const FoodList = () => {
  const [data, setData] = useState([])

  const fetchRecipes = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/recipes/", {
      headers: {
        Accept: "application/json;",
      },
    })
    let api_data = await response.json()
    setData(api_data)
  }

  useEffect(() => {
    fetchRecipes()
  }, [])
  return (
    <div className="main-container">
      {data.map((recipe, index) => {
        return <Food key={index} recipe={recipe} />
      })}
    </div>
  )
}

export default FoodList
