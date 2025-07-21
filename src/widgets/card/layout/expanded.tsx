import type { UserCardExpanded } from "@/app/types/global.d.ts"
import { Route } from "@/app/routes/_app/_layout/search"
import { useSearch } from "@tanstack/react-router"
import { useUserPhoto } from "@/lib/hooks/use-user-photo.ts"
import { CardExpandedLayout } from "@/entities/search/ui/card/card-expanded.tsx"

const CardExpanded = ({ data }: { data: UserCardExpanded[] }) => {
  //remove this
  const params = useSearch({ from: Route.id })
  const { mockAvatar, userPhoto } = useUserPhoto(params)
  return (
    <div className="flex flex-col items-center gap-y-3">
      {data.map((item) => {
        const photo =
          item.photo_url ?? userPhoto.get(item.id) ?? mockAvatar.get(Number(item.id)) ?? []
        return (
          <CardExpandedLayout
            id={item.id}
            key={item.id}
            photo_url={Array.isArray(photo) ? photo : [photo]}
            age={item.age}
            first_name={item.first_name}
            goal={item.goal}
            height={item.height}
          />
        )
      })}
    </div>
  )
}

export default CardExpanded
