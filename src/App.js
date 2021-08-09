import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Nav from "./Nav"
import AddRecipeForm from "./recipe/components/AddRecipeForm"
import FoodDetail from "./recipe/FoodDetail"
import Register from "./authentication/Register"
import RecipeUpdate from "./recipe/RecipeUpdate"
import Home from "./Home"
import Login from "./authentication/Login"

const App = () => {
  return (
    <Router>
      <div className="app">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" component={AddRecipeForm} />
          <Route path="/update/:id" component={RecipeUpdate} />
          <Route path="/recipes/:id" component={FoodDetail} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
