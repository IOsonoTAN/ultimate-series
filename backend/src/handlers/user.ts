import { FastifyRequest } from 'fastify'
import Users from '../models/Users'

export const handleUserMe = async (request: FastifyRequest) => {
  const { userId } = request

  const user = await Users.getUserById(userId)

  return user
}

export default {
  handleUserMe
}