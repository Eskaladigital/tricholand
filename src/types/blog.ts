export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  image: string
  imageAlt: string
  tags: string[]
  readingTime: number // minutos
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  image: string
  imageAlt: string
  tags: string[]
  readingTime: number
}
