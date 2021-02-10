import {
  AuthLoginBodyRequest,
  AuthRegisterBodyRequest,
  AuthLoginBodyResponse,
  AuthRefreshTokenResponse
} from '../types/handlers/auth'
import Users from '../models/Users'
import { UsersSchemaWithDocument } from '../models/Users/schema'
import { FastifyRequest } from 'fastify'

export const handleLogin = async (request: AuthLoginBodyRequest): Promise<AuthLoginBodyResponse> => {
  const { username, password } = request.body

  const user = await Users.userLogin(username, password)

  return user
}

export const handleRegister = async (request: AuthRegisterBodyRequest): Promise<UsersSchemaWithDocument> => {
  const {
    username,
    password,
    email,
    name,
    surname
  } = request.body

  const user = await Users.createNewUser({
    username,
    password,
    email,
    name,
    surname
  })

  return user
}

export const handleRefreshToken = async (request: FastifyRequest): Promise<AuthRefreshTokenResponse> => {
  const { userId } = request

  const accessToken = Users.generateAccessToken(userId)
  const response: AuthRefreshTokenResponse = {
    accessToken
  }

  return response
}

export default {
  handleLogin,
  handleRegister,
  handleRefreshToken
}