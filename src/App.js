import React from "react"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Nav from "./Nav"
import FoodList from "./recipe/FoodList"
import AddRecipeForm from "./recipe/components/AddRecipeForm"
import FoodDetail from "./recipe/FoodDetail"
import Register from "./authentication/Register"

const App = () => {
  const [data, setData] = useState([])

  const fetchRecipes = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/recipes/", {
      headers: {
        Accept: "application/json; odata=verbose",
      },
    })
    let api_data = await response.json()
    setData(api_data)
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <Router>
      <div className="app">
        <Nav />
        <Switch>
          <Route path="/" exact>
            {data && <FoodList data={data} />}
          </Route>
          <Route path="/create">
            <AddRecipeForm data={data} setData={setData} />
          </Route>
          <Route path="/recipes/:id" component={FoodDetail} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
