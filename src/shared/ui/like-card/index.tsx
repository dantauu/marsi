import Button from "@/shared/ui/buttons/button.tsx"
import SvgArrow from "@/assets/icons/Arrow.tsx"
import type { User } from "@/app/types/global"

export const LikeCard = ({ users, isLocked }: { isLocked?: boolean, users: User[] | undefined }) => {
  return (
    <div>{users ? (
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
                className="min-w-[80px] h-[80px] object-cover rounded-full"
                src={Array.isArray(item.photo_url) ? item.photo_url[0] : item.photo_url}
              />
              <p className="text-lg text-ellipsis overflow-hidden whitespace-nowrap max-w-[83px]">
                {item.first_name}, {item.age}
              </p>
            </div>
            <div className={`flex gap-2 ${isLocked && "blur-[4px] filter"}`}>
              <Button variant="red" className="w-[100px] h-[35px]">
                Удалить
              </Button>
              <Button variant="green" className="w-[100px] h-[35px]">
                Написать
              </Button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>Пока никого нет</p>
    )}</div>
  )
}
