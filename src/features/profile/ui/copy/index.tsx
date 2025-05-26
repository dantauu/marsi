import SvgCopy from "../../../../assets/icons/Copy"

const Copy = () => {
  return (
    <div className="flex flex-col items-center justify-between py-1.5 mini-mobile:h-[105px] h-[85px] bg-main-green w-full mini-mobile:w-[180px] rounded-[10px]">
      <div className="">
        <p className="text-center text-white font-HelveticaB text-[16px]">
          Скопировать ссылку на профиль
        </p>
      </div>
      <SvgCopy className="text-white" />
    </div>
  )
}

export default Copy
