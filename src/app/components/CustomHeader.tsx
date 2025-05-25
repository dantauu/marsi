import { useTelegram } from "../providers/telegram"

interface CustomHeaderProps {
  title?: string
}

export const CustomHeader = ({ title }: CustomHeaderProps) => {
  const { closeApp } = useTelegram()

  return (
    <header className="fixed top-0 left-0 right-0 h-[54px] bg-[#ffffff9e] flex items-center justify-between px-4 z-50">
      <div className="flex-1">
        {title && (
          <h1 className="text-lg font-medium text-gray-900">{title}</h1>
        )}
      </div>

      <button
        onClick={closeApp}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
        aria-label="Закрыть"
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
    </header>
  )
}
