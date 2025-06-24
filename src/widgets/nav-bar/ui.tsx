import SvgDollar from "@/assets/icons/Dollar"
import SvgNewSet from "@/assets/icons/NewSet"
import SvgProfile from "@/assets/icons/Profile"
import SvgSearch from "@/assets/icons/Search"
import SvgSlides from "@/assets/icons/Slides"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"

const navItems = [
  { id: "More", Icon: SvgNewSet, text: "More", link: "/more" },
  { id: "Subscribe", Icon: SvgDollar, text: "Subscribe", link: "/subscribe" },
  { id: "Search", Icon: SvgSearch, text: "Search", link: "/search" },
  { id: "Slides", Icon: SvgSlides, text: "Slides", link: "/slides" },
  { id: "Profile", Icon: SvgProfile, text: "Profile", link: "/profile" },
]

export const NavBar = ({ activePath = "/profile" }: { activePath: string }) => {
  const [isKeyboard, setIsKeyboard] = useState(false)
  useEffect(() => {
    const onResize = () => {
      const height = window.visualViewport?.height || window.innerHeight
      const isOpen = height < window.innerHeight - 120
      setIsKeyboard(isOpen)
    }

    window.visualViewport?.addEventListener("resize", onResize)
    return () => window.visualViewport?.removeEventListener("resize", onResize)
  }, [])

  return (
    <>
      {!isKeyboard && (
        <div className={cn(`fixed bottom-0 w-full rounded-tr-[28px] h-[93px] rounded-tl-[28px] bg-blur-bg ${isKeyboard ? "hidden" : "fixed"}`)}>
          <nav className="flex justify-between items-center px-7 pt-[12px]">
            {navItems.map(({ id, Icon, text, link }) => {
              const isActive = activePath === link
              return (
                <Link
                  key={id}
                  to={link}
                  className="flex flex-col items-center justify-between h-[58px] cursor-pointer"
                >
                  <Icon
                    className={cn(
                      isActive ? "text-main-pink" : "text-white",
                      "transition-all w-full stroke-current"
                    )}
                  />
                  <p
                    className={cn(
                      isActive ? "text-main-pink" : "text-white",
                      "font-ManropeM text-[12.5px]"
                    )}
                  >
                    {text}
                  </p>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
      </>
  )
}
