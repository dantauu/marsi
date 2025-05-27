import Card from "../../intities/search/ui/card"
import { MockCardData } from "../../lib/data/cards"

const CardHuman = () => {
  return (
    <div className="grid justify-items-center grid-cols-2 gap-y-3 gap-x-2">
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
