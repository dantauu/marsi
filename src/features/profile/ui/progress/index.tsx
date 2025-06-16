import Button from "@/shared/ui/buttons/button.tsx"

export const Progress = () => {
  return (
    <div className="flex items-center px-2 mt-[20px] h-[42px] shadow-shadow-block rounded-[10px]">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <div className="">
            <p className="font-HelveticaB text-[16px] mini-mobile:text-[18px]">
              Прогресс заполнения:
            </p>
          </div>
          <div className="">
            <p className="text-red-500 font-HelveticaB text-[16px] mini-mobile:text-[16.5px]">
              20%
            </p>
          </div>
        </div>
        <Button
          className="font-HelveticaB text-blue-600 text-[14px] mini-mobile:text-16px"
          variant="default"
        >
          Продолжить
        </Button>
      </div>
    </div>
  )
}
