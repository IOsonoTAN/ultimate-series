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
  categories?: string[]
  tags?: string[]
  pictures?: ArticlePicturesSchema[]
  author: string
}