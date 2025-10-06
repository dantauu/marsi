import Button from "@/shared/ui/buttons/button.tsx"
import SvgArrow from "@/assets/icons/Arrow.tsx"
import type { User } from "@/app/types/user"
import { useNavigate } from "@tanstack/react-router"
import { Route as SlidesIdRoute } from "@/app/routes/_app/_layout/search-id/$id.tsx"
import SvgCrossOrigin from "@/assets/icons/CrossOrigin.tsx"
import SvgArrowPath from "@/assets/icons/ArrowPath.tsx"
import SvgChat from "@/assets/icons/Chat.tsx"
import { usePlatform } from "@/shared/lib/hooks/use-platform.ts"
import LoadingCircle from "@/shared/ui/loading/circle.tsx"

export const LikeCard = ({
  isLocked,
  users,
  likesTitle,
  onUnlike,
  isMessage,
  isUnlikeIncomingLoading,
  isUnlikeLoading
}: {
  isLocked?: boolean
  users: User[] | undefined
  onUnlike?: (userId: string) => void
  likesTitle: string
  isMessage?: boolean
  isUnlikeIncomingLoading?: boolean
  isUnlikeLoading?: boolean
}) => {
  const navigate = useNavigate()
  const { isMobile } = usePlatform()
  const isPending = isUnlikeIncomingLoading || isUnlikeLoading
  return (
    <div>
      <div>
        <div
          className={`fixed flex max-w-[610px] items-center top-0 w-full z-2 bg-white shadow-hard px-4 ${isMobile ? "pt-[95px] h-[133px]" : "pt-0 h-[80px]"}`}
        >
          <Button
            onClick={() => navigate({ to: "/likes" })}
            variant={"default"}
          >
            <SvgArrowPath className="w-[15px] h-[27px]" />
          </Button>
          <p className="text-[18px] text-center mx-auto">{likesTitle}</p>
        </div>
      </div>
      {users && users.length > 0 ? (
        <div
          className={`grid grid-cols-2 justify-items-center gap-7 pb-[220px] ${isMobile ? "pt-[70px]" : "pt-[80px]"}`}
        >
          {users.map((item) => (
            <div
              key={item.id}
              className="relative w-full max-w-[180px] h-[270px] flex flex-col pb-1 items-center rounded-[15px] shadow-easy"
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
                <div className="flex items-center">
                  <p className="text-lg text-ellipsis overflow-hidden whitespace-nowrap max-w-[83px]">
                    {item.first_name}
                  </p>
                  <p className="text-lg">, {item.age}</p>
                </div>
              </div>
              <div
                className={`flex justify-between mx-auto px-2 gap-3 ${isMessage && "w-full"} ${
                  isLocked && "blur-[4px]" + " filter"
                }`}
              >
                <Button onClick={() => onUnlike?.(item.id)} variant="default">
                  {isPending ? <LoadingCircle /> : <SvgCrossOrigin className="w-9 h-9" />}
                </Button>
                {isMessage && (
                  <a href={`https://t.me/${item.username}`}>
                    <Button variant="default">
                      <SvgChat className="w-9 h-9 text-main-green" />
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
