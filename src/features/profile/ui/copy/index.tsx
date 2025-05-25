import SvgCopy from "../../../../assets/icons/Copy"

const Copy = () => {
  return (
    <div className="flex flex-col items-center justify-between py-1.5 h-[105px] bg-main-green w-[180px] rounded-[10px]">
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
