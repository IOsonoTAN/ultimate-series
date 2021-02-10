import { FastifyInstance } from 'fastify'
import { handleUserMe } from '../handlers/user'
import { verifyAccessToken } from '../hooks/auth'

const userRouters = async (app: FastifyInstance) => {
  app.get('/me', {
    preHandler: [
      verifyAccessToken
    ]
  }, handleUserMe)
}

export default userRouters