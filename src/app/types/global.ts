export type UserCard = {
  id?: number
  username: string
  age: number
  avatar: string | undefined
  gender: "male" | "female"
  city: string
  goal: string
}

export type Locations = {
  id: number
  name: string
  region: string
}

export type UserCardSearch = Omit<UserCard, "gender" | "goal" | "city">

enum LikesTab {
  MUTUAL = "mutual",
  INCOMING = "incoming",
}

export { LikesTab }
