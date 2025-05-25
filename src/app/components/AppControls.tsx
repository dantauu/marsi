import { useTelegram } from "../providers/telegram"

interface AppControlsProps {
  className?: string
}

export const AppControls = ({ className = "" }: AppControlsProps) => {
  const { closeApp } = useTelegram()

  return (
    <div className={`fixed top-0 right-0 p-4 flex gap-2 z-50 ${className}`}>
      <button
        onClick={closeApp}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Закрыть приложение"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}
