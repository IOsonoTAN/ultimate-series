export interface UsersSchema {
  username: string
  password: string
  email: string
  name?: string | null
  surname?: string | null
}