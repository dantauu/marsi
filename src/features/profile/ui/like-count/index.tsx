import SvgArrow from "../../../../assets/icons/Arrow"
import Button from "../../../../shared/ui/button"

const LikeCount = () => {
  return (
    <div className="flex flex-col items-center justify-between py-2 w-full mini-mobile:w-[210px] h-[105px] shadow-shadow-block rounded-[10px]">
      <div className="flex flex-col items-center">
        <div className="">
          <p className="font-HelveticaB text-[16px]">Вам посставили лайк:</p>
        </div>
        <div className="">
          <p className="font-HelveticaB text-[16px]">10 раз</p>
        </div>
      </div>
      <Button className="w-[125px] h-[35px] font-HelveticaB" variant="green">
        Смотреть <SvgArrow />
      </Button>
    </div>
  )
}

export default LikeCount
