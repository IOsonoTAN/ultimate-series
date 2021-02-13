import { FastifyInstance } from 'fastify'
import { verifyAccessToken } from '../hooks/auth'
import { handleCreateNewArticle, handleGetArticleById, handleGetArticles } from '../handlers/article'

const authRouters = async (app: FastifyInstance) => {
  const preHandler = [verifyAccessToken]

  app.post('/', { preHandler }, handleCreateNewArticle)
  app.get('/', { preHandler }, handleGetArticles)
  app.get('/:articleId', { preHandler }, handleGetArticleById)
}

export default authRouters