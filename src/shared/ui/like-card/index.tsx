import Button from "@/shared/ui/buttons/button.tsx"
import SvgArrow from "@/assets/icons/Arrow.tsx"
import type { User } from "@/app/types/global"
import SvgTrash from "@/assets/icons/Trash.tsx"
import SvgMessageLike from "@/assets/icons/MessageLike.tsx"

export const LikeCard = ({
  isLocked,
  users,
  onUnlike,
}: {
  isLocked?: boolean
  users: User[] | undefined
  onUnlike?: (userId: string) => void
}) => {
  return (
    <div>
      {users && users.length > 0 ? (
        <div className="flex flex-col gap-7">
          {users.map((item) => (
            <div
              key={item.id}
              className="relative flex justify-between items-center rounded-[10px] shadow-shadow-block px-0.5 py-1.5"
            >
              {isLocked && (
                <div className="absolute z-1 inset-0 rounded-[10px] flex items-center justify-center">
                  <Button variant="green" className="px-3 py-2">
                    Приобрести подписку <SvgArrow />{" "}
                  </Button>
                </div>
              )}
              <div
                className={`flex items-center gap-1 ${isLocked && "filter blur-[5px] inset-0"}`}
              >
                <img
                  className="min-w-[70px] h-[70px] mini-mobile:min-w-[80px] mini-mobile:h-[80px] object-cover rounded-full"
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
              <div className={`flex gap-3 ${isLocked && "blur-[4px] filter"}`}>
                <Button
                  onClick={() => onUnlike?.(item.id)}
                  variant="default"
                >
                  <SvgTrash className="w-12 h-12" />
                </Button>
                <Button variant="default">
                  <SvgMessageLike className="w-13 h-13" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Пока никого нет</p>
      )}
    </div>
  )
}
