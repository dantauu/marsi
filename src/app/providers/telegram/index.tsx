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
      // Базовая инициализация
      app.ready()

      // Отключаем свайпы и жесты
      app.disableVerticalSwipes()
      app.enableClosingConfirmation()

      // Устанавливаем прозрачный фон хедера и максимальную высоту
      app.setHeaderColor("#FFFFFF")

      // Включаем полноэкранный режим
      app.expand()

      // Устанавливаем безопасную зону для контента
      const safeArea = app.viewportStableHeight
      document.documentElement.style.setProperty(
        "--tg-viewport-height",
        `${safeArea}px`
      )

      // Скрываем все стандартные элементы Telegram
      app.BackButton.hide()
      app.MainButton.hide()
      if (app.SettingsButton) app.SettingsButton.hide()

      // Отключаем стандартный хедер (если возможно)
      if (app.headerColor) {
        app.headerColor = "bg_transparent"
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
