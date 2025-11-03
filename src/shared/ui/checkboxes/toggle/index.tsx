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
    light: { x: 2 },
    dark: { x: isMiniMobile ? 35 : 40 },
  }
  return (
    <div
      onClick={() => dispatch(toggleTheme())}
      className="relative flex items-center justify-between w-[71px] h-[38px] mini-mobile:w-[78px] mini-mobile:h-[40px] cursor-pointer bg-[var(--color-bg-toggle)] rounded-full"
    >
      <motion.div
        animate={theme}
        variants={activeVariants}
        transition={{ duration: 0.23, ease: "linear" }}
        className="absolute left-0 w-[34px] h-[34px] mini-mobile:w-[36px] mini-mobile:h-[36px] bg-white rounded-full z-0"
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
