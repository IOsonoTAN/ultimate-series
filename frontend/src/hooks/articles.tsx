import axios from 'axios'

export interface Article {
  _id: string
  title: string
  description: string
  author: string
  status: string
  categories?: string[]
  tags?: string[]
  pictures?: []
  createdAt: string
  updatedAt: string
}

export const requestArticles = async (conditions: object = {}, accessToken: string): Promise<Article[]> => {
  const data: Article[] = await axios
    .get('http://localhost:4000/articles', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.data)

  return data
}

export const requestDeleteArticleById = async (articleId: string, accessToken: string): Promise<string> => {
  const data: string = await axios
    .delete(`http://localhost:4000/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.data)

  return data
}

export const requestGetArticleById = async (articleId: string, accessToken: string): Promise<Article> => {
  const data: Article = await axios
    .get(`http://localhost:4000/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.data)

  return data
}

export const requestPatchArticleById = async (articleId: string, doc: Article, accessToken: string): Promise<string> => {
  const data: string = await axios
    .patch(`http://localhost:4000/articles/${articleId}`, doc, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.data)

  return data
}

export const requestCreateArticle = async (doc: Article, accessToken: string): Promise<Article> => {
  const data = await axios
    .post(`http://localhost:4000/articles`, doc, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.data)

  return data
}