import { useAppSelector } from "@/redux/hooks.ts"
import { useEffect } from "react"

export const useThemeEffect = () => {
  const theme = useAppSelector((state) => state.theme_switch.theme)

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])
}
