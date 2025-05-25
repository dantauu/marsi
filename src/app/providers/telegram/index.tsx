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

      // Настройка внешнего вида
      app.setHeaderColor("#FFFFFF") // Цвет хедера
      app.setBackgroundColor("#FFFFFF") // Цвет фона

      // Скрываем стандартную кнопку закрытия и делаем хедер прозрачным
      app.MainButton.hide()
      app.BackButton.hide()
      app.isExpanded = true

      // Устанавливаем прозрачный цвет хедера
      app.setHeaderColor("rgba(255, 255, 255, 0.0)")

      // Отключаем стандартный хедер
      app.headerColor = "bg_transparent"
      app.backgroundColor = "#FFFFFF"

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
