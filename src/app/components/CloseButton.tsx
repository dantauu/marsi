import { useTelegram } from "../providers/telegram"

interface CloseButtonProps {
  className?: string
}

export const CloseButton = ({ className = "" }: CloseButtonProps) => {
  const { closeApp } = useTelegram()

  return (
    <button
      onClick={closeApp}
      className={`px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors ${className}`}
    >
      Закрыть
    </button>
  )
}
