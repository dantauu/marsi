import type { UserCardGrid } from "@/app/types/global.d.ts"
import { useNavigate } from "@tanstack/react-router"
import { Route as SlidesIdRoute } from "@/app/routes/_app/_layout/search-id/$id.tsx"

export const CardGridLayout = ({
  photo_url,
  first_name,
  age,
  id,
}: UserCardGrid) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() =>
        navigate({
          to: SlidesIdRoute.to,
          params: { id },
        })
      }
      className="flex flex-col gap-2 w-[158px] h-[250px] mini-mobile:w-[182px] mini-mobile:h-[285px]"
    >
      <div className="w-full h-[253.4px] bg-[#c2c1c1] rounded-[28px]">
        {photo_url && (
          <img
            className="w-full rounded-[28px] object-cover h-[218px] mini-mobile:h-full"
            src={
              Array.isArray(photo_url)
                ? (photo_url[0] ?? "")
                : (photo_url ?? "")
            }
            alt=""
          />
        )}
      </div>
      <div className="">
        <p className="font-HelveticaB text-[16px]">
          {first_name}, {age ? age : "?"}
        </p>
      </div>
    </div>
  )
}
