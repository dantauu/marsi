import { useTelegram } from "@/app/providers/telegram"

export const usePlatform = () => {
  const { webApp } = useTelegram()
  const platform = webApp?.platform ?? ""
  const mobile = ["android", "ios"]
  const isMobile = mobile.includes(platform)
  return { isMobile }
}
