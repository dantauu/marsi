import Button from "@/shared/ui/buttons/button.tsx"
import SvgArrow from "@/assets/icons/Arrow.tsx"
import type { User } from "@/app/types/user"
import { useNavigate } from "@tanstack/react-router"
import { Route as SlidesIdRoute } from "@/app/routes/_app/_layout/search-id/$id.tsx"
import SvgCrossOrigin from "@/assets/icons/CrossOrigin.tsx"
import SvgArrowPath from "@/assets/icons/ArrowPath.tsx"
import SvgChat from "@/assets/icons/Chat.tsx"
import { useTelegram } from "@/app/providers/telegram"

export const LikeCard = ({
  isLocked,
  users,
  likesTitle,
  onUnlike,
  isMessage,
}: {
  isLocked?: boolean
  users: User[] | undefined
  onUnlike?: (userId: string) => void
  likesTitle: string
  isMessage?: boolean
}) => {
  const navigate = useNavigate()
  const { webApp } = useTelegram()
  const platform = webApp?.platform ?? ""
  const mobile = ["android", "ios"]
  return (
    <div>
      <div>
        <div
          className={`fixed flex items-center top-0 w-full z-2 bg-white shadow-shadow-block px-4 ${mobile.includes(platform) ? "pt-[92px] h-[130px]" : "pt-0 h-[80px]"}`}
        >
          <Button
            onClick={() => navigate({ to: "/likes" })}
            variant={"default"}
          >
            <SvgArrowPath />
          </Button>
          <p className="text-[18px] text-center mx-auto">{likesTitle}</p>
        </div>
      </div>
      {users && users.length > 0 ? (
        <div
          className={`grid grid-cols-2 justify-items-center gap-7 pb-[220px] ${mobile.includes(platform) ? "pt-[70px]" : "pt-[80px]"}`}
        >
          {users.map((item) => (
            <div
              key={item.id}
              className="relative w-full max-w-[180px] h-[275px] flex flex-col pb-1 items-center rounded-[15px] shadow-shadow-block"
            >
              {isLocked && (
                <div className="absolute z-1 inset-0 rounded-[10px] flex items-center justify-center">
                  <Button variant="green" className="px-3 py-2">
                    Приобрести подписку <SvgArrow />{" "}
                  </Button>
                </div>
              )}
              <div
                className={`w-full flex flex-col items-center gap-1 ${isLocked && "filter blur-[5px] inset-0"}`}
                onClick={() => {
                  navigate({ to: SlidesIdRoute.to, params: { id: item.id } })
                }}
              >
                <img
                  className="w-full h-full max-h-[200px] min-h-[195px] object-cover rounded-[15px]"
                  src={
                    Array.isArray(item.photo_url)
                      ? item.photo_url[0]
                      : item.photo_url
                  }
                />
                <p className="text-lg text-ellipsis overflow-hidden whitespace-nowrap max-w-[83px]">
                  {item.first_name}, {item.age}
                </p>
              </div>
              <div
                className={`flex justify-between mx-auto px-2 gap-3 ${isMessage && "w-full"} ${
                  isLocked && "blur-[4px]" + " filter"
                }`}
              >
                <Button onClick={() => onUnlike?.(item.id)} variant="default">
                  <SvgCrossOrigin className="w-10 h-10" />
                </Button>
                {isMessage && (
                  <a href={`https://t.me/${item.username}`}>
                    <Button variant="default">
                      <SvgChat className="w-11 h-11 text-main-green" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="pt-[100px] flex justify-center">Пока никого нет</p>
      )}
    </div>
  )
}
