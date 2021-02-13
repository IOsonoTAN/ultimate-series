import { FastifyRequest } from 'fastify'

export type ArticleCreateNewRequestBody = FastifyRequest<{
  Body: {
    title: string
    description: string
    categories?: string[]
    tags?: string[]
    pictures?: object[]
  }
}>

export type ArticleGetByIdRequest = FastifyRequest<{
  Params: {
    articleId: string
  }
}>

export type ArticleUpdate = ArticleCreateNewRequestBody & ArticleGetByIdRequest