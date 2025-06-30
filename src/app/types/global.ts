export type CardProps = {
  id?: number
  username: string
  age: number
  avatar?: string
}

export type Locations = {
  id: number
  name: string
  region: string
}

enum LikesTab {
  MUTUAL = "mutual",
  INCOMING = "incoming",
}

export { LikesTab }
