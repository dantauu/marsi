import { MockCardData } from "@/lib/data/cards"
import { Card } from "@/entities/search/index.ts"
import type { UserCardSearch } from "@/app/types/global.d.ts"

const CardHuman = ({ data }: { data: UserCardSearch[] }) => {
  const avatar = new Map<number, string>(
    MockCardData.map((item) => [item.id, item.avatar])
  )
  return (
    <div className="grid grid-cols-2 justify-items-center gap-y-3">
      {data.map((item) => (
        <Card
          key={item.id}
          photo_url={avatar.get(Number(item.id))}
          age={item.age}
          first_name={item.first_name}
        />
      ))}
    </div>
  )
}

export default CardHuman
