import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import type { WebApp, WebAppUser } from "@twa-dev/types"

export interface ITelegramContext {
  webApp?: WebApp
  user?: WebAppUser
  closeApp?: () => void
}

const TelegramContext = createContext<ITelegramContext>({})

export const useTelegram = () => useContext(TelegramContext)

interface TelegramProviderProps {
  children: ReactNode
}

export const TelegramProvider = ({ children }: TelegramProviderProps) => {
  const [webApp, setWebApp] = useState<WebApp | null>(null)

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp
    if (app) {
      app.ready()
      app.disableVerticalSwipes()
      app.enableClosingConfirmation()
      app.setHeaderColor("#FFFFFF")
      app.setBackgroundColor("#FFFFFF")
      app.expand()

      if (app.isVersionAtLeast?.("6.2")) {
        app.requestFullscreen()
      }
      setWebApp(app)
    }
  }, [])

  const closeApp = () => {
    if (webApp) {
      webApp.close()
    }
  }

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          initData: webApp.initData,
          user: webApp.initDataUnsafe.user,
          closeApp,
        }
      : {}
  }, [webApp])

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  )
}
