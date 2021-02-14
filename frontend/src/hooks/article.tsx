import axios from 'axios'

export interface Article {
  _id: string
  title: string
  description: string
  author: string
  status: string
}

const handleResponseError = (error: any) => {
  if (error?.response?.data?.error) {
    throw error.response.data.error
  }
  throw error
}

export const requestCreateArticle = async (doc: Article, accessToken: string): Promise<Article> => {
  const data: Article = await axios
    .post('http://localhost:4000/articles', doc, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.data)
    .catch(error => handleResponseError(error))

  return data
}

export const requestArticles = async (conditions: object = {}, accessToken: string): Promise<Article[]> => {
  const data: Article[] = await axios
    .get('http://localhost:4000/articles', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.data)
    .catch(error => handleResponseError(error))

  return data
}

export const requestArticleById = async (id: string, accessToken: string): Promise<Article> => {
  const data: Article = await axios
    .get(`http://localhost:4000/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.data)
    .catch(error => handleResponseError(error))

  return data
}

export const requestUpdateArticleById = async (id: string, doc: Article, accessToken: string): Promise<boolean> => {
  await axios
    .patch(`http://localhost:4000/articles/${id}`, doc, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.data)
    .catch(error => handleResponseError(error))

  return true
}

export const requestDeleteArticleById = async (id: string, accessToken: string): Promise<boolean> => {
  await axios
    .delete(`http://localhost:4000/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.data)
    .catch(error => handleResponseError(error))

  return true
}