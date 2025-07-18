import { useState } from "react"
import { useSwipeable } from "react-swipeable"

type Props = { photo_url: string[] }

export const SwipePhotos: React.FC<Props> = ({ photo_url }) => {
  const [index, setIndex] = useState(0)
  const count = photo_url.length

  const handSwipe = (dir: "Left" | "Right") =>
    setIndex((i) =>
      dir === "Left" ? Math.min(count - 1, i + 1) : Math.max(0, i - 1)
    )

  const handlers = useSwipeable({
    onSwipedLeft: () => handSwipe("Left"),
    onSwipedRight: () => handSwipe("Right"),
  })

  return (
    <div {...handlers} style={{ userSelect: "none" }}>
      <div className="relative h-[500px]">
        <img
          src={photo_url[index]}
          alt=""
          className="w-full h-full object-cover rounded-[28px] select-none"
        />
      </div>
      <div
        className="absolute left-0 top-0 bottom-0 w-[50%] select-none"
        onClick={() => handSwipe("Right")}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-[50%] select-none"
        onClick={() => handSwipe("Left")}
      />
      <div className="flex justify-center gap-3 absolute top-8 left-0 right-0">
        {photo_url.map((_, item) => (
          <div
            className={`w-[40px] h-[6px] border-white border-1 rounded-2xl duration-200 bg-[${item === index && "#fff"}]`}
          />
        ))}
      </div>
    </div>
  )
}
