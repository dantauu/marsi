import { useAppSelector } from "@/redux/hooks.ts"
import { useEffect } from "react"
import { useTelegram } from "@/app/providers/telegram"

export const useThemeEffect = () => {
  const theme = useAppSelector((state) => state.theme_switch.theme)
  const { webApp } = useTelegram()

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  useEffect(() => {
    if (!webApp) return

    if (webApp.version && parseFloat(webApp.version) >= 6.1) {
      const bg = theme === "dark" ? "#1a1a1a" : "#ffffff"
      webApp.setHeaderColor(bg)
      webApp.setBackgroundColor(bg)
    }
  }, [theme, webApp])
}
