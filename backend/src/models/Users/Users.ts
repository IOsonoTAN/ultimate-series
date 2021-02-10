import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { UsersSchema } from '../../types/models/Users'
import { AuthLoginBodyResponse } from '../../types/handlers/auth'
import Users, { UsersSchemaWithDocument } from './schema'
import customError from '../../utils/custom-error'
import authErrors from '../../errors/auth'
import config from '../../config'

const generateHashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10)
  const hashPassword = bcrypt.hashSync(password, salt)

  return hashPassword
}

const comparePassword = (password: string, existsPassword: string): boolean => {
  const isPasswordCorrect = bcrypt.compareSync(password, existsPassword)
  if (!isPasswordCorrect) {
    customError(authErrors.AuthInvalidPassword)
  }
  return true
}

export const generateAccessToken = (userId: string): string => {
  const token = jwt.sign({}, config.secret.accessToken, {
    expiresIn: 60,
    audience: String(userId)
  })

  return token
}

const mapUserResponseObject = (userId: string, user: UsersSchemaWithDocument, accessToken?: string): AuthLoginBodyResponse => {
  const response: AuthLoginBodyResponse = {
    id: userId,
    username: user.username,
    name: user.name,
    surname: user.surname,
    email: user.email,
    accessToken
  }

  return response
}

export const createNewUser = async (doc: UsersSchema): Promise<UsersSchemaWithDocument> => {
  doc.password = generateHashPassword(doc.password)

  const user = new Users(doc)

  return user.save()
}

export const userLogin = async (username: string, password: string): Promise<AuthLoginBodyResponse> => {
  const user = await Users.findOne({
    username
  })
  if (!user) {
    customError({
      ...authErrors.AuthInvalidUsername,
      data: {
        testModeAgain: true
      }
    })
  }
  comparePassword(password, user.password)

  const userId = user._id
  const accessToken = generateAccessToken(userId)
  const response: AuthLoginBodyResponse = mapUserResponseObject(userId, user, accessToken)

  return response
}

export const getUserById = async (userId: string): Promise<AuthLoginBodyResponse> => {
  const user = await Users.findById(userId)

  const response: AuthLoginBodyResponse = mapUserResponseObject(userId, user)

  return response
}

export default {
  createNewUser,
  userLogin,
  getUserById,
  generateAccessToken
}