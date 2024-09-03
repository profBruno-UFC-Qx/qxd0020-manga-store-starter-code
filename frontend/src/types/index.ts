


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