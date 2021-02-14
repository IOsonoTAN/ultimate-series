import { FastifyRequest } from 'fastify'

export type ArticleRequestBody = FastifyRequest<{
  Body: {
    title: string
    description: string
    status: string
  }
}>

export type ArticleParams = FastifyRequest<{
  Params: {
    id: string
  }
}>

export type ArticleWithRequestBodyAndParams = ArticleRequestBody & ArticleParams