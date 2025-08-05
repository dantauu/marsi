import type { UserCardExpanded } from "@/app/types/global.d.ts"
import { CardExpandedLayout } from "@/entities/search/ui/card/card-expanded.tsx"

const CardExpanded = ({ data }: { data: UserCardExpanded[] }) => {
  //remove this
  return (
    <div className="flex flex-col items-center gap-y-3">
      {data.map((item) => {
        return (
          <CardExpandedLayout
            id={item.id}
            key={item.id}
            photo_url={item.photo_url}
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
