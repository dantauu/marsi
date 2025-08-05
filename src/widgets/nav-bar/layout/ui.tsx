import SvgDollar from "@/assets/icons/Dollar"
import SvgNewSet from "@/assets/icons/NewSet"
import SvgProfile from "@/assets/icons/Profile"
import SvgSearch from "@/assets/icons/Search"
import SvgSlides from "@/assets/icons/Slides"
import { cn } from "@/lib/utils/cn.tsx"
import { Link } from "@tanstack/react-router"
import { useKeyboardOpen } from "@/lib/hooks/use-keyboard-open.ts"

const navItems = [
  { id: "More", Icon: SvgNewSet, text: "Ещё", link: "/more" },
  { id: "Subscribe", Icon: SvgDollar, text: "Подписка", link: "/subscribe" },
  { id: "Search", Icon: SvgSearch, text: "Поиск", link: "/search" },
  { id: "Slides", Icon: SvgSlides, text: "Слайды", link: "/slides" },
  { id: "Profile", Icon: SvgProfile, text: "Профиль", link: "/profile" },
]

export const NavBar = ({ activePath = "/profile" }: { activePath: string }) => {
  const isKeyboard = useKeyboardOpen()
  return (
    <>
      {!isKeyboard && (
        <div className="fixed z-5 bottom-0 w-full rounded-tr-[28px] h-[93px] rounded-tl-[28px] bg-blur-bg">
          <nav className="flex justify-between items-center px-4 pt-[12px] mini-mobile:px-7">
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
                      "transition-all stroke-current w-[32px] h-[34px] mini-mobile:w-full mini-mobile:h-full"
                    )}
                  />
                  <p
                    className={cn(
                      isActive ? "text-main-pink" : "text-white",
                      "font-ManropeM text-[12px] mini-mobile:text-[12.5px]"
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
