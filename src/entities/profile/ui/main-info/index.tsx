import Block from "@/shared/ui/block"

export const MainInfo = () => {
  const count = 100
  return (
    <div className="mt-[20px] shadow-shadow-block px-[8px] py-[8px] rounded-[10px]">
      <Block
        className="flex items-center justify-center max-w-[300px] mx-auto"
        text={
          <>
            Ключевая информация:
            <span className="text-main-green font-HelveticaB"> {count}%</span>
          </>
        }
      />
      <div className="flex flex-col gap-3 mt-[20px]">
        <Block text="Имя: dantau" />
        <Block text="Возраст: 19" />
        <Block text="Пол: Мужской" />
        <Block text="Город: Ростов" />
        <Block text="Цель: Серьёзные отношения" />
      </div>
    </div>
  )
}
