import Button from "@/shared/ui/buttons/button.tsx"
import { useAppDispatch } from "@/redux/hooks.ts"
import { openFilterModal } from "@/redux/slices/modal-slice.ts"

export const NotifyLastCard = () => {
  const dispatch = useAppDispatch()
  const handleReload = () => {
    window.location.reload()
  }
  const handleFilterOpen = () => {
    dispatch(openFilterModal())
  }
  return (
    <div className="flex flex-col px-5 py-10 mt-5 gap-8 justify-center text-[#000] bg-[#e4e4e4] rounded-[20px] h-fit w-full">
      <p className="font-ManropeM text-[18px]">
        Похоже вы пролистали всех пользователей, измените фильтры или попробуйте
        перезагрузить страницу.
      </p>
      <div className="flex flex-col gap-5">
        <Button
          onClick={handleReload}
          className="w-full h-[50px] mx-auto"
          variant={"green"}
        >
          Перезагрузить
        </Button>
        <Button
          onClick={handleFilterOpen}
          className="w-full h-[50px] mx-auto"
          variant={"green"}
        >
          Изменить фильтры
        </Button>
      </div>
    </div>
  )
}
