import { FastifyRequest } from 'fastify'

export type AuthLoginBodyRequest = FastifyRequest<{
  Body: {
    username: string
    password: string
  }
}>

export type AuthRegisterBodyRequest = FastifyRequest<{
  Body: {
    username: string
    password: string
    email: string
    name: string
    surname: string
  }
}>

export interface AuthLoginBodyResponse {
  id: string
  username: string
  email: string
  name: string
  surname: string
  accessToken?: string
}

export interface AuthRefreshTokenResponse {
  accessToken: string
}