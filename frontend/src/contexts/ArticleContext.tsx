import React, { useState, createContext } from 'react'

type ArticleContextProps = {
  needLoadArticles: boolean
  setNeedLoadArticles: React.Dispatch<React.SetStateAction<boolean>>
}

const ArticleContext = createContext({} as ArticleContextProps)

export const ArticleProvider: React.FC = (props) => {
  const [needLoadArticles, setNeedLoadArticles] = useState<boolean>(false)

  return (
    <ArticleContext.Provider
      value={
        {
          needLoadArticles,
          setNeedLoadArticles
        }
      }
    >
      {props.children}
    </ArticleContext.Provider>
  )
}

export default ArticleContext