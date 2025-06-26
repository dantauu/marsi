export type CardProps = {
  name: string
  age: number
  avatar: string
  gender?: string,
  goal?: string,
  city?: string,
}

enum LikesTab {
  MUTUAL = "mutual",
  INCOMING = "incoming",
}

export { LikesTab }
