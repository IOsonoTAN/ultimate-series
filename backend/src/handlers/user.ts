import { FastifyRequest } from 'fastify'
import { AuthJWTError } from '../errors/auth'
import Users from '../models/Users'
import customError from '../utils/custom-error'

export const handleUserMe = async (request: FastifyRequest) => {
  const { userId } = request
  if (!userId) {
    return customError(AuthJWTError)
  }

  const user = await Users.getUserById(userId)

  return user
}

export default {
  handleUserMe
}