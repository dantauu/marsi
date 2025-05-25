import SvgDollar from "../../assets/icons/Dollar"
import SvgNewSet from "../../assets/icons/NewSet"
import SvgProfile from "../../assets/icons/Profile"
import SvgSearch from "../../assets/icons/Search"
import SvgSlides from "../../assets/icons/Slides"
import { cn } from "../../lib/utils"
import { Link, useRouterState } from "@tanstack/react-router"

// Оставляем только существующие роуты
const navItems = [
  { id: "More", Icon: SvgNewSet, text: "More", link: "/more" },
  { id: "Subscribe", Icon: SvgDollar, text: "Subscribe", link: "/subscribe" },
  { id: "Search", Icon: SvgSearch, text: "Search", link: "/search" },
  { id: "Slides", Icon: SvgSlides, text: "Slides", link: "/slides" },
  { id: "Profile", Icon: SvgProfile, text: "Profile", link: "/profile" },
]

const NavBar = () => {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  // Если текущий путь не соответствует ни одному из navItems, считаем активным Profile
  const isValidPath = navItems.some((item) => item.link === currentPath)
  const activePath = isValidPath ? currentPath : "/profile"

  return (
    <div className="fixed bottom-0 w-full rounded-tr-[28px] h-[89px] rounded-tl-[28px] bg-blur-bg">
      <nav className="flex justify-between items-center px-7 pt-[10px]">
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
  )
}

export default NavBar
