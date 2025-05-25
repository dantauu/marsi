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
      // Инициализация приложения
      app.ready()

      // Установка полноэкранного режима
      app.expand()

      // Включаем подтверждение закрытия (это отключит свайп)
      app.enableClosingConfirmation()

      // Отключаем вертикальные свайпы
      app.disableVerticalSwipes()

      // Настройка внешнего вида для полного скрытия хедера
      app.setHeaderColor("bg_color") // Делаем хедер прозрачным

      // // Скрываем все стандартные кнопки
      app.BackButton.hide()
      app.MainButton.hide()
      app.SettingsButton?.hide?.()

      setWebApp(app)
    }
  }, [])

  // Функция для закрытия приложения
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
