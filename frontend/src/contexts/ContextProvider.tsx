import React from 'react'

import { UserProvider } from './UserContext'

const providers = [
  UserProvider
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