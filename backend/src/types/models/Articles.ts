export enum ArticlePictureTypes {
  thumbnail,
  galley
}

export interface ArticlePicturesSchema {
  type: ArticlePictureTypes
  url: string
}

export interface ArticlesSchema {
  title: string
  description: string
  author: string
  categories?: string[]
  tags?: string[]
  pictures?: ArticlePicturesSchema[]
  status?: string
}