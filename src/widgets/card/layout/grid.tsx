import { CardGridLayout } from "@/entities/search/index.ts"
import type { UserCardGrid } from "@/app/types/global.d.ts"

const CardGrid = ({ data }: { data: UserCardGrid[] }) => {
  //remove this
  return (
    <div className="grid grid-cols-2 justify-items-center gap-y-3">
      {data.map((item) => {
        return (
          <CardGridLayout
            id={item.id}
            key={item.id}
            photo_url={item.photo_url}
            age={item.age}
            first_name={item.first_name}
          />
        )
      })}
    </div>
  )
}

export default CardGrid
