import InputWithIcon from "@/shared/ui/inputs.tsx"

export const EditAbout = () => {
  return (
    <div className="flex flex-col justify-center gap-4 py-[6px] px-[4px] w-full shadow-shadow-block rounded-[18px]">
      <div>
        <p className="text-xl font-HelveticaB">О себе</p>
        <InputWithIcon placeholder={"Расскажите о себе"} />
      </div>
      <div>
        <p className="text-xl font-HelveticaB">Ваше образование</p>
        <InputWithIcon placeholder={"Кем вы работаете"} />
      </div>
    </div>
  )
}
