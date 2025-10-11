import SvgLayout1 from "@/assets/icons/Layout1"
import SvgLayout2 from "@/assets/icons/Layout2"
import Button from "@/shared/ui/buttons/button.tsx"
import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { toggleLayout } from "@/redux/slices/layout-switch.ts"
import { useIsMiniMobile } from "@/shared/lib/hooks/use-media-query.ts"
import { memo } from "react"

export const SwitchButtons = memo(() => {
  const dispatch = useAppDispatch()
  const layout = useAppSelector((state) => state.layout_switch.layout)
  const isMiniMobile = useIsMiniMobile()
  const activeVariants = {
    grid: { x: -1 },
    expanded: { x: isMiniMobile ? 52.8 : 56.5 },
  }
  return (
    <div className="relative flex items-center justify-between w-[95px] h-[45px] mini-mobile:w-[104px] mini-mobile:h-[50px] bg-black rounded-[10px]">
      <motion.div
        animate={layout}
        variants={activeVariants}
        transition={{ duration: 0.15, ease: "linear" }}
        className="absolute top-0 left-0 w-[43px] h-[45.2px] mini-mobile:w-[48px] mini-mobile:h-[50.2px] bg-main-green rounded-[10px] z-0"
      />
      <Button
        onClick={() => dispatch(toggleLayout())}
        className="relative z-1 w-[41px] h-[37px] mini-mobile:w-[46px] mini-mobile:h-[42px] transition-all duration-100 rounded-[10px]"
        variant="default"
      >
        <SvgLayout2 />
      </Button>
      <Button
        onClick={() => dispatch(toggleLayout())}
        variant="default"
        className="relative z-1 w-[42px] h-[45px] mini-mobile:w-[47px] mini-mobile:h-[50px] transition-all duration-100 rounded-[10px]"
      >
        <SvgLayout1 />
      </Button>
    </div>
  )
})
