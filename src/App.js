import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import AddRecipeForm from './pages/recipe/AddRecipeForm'
import FoodDetail from './pages/recipe/FoodDetail'
import Register from './pages/authentication/Register'
import RecipeUpdate from './pages/recipe/RecipeUpdate'
import Home from './pages/Home'
import Login from './pages/authentication/Login'
import Logout from './pages/authentication/Logout'
import MyRecipes from './pages/recipe/MyRecipes'
import PrivateRoute from './components/PrivateRoute'
import { isAuthenticated } from './utils/authUtil'

const App = () => {
  return (
    <Router>
      <div className='app'>
        {isAuthenticated() && <Nav />}
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <PrivateRoute path='/home' exact component={Home} />
          <PrivateRoute path='/create' component={AddRecipeForm} />
          <PrivateRoute path='/my-recipes/' component={MyRecipes} />
          <PrivateRoute path='/recipes/:id' component={FoodDetail} />
          <PrivateRoute path='/update/:id' component={RecipeUpdate} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
