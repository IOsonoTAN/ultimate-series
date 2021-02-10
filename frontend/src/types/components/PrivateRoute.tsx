export interface AcessTokenDecoded {
  aud: string
  exp: number
  iat: number
}

export interface PrivateRouteProps {
  component: any
  exact: any
  path: string
}