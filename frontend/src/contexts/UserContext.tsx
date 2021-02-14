import React, { useState, useEffect, createContext } from 'react'

interface UserObject {
  id?: string
  name?: string
  surname?: string
  email?: string
  username?: string
  accessToken?: string
}
interface UserContextProps {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  accessToken: string
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
  user: UserObject
  setUser: React.Dispatch<React.SetStateAction<UserObject>>
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
  const [user, setUser] = useState<UserObject>(userInLocal ? JSON.parse(userInLocal) : {})

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