import { CardGridLayout } from "@/entities/search/index.ts"
import type { UserCardGrid } from "@/app/types/global.ts"
import { getPhotoVariant } from "@/lib/utils/photo-variant"

const CardGrid = ({ data }: { data: UserCardGrid[] }) => {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-y-3">
      {data.map((item) => {
        const url = getPhotoVariant(item.photo_url?.items[0], "medium")
        return (
          <CardGridLayout
            id={item.id}
            key={item.id}
            photo_url={url ?? ""}
            age={item.age}
            first_name={item.first_name}
          />
        )
      })}
    </div>
  )
}

export default CardGrid
