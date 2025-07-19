import { CardGridLayout } from "@/entities/search/index.ts"
import type { UserCardSearch } from "@/app/types/global.d.ts"
import { Route } from "@/app/routes/_app/_layout/search"
import { useSearch } from "@tanstack/react-router"
import { useUserPhoto } from "@/lib/hooks/use-user-photo.ts"

const CardExpanded = ({ data }: { data: UserCardSearch[] }) => {
  //remove this
  const params = useSearch({ from: Route.id })
  const { mockAvatar, userPhoto } = useUserPhoto(params)
  return (
    <div className="grid grid-cols-2 justify-items-center gap-y-3">
      {data.map((item) => {
        const photo =
          userPhoto.get(item.id) ?? mockAvatar.get(Number(item.id)) ?? []
        return (
          <CardGridLayout
            id={item.id}
            key={item.id}
            photo_url={Array.isArray(photo) ? photo : [photo]}
            age={item.age}
            first_name={item.first_name}
          />
        )
      })}
    </div>
  )
}

export default CardExpanded
