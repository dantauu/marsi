import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import type { WebApp, WebAppUser } from "@twa-dev/types"

export interface ITelegramContext {
  webApp?: WebApp
  user?: WebAppUser
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
      app.expand()
      app.disableVerticalSwipes()
      setWebApp(app)
    }
  }, [])

  useEffect(() => {
    if (!webApp) return

    const backButton = webApp.BackButton

    // Показываем кнопку назад только на определенных маршрутах
    const path = window.location.pathname
    const hidePaths = ["/", "/search"]

    if (hidePaths.includes(path)) {
      backButton.hide()
    } else {
      backButton.show()
    }

    backButton.onClick(() => {
      window.history.back()
    })

    return () => {
      backButton.hide()
      backButton.onClick(() => {})
    }
  }, [webApp])

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          initData: webApp.initData,
          user: webApp.initDataUnsafe.user,
        }
      : {}
  }, [webApp])

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  )
}
