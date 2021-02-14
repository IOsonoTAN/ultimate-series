import customError from '../../utils/custom-error'
import articleErrors from '../../errors/article'
import Articles, { ArticleSchema, ArticleSchemaWithDocument } from './schema'

export type {
  ArticleSchema,
  ArticleSchemaWithDocument
}

export const createNewArticle = async (doc: ArticleSchema): Promise<ArticleSchemaWithDocument> => {
  const article = new Articles(doc)

  return article.save()
}

export const getArticles = async (condition: object = {}): Promise<ArticleSchema[]> => {
  const articles = Articles
    .find({
      ...condition,
      status: 'active'
    })
    .sort({
      createdAt: -1
    })
    .lean<ArticleSchema[]>()

  return articles
}

export const getArticleById = async (articleId: string): Promise<ArticleSchema> => {
  try {
    const article = await Articles
      .findOne({
        _id: articleId,
        status: 'active'
      })
      .lean<ArticleSchema>()

    if (!article) {
      customError(articleErrors.ArticleIdInvalid)
    }

    return article
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return customError(articleErrors.ArticleIdInvalid)
    } else if (error.name === 'CustomError') {
      return error
    }
    return customError(articleErrors.ArticleSomethingWentWrong)
  }
}

export const updateArticleById = async (articleId: string, doc: ArticleSchema): Promise<boolean> => {
  try {
    Object.keys(doc).filter(key => doc[key] ?? delete doc[key])

    const result = await Articles
      .updateOne({
        _id: articleId,
        status: {
          $ne: 'deleted'
        }
      }, {
        $set: {
          ...doc
        }
      })
    if (!result.nModified) {
      return customError(articleErrors.ArticleCannotUpdate)
    }

    return true
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return customError(articleErrors.ArticleIdInvalid)
    } else if (error.name === 'CustomError') {
      return error
    }
    return customError(articleErrors.ArticleSomethingWentWrong)
  }
}

export const softDeleteArticleById = async (articleId: string): Promise<boolean> => {
  try {
    await Articles
      .findByIdAndUpdate(articleId, {
        $set: {
          status: 'deleted'
        }
      })

    return true
  } catch (error) {
    return customError(articleErrors.ArticleSomethingWentWrong)
  }
}

export default {
  createNewArticle,
  getArticles,
  getArticleById,
  updateArticleById,
  softDeleteArticleById
}