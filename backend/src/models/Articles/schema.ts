import { Schema, Document, model } from 'mongoose'

const collection = 'Articles'

export interface ArticleSchema {
  title: string
  description: string
  author: string
  status: string
}

export interface ArticleSchemaWithDocument extends ArticleSchema, Document {
}

const articleSchema = new Schema<ArticleSchemaWithDocument>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive', 'deleted']
  }
}, {
  collection,
  versionKey: false,
  timestamps: true
})

export default model(collection, articleSchema)