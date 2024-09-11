export type Manga = {
  id: number,
  title: string,
  number: number,
  price: number,
  summary: string,
  cover: Cover
}

type Cover = {
  id: number,
  url: string
}

export type User = {
  id: number,
  username: string,
  role: Role,
  email: string
}

type Role = {
  name: string
}

export interface ApplicationError {
  error: {
    name: string,
    message: string,
  }
}