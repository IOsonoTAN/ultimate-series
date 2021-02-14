import React from 'react'

import { UserProvider } from './UserContext'
import { ArticleProvider } from './ArticleContext'

const providers = [
  UserProvider,
  ArticleProvider
]

const ContextProvider = (...components: React.FC[]): React.FC => (
  components.reduce(
    (AccumComponents, Component) => (
      ({ children }): JSX.Element => (
        <AccumComponents>
          <Component>{children}</Component>
        </AccumComponents>
      )
    ),
    ({ children }) => <>{children}</>
  )
)

export default ContextProvider(...providers)