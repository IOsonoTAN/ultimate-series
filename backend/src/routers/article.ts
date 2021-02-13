import { FastifyInstance } from 'fastify'
import { verifyAccessToken } from '../hooks/auth'
import {
  handleCreateNewArticle,
  handleGetArticleById,
  handleGetArticles,
  handleUpdateArticle,
  handleDeleteArticle
} from '../handlers/article'

const authRouters = async (app: FastifyInstance) => {
  const preHandler = [verifyAccessToken]

  app.post('/', { preHandler }, handleCreateNewArticle)
  app.get('/', { preHandler }, handleGetArticles)
  app.get('/:articleId', { preHandler }, handleGetArticleById)
  app.patch('/:articleId', { preHandler }, handleUpdateArticle)
  app.delete('/:articleId', { preHandler }, handleDeleteArticle)
}

export default authRouters