import { useTelegram } from "@/app/providers/telegram"
import Button from "@/shared/ui/buttons/button.tsx"
import { useEffect, useState } from "react"

export const AddHomeScreen = () => {
  const { webApp, user } = useTelegram()
  const [isAdded, setIsAdded] = useState(false)
  const handleAddHomeScreen = () => {
    webApp?.addToHomeScreen()
  }
  const platform = webApp?.platform ?? ""
  const mobile = ["android", "ios"]
  useEffect(() => {
    if (localStorage.getItem("addToHomeScreen") === "true") {
      setIsAdded(true)
      return
    }
    if (!webApp || !user) return
    webApp?.checkHomeScreenStatus((s) => {
      if (s === "added") {
        setIsAdded(true)
        localStorage.setItem("addToHomeScreen", "true")
      }
    })
  }, [webApp, user])
  if (isAdded || !mobile.includes(platform)) return
  return (
    <div className="flex flex-col gap-3 w-full shadow-shadow-block rounded-[10px] px-2 py-3 mt-2">
      <p className="text-center leading-5 font-ManropeM">
        Добавьте приложение на рабочий стол для большего удобства
      </p>
      <Button
        className="w-full h-[35px] rounded-[7px] text-white"
        onClick={handleAddHomeScreen}
        variant={"red"}
      >
        Добавить
      </Button>
    </div>
  )
}
