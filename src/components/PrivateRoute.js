import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../utils/authUtil.js'

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(isAuthenticated(), 'check')
  return (
    <Route
      // Pass in the rest of the props such as path
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          // After redirecting the user to login page, this ensures the user goes back to the
          // Page they were at inititially
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
