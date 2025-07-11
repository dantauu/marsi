import { MockCardData } from "@/lib/data/cards"
import { Card } from "@/entities/search/index.ts"
import type { UserCardSearch } from "@/app/types/global.d.ts"
import { Route } from "@/app/routes/_app/_layout/search"
import { useGetUsersQuery } from "@/redux/api/user.ts"
import { useSearch } from "@tanstack/react-router"

const CardHuman = ({ data }: { data: UserCardSearch[] }) => {
  const avatar = new Map<number, string>(
    MockCardData.map((item) => [item.id, item.avatar])
  )
  const params = useSearch({ from: Route.id })
  const { data: user } = useGetUsersQuery(params)
  if (!data) throw new Error("No user found.")
  const userPhoto = new Map(user?.map((item) => [item.id, item.photo_url]))
  return (
    <div className="grid grid-cols-2 justify-items-center gap-y-3">
      {data.map((item) => {
        const photo =
          userPhoto.get(item.id) ?? avatar.get(Number(item.id)) ?? ""
        return (
          <Card
            key={item.id}
            photo_url={photo}
            age={item.age}
            first_name={item.first_name}
          />
        )
      })}
    </div>
  )
}

export default CardHuman
