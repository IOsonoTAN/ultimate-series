import { createNewArticle, getArticleById, getArticles, ArticlesSchemaWithDocument } from '../models/Articles'
import { ArticlesSchema } from '../types/models/Articles'
import { ArticleCreateNewRequestBody, ArticleGetByIdRequest, ArticleUpdate } from '../types/handlers/article'

export const handleCreateNewArticle = async (request: ArticleCreateNewRequestBody): Promise<ArticlesSchemaWithDocument> => {
  const { userId } = request
  const { title, description } = request.body

  const article = await createNewArticle({
    title,
    description,
    author: userId
  })

  return article
}

export const handleGetArticleById = async (request: ArticleGetByIdRequest): Promise<ArticlesSchema> => {
  const { articleId } = request.params

  const article = await getArticleById(articleId)

  return article
}

export const handleGetArticles = async (): Promise<ArticlesSchema[]> => getArticles()

export const handleUpdateArticle = async (request: ArticleUpdate) => {
}

export default {
  handleCreateNewArticle,
  handleGetArticleById,
  handleGetArticles
}