import { MockCardData } from "@/lib/data/cards"
import { Card } from "@/entities/search/index.ts"
import type { CardProps } from "@/app/types/global.ts"

const CardHuman = ({ data }: { data: CardProps[] }) => {
  const imgAvatar = MockCardData.map((item) => item.avatar)
  return (
    <div className="grid grid-cols-2 justify-items-center gap-y-3">
      {data.map((item, index) => (
        <Card
          key={item.id}
          avatar={imgAvatar[index % imgAvatar.length]}
          age={item.age}
          username={item.username}
        />
      ))}
    </div>
  )
}

export default CardHuman
