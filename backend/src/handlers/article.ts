import { createNewArticle, getArticleById, getArticles, updateArticleById, removeArticleById, ArticlesSchemaWithDocument } from '../models/Articles'
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

export const handleUpdateArticle = async (request: ArticleUpdate): Promise<string> => {
  const { userId } = request
  const { articleId } = request.params
  const { title, description, categories, tags, status } = request.body

  const result = await updateArticleById(articleId, {
    title,
    description,
    categories,
    tags,
    status,
    author: userId
  })

  return result
}

export const handleDeleteArticle = async (request: ArticleGetByIdRequest): Promise<string> => {
  const { articleId } = request.params

  const result = await removeArticleById(articleId)

  return result
}

export default {
  handleCreateNewArticle,
  handleGetArticleById,
  handleGetArticles,
  handleUpdateArticle
}