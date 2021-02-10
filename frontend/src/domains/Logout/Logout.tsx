import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import UserContext from '../../contexts/UserContext'

const Logout: React.FC = () => {
  const {
    setIsLoggedIn,
    setAccessToken,
    setUser
  } = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {
    setAccessToken('')
    setIsLoggedIn(false)
    setUser({})

    return history.push('/')
  }, [setAccessToken, setIsLoggedIn, setUser, history])

  return <>Logout...</>
}

export default Logout