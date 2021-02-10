import React, { useContext, useEffect } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import { message } from 'antd'
import * as jwt from 'jsonwebtoken'

import { AcessTokenDecoded, PrivateRouteProps } from '../../types/components/PrivateRoute'
import { getCurrentTimestamp } from '../../utils/date'
import UserContext from '../../contexts/UserContext'
import { requestRefreshToken } from '../../hooks/auth'

const getExpFromToken = (token: string): number => {
  const { exp }: AcessTokenDecoded = Object(jwt.decode(token))

  return exp
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const {
    isLoggedIn,
    accessToken,
    setIsLoggedIn,
    setAccessToken,
    setUser
  } = useContext(UserContext)
  const history = useHistory()

  const accessTokenExp = getExpFromToken(accessToken)
  const currentTimeStamp = getCurrentTimestamp()

  const toDoRefreshToken = async () => {
    try {
      const data = await requestRefreshToken(accessToken)
      setAccessToken(data.accessToken)
      setIsLoggedIn(true)
      setUser(data)
    } catch(error) {
      setAccessToken('')
      setIsLoggedIn(false)
      setUser({})
      message.error('Unauthorized')
      return history.push('/login')
    }
  }

  useEffect(() => {
    if (currentTimeStamp > accessTokenExp) {
      message.error('Session has expired')
      setAccessToken('')
      setUser({})
      setIsLoggedIn(false)
      return
    }

    const needToRefreshToken = ((accessTokenExp - currentTimeStamp) < 40)
    if (needToRefreshToken) {
      toDoRefreshToken()
    }
  })

  return (
    <Route {...rest} render={
      (props) => (
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      )
    } />
  )
}

export default PrivateRoute