export interface INote {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt?: Date | null
}
