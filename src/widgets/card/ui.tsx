import Card from "@/entities/search/ui/card"
import { MockCardData } from "@/lib/data/cards"

const CardHuman = () => {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-y-3">
      {MockCardData.map((item) => (
        <Card
          key={item.id}
          avatar={item.avatar}
          age={item.age}
          name={item.name}
        />
      ))}
    </div>
  )
}

export default CardHuman
