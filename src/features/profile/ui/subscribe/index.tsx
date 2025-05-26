import SvgArrow from "../../../../assets/icons/Arrow"
import SvgBrokeHeart from "../../../../assets/icons/BrokeHeart"
import Button from "../../../../shared/ui/button"

const Subscribe = () => {
  return (
    <div className="flex justify-between items-center mt-[20px] h-[68px] px-2 shadow-shadow-block rounded-[10px]">
      <div className="flex items-center gap-2">
        <div className="">
          <p className="font-ManropeM">Подписка не активна</p>
        </div>
        <SvgBrokeHeart />
      </div>
      <Button className="font-HelveticaB w-[127px] h-[30px]" variant="green">
        Приобрести <SvgArrow />
      </Button>
    </div>
  )
}

export default Subscribe
