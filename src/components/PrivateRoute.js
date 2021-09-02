import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import { useHistory } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext)
  let history = useHistory()

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login')
    }
  }, [isAuthenticated])

  return (
    <Route
      // Pass in the rest of the props such as path
      {...rest}
      render={(props) =>
        isAuthenticated ? (
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
