export type CardProps = {
  id?: number
  username: string
  age: number
  avatar?: string
}

enum LikesTab {
  MUTUAL = "mutual",
  INCOMING = "incoming",
}

export { LikesTab }
