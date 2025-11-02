import Button from "@/shared/ui/buttons/button.tsx"
import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { useIsMiniMobile } from "@/shared/lib/hooks/use-media-query.ts"
import { memo } from "react"
import { toggleTheme } from "@/redux/slices/theme-switch.ts"

export const ToggleSwitch = memo(() => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.theme_switch.theme)
  const isMiniMobile = useIsMiniMobile()
  const activeVariants = {
    light: { x: 4 },
    dark: { x: isMiniMobile ? 52.8 : 56.5 },
  }
  return (
    <div
      onClick={() => dispatch(toggleTheme())}
      className="relative flex items-center justify-between w-[95px] h-[45px] mini-mobile:w-[104px] mini-mobile:h-[50px] cursor-pointer bg-[#BEBEBE] rounded-full"
    >
      <motion.div
        animate={theme}
        variants={activeVariants}
        transition={{ duration: 0.15, ease: "linear" }}
        className="absolute top-1 left-0 w-[43px] h-[45.2px] mini-mobile:w-[42px] mini-mobile:h-[42px] bg-black rounded-full z-0"
      />
      <Button
        className="relative z-1 w-[41px] h-[37px] mini-mobile:w-[46px] mini-mobile:h-[42px] transition-all duration-100 rounded-full"
        variant="default"
      ></Button>
      <Button
        variant="default"
        className="relative z-1 w-[42px] h-[45px] mini-mobile:w-[47px] mini-mobile:h-[50px] transition-all duration-100 rounded-full"
      ></Button>
    </div>
  )
})
