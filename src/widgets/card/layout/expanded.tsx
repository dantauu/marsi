import type { UserCardExpanded } from "@/app/types/global.ts"
import { CardExpandedLayout } from "@/entities/search/ui/card/card-expanded.tsx"
import { getPhotoVariant } from "@/lib/utils/photo-variant"

const CardExpanded = ({ data }: { data: UserCardExpanded[] }) => {
  return (
    <div className="flex flex-col items-center gap-y-3">
      {data.map((item) => {
        const url = getPhotoVariant(item.photo_url?.items[0], "large")
        return (
          <CardExpandedLayout
            id={item.id}
            key={item.id}
            photo_url={url ?? ""}
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
