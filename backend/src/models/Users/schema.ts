import { Schema, Document, model } from 'mongoose'
import { UsersSchema } from '../../types/models/Users'

const collection = 'Users'

export interface UsersSchemaWithDocument extends UsersSchema, Document {
  // add more field
}

const usersSchema = new Schema<UsersSchemaWithDocument>({
  username: {
    type: 'string',
    unique: true,
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    unique: true,
    required: true
  },
  name: {
    type: 'string'
  },
  surname: {
    type: 'string'
  }
}, {
  collection,
  versionKey: false,
  timestamps: true // createdAt updatedAt
})

export default model(collection, usersSchema)