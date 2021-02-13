import { Schema, Document, model } from 'mongoose'
import { ArticlesSchema } from '../../types/models/Articles'

const collection = 'Articles'

export interface ArticlesSchemaWithDocument extends ArticlesSchema, Document {
  // add more field
}

const articlesSchema = new Schema<ArticlesSchemaWithDocument>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ArticleCategories'
    }
  ],
  tags: [String],
  pictures: [
    {
      type: {
        type: String,
        default: 'normal'
      },
      url: {
        type: String
      }
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
}, {
  collection,
  versionKey: false,
  timestamps: true
})

export default model(collection, articlesSchema)