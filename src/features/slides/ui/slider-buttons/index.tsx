import SvgCheck from "@/assets/icons/Check"
import SvgCross from "@/assets/icons/Cross"
import { useAppDispatch } from "@/redux/hooks"
import { handleDislike, handleLike } from "@/redux/slices/slider-slice.ts"
import Button from "@/shared/ui/buttons/button.tsx"

export const SliderButtons = () => {
  const dispatch = useAppDispatch()
  return (
    <div className="absolute bottom-0 w-full flex items-center justify-between px-3">
      <Button className="w-[100px] bg-main-red rounded-[14px] py-1" variant="default" onClick={() => dispatch(handleDislike())}>
        <SvgCross className="w-[50px] h-[50px] text-[#fff9] " />
      </Button>
      <Button className="w-[100px] bg-main-green rounded-[14px] py-1" variant="default" onClick={() => dispatch(handleLike())}>
        <SvgCheck className="w-[50px] h-[50px] text-[#fff9]" />
      </Button>
    </div>
  )
}
