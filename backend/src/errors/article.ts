import { CustomErrorParams } from '../utils/custom-error'

export const ArticleSomethingWentWrong: CustomErrorParams = {
  message: 'Something went wrong',
  code: 'ART000',
  statusCode: 400
}

export const ArticleIdInvalid: CustomErrorParams = {
  message: 'Object ID invalid',
  code: 'ART001',
  statusCode: 400
}

export const ArticleCannotUpdate: CustomErrorParams = {
  message: 'Object ID invalid',
  code: 'ART002',
  statusCode: 400
}

export default {
  ArticleSomethingWentWrong,
  ArticleIdInvalid,
  ArticleCannotUpdate
}