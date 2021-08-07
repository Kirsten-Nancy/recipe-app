import React from "react"
import FoodList from "./recipe/FoodList"
import food from "./images/food.jpg"
import { Toaster } from "react-hot-toast"

const Home = () => {
  return (
    <>
      <Toaster />
      <header>
        <div className="header-content">
          <h1>Create and Share Amazing Recipes</h1>
          <p>
            Create your own space and invite family and friends to create and
            share delicious food recipes.
          </p>
          <button className="start-btn">Get Started</button>
          <button className="start-btn">Explore recipes</button>
        </div>
        <img src={food} alt="" className="header-img" />
      </header>
      <h3>All recipes</h3>
      <FoodList />
    </>
  )
}

export default Home
