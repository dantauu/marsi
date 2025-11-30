import type { UserCardExpandedProps } from "@/app/types/global.d.ts"
import { useNavigate } from "@tanstack/react-router"
import { Route as SlidesRoute } from "@/app/routes/_app/_layout/search-id/$id.tsx"

export const CardExpandedLayout = ({
  id,
  photo_url,
  first_name,
  age,
  goal,
  height,
}: UserCardExpandedProps) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() =>
        navigate({
          to: SlidesRoute.to,
          params: { id },
        })
      }
      className="relative flex flex-col items-center gap-2 w-[300px] h-[380px]"
    >
      <div className="absolute w-full h-full bg-[#c2c1c1] rounded-[28px]">
        {photo_url && (
          <img
            className="w-full h-full rounded-[28px] object-cover"
            src={photo_url}
            alt=""
          />
        )}
      </div>
      <div className="flex flex-col absolute z-5 bottom-2 left-3 text-[var(--color-text-white)]">
        <p className="font-HelveticaB text-[21px]">
          {first_name}, {age}
        </p>
        <p className="font-HelveticaB text-[18px]">
          Цель: {goal || "Не указано"}{" "}
        </p>
        <p className="font-HelveticaB text-[18px]">
          Рост: {height || "Не указано"}{" "}
        </p>
      </div>
    </div>
  )
}
