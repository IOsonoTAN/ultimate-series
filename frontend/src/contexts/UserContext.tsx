import React, { useState, useEffect, createContext } from 'react'

type UserContextProps = {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  accessToken: string
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
  user: object
  setUser: React.Dispatch<React.SetStateAction<object>>
}

const UserContext = createContext({} as UserContextProps)

export const UserProvider: React.FC = (props) => {
  const isLoggedInKey = 'isLoggedIn'
  const accessTokenKey = 'accessToken'
  const userKey = 'user'

  const isLoggedInLocal = localStorage.getItem(isLoggedInKey)
  const accessTokenInLocal = localStorage.getItem(accessTokenKey)
  const userInLocal = localStorage.getItem(userKey)

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isLoggedInLocal ? JSON.parse(isLoggedInLocal) : false)
  const [accessToken, setAccessToken] = useState<string>(accessTokenInLocal ? JSON.parse(accessTokenInLocal) : '')
  const [user, setUser] = useState<object>(userInLocal ? JSON.parse(userInLocal) : {})

  useEffect(() => {
    localStorage.setItem(isLoggedInKey, JSON.stringify(isLoggedIn))
  }, [isLoggedIn])

  useEffect(() => {
    localStorage.setItem(accessTokenKey, JSON.stringify(accessToken))
  }, [accessToken])

  useEffect(() => {
    localStorage.setItem(userKey, JSON.stringify(user))
  }, [user])

  return (
    <UserContext.Provider
      value={
        {
          isLoggedIn,
          accessToken,
          user,
          setIsLoggedIn,
          setAccessToken,
          setUser
        }
      }
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext