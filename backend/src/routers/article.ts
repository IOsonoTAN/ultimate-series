import { FastifyInstance } from 'fastify'
import articleHandlers from '../handlers/article'
import { verifyAccessToken } from '../hooks/auth'

const articleRouters = async (app: FastifyInstance) => {
  const preHandler = [verifyAccessToken]

  app.post('/', { preHandler }, articleHandlers.handlePostCreateNew)
  app.get('/', { preHandler }, articleHandlers.handleGetArticles)
  app.get('/:id', { preHandler }, articleHandlers.handleGetArticleById)
  app.patch('/:id', { preHandler }, articleHandlers.handlePatchUpdateArticleById)
  app.delete('/:id', { preHandler }, articleHandlers.handleDeleteArticleById)
}

export default articleRouters