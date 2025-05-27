import SvgArrow from "../../../../assets/icons/Arrow"
import SvgBrokeHeart from "../../../../assets/icons/BrokeHeart"
import Button from "../../../../shared/ui/button"

const Subscribe = () => {
  return (
    <div className="flex justify-between items-center mt-[20px] h-[68px] px-2 shadow-shadow-block rounded-[10px]">
      <div className="flex items-center gap-2">
        <div className="">
          <p className="font-ManropeM text-[15px] mini-mobile:text-16px">
            Подписка не активна
          </p>
        </div>
        <SvgBrokeHeart />
      </div>
      <Button
        className="font-HelveticaB w-[120px] h-[30px] mini-mobile:w-[127px] text-[14.8px] mini-mobile:text-[16px]"
        variant="green"
      >
        Приобрести <SvgArrow />
      </Button>
    </div>
  )
}

export default Subscribe
