import { CustomErrorParams } from '../utils/custom-error'

export const ArticleSomethingWentWrong: CustomErrorParams = {
  message: 'Something went wrong',
  code: 'ART000',
  statusCode: 400
}

export const ArticleNotfound: CustomErrorParams = {
  message: 'Article not found',
  code: 'ART001',
  statusCode: 400
}

export const ArticleHasDeleted: CustomErrorParams = {
  message: 'Article has been deleted',
  code: 'ART002',
  statusCode: 400
}

export default {
  ArticleSomethingWentWrong,
  ArticleNotfound,
  ArticleHasDeleted
}