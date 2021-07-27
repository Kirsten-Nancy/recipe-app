import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Nav from "./Nav"
import FoodList from "./recipe/FoodList"
import AddRecipeForm from "./recipe/components/AddRecipeForm"
import FoodDetail from "./recipe/FoodDetail"
import Register from "./authentication/Register"
import RecipeUpdate from "./recipe/RecipeUpdate"

const App = () => {
  return (
    <Router>
      <div className="app">
        <Nav />
        <Switch>
          <Route path="/" exact>
            <FoodList />
          </Route>
          <Route path="/create" component={AddRecipeForm} />
          <Route path="/update/:id" component={RecipeUpdate} />
          <Route path="/recipes/:id" component={FoodDetail} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
