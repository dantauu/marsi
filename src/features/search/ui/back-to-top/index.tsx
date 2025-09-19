import { useEffect, useState } from "react"
import SvgArrow from "@/assets/icons/Arrow.tsx"
import Button from "@/shared/ui/buttons/button.tsx"

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      } else {
        setIsVisible(false)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])
  const scrollHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  return (
    <Button
      onClick={scrollHandler}
      variant={"default"}
      className={`fixed flex justify-center items-center  bottom-30 right-[max(calc((100vw-615px)/2+1.5rem),1.5rem)] w-[48px] h-[48px] z-20 rounded-full shadow-lg bg-main-red text-white transition-all duration-300
    ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <SvgArrow className="-rotate-90 w-[18px] h-[18px]" />
    </Button>
  )
}