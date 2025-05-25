import { useTelegram } from "../providers/telegram"

interface HeaderProps {
  title?: string
}

export const Header = ({ title = "Marsi" }: HeaderProps) => {
  const { closeApp } = useTelegram()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <h1 className="text-lg font-semibold">{title}</h1>
      <button
        onClick={closeApp}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 active:bg-black/10 transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        >
          <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  )
}
