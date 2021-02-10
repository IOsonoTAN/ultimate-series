import { FastifyRequest } from 'fastify'
import * as jwt from 'jsonwebtoken'
import customError from '../utils/custom-error'
import authErrors from '../errors/auth'
import config from '../config'
import { AccessTokenDecoded } from '../types/hooks/auth'

const validateHeadersAuth = (request: FastifyRequest): string => {
  const authToken: string = request.headers['authorization']
  if (!authToken) {
    customError(authErrors.AuthMissingHeaders)
  }

  const accessToken = authToken.split(' ')[1]
  if (!accessToken) {
    customError(authErrors.AuthMissingHeaders)
  }

  return accessToken
}

export const verifyAccessToken = async (request: FastifyRequest): Promise<boolean> => {
  try {
    const accessToken = validateHeadersAuth(request)
    const decoded: AccessTokenDecoded = Object(jwt.verify(accessToken, config.secret.accessToken))

    request.userId = decoded.aud

    return true
  } catch (error) {
    customError(authErrors.AuthJWTError)
  }
}

export default {
  verifyAccessToken
}