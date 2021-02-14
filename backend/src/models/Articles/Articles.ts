import Articles, { ArticlesSchemaWithDocument } from './schema'
import { ArticlesSchema } from '../../types/models/Articles'
import articleErrors from '../../errors/article'
import customError from '../../utils/custom-error'

export type {
  ArticlesSchemaWithDocument
}

export const createNewArticle = async (doc: ArticlesSchema): Promise<ArticlesSchemaWithDocument> => {
  const article = new Articles(doc)

  return article.save()
}

export const getArticleById = async (articleId: string): Promise<any> => {
  const article = Articles
    .findOne({
      _id: articleId,
      status: 'active'
    })
    .lean<ArticlesSchema>()

  return article
}

export const getArticles = async (criteria: any = {}): Promise<ArticlesSchema[]> => {
  const articles = Articles
    .find({
      ...criteria,
      status: 'active'
    })
    .lean<ArticlesSchema[]>()

  return articles
}

export const updateArticleById = async (articleId: string, doc: ArticlesSchema): Promise<string> => {
  try {
    Object.keys(doc).filter(key => doc[key] ?? delete doc[key])

    const result = await Articles
      .updateOne({
        _id: articleId,
        status: {
          $in: ['active', 'inactive']
        }
      }, {
        $set: {
          ...doc
        }
      })

    if (!result.nModified) {
      return customError(articleErrors.ArticleHasDeleted)
    }

    return 'OK'
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return customError(articleErrors.ArticleNotfound)
    } else if (error.name === 'CustomError') {
      return error
    }
    return customError(articleErrors.ArticleSomethingWentWrong)
  }
}

export const removeArticleById = async (articleId: string): Promise<string> => {
  await Articles.findByIdAndUpdate(articleId, {
    $set: {
      status: 'delete'
    }
  })

  return 'OK'
}

export default {
  createNewArticle,
  getArticleById,
  getArticles,
  updateArticleById
}