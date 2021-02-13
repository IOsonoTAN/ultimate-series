import Articles, { ArticlesSchemaWithDocument } from './schema'
import { ArticlesSchema } from '../../types/models/Articles'

export {
  ArticlesSchemaWithDocument
}

export const createNewArticle = async (doc: ArticlesSchema): Promise<ArticlesSchemaWithDocument> => {
  const article = new Articles(doc)

  return article.save()
}

export const getArticleById = async (articleId: string): Promise<any> => {
  const article = Articles
    .findById(articleId)
    .lean<ArticlesSchema>()

  return article
}

export const getArticles = async (criteria: any = {}): Promise<ArticlesSchema[]> => {
  const articles = Articles
    .find(criteria)
    .lean<ArticlesSchema[]>()

  return articles
}

export default {
  createNewArticle,
  getArticleById
}