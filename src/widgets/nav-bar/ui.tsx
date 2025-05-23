import SvgDollar from "../../assets/icons/Dollar"
import SvgNewSet from "../../assets/icons/NewSet"
import SvgProfile from "../../assets/icons/Profile"
import SvgSearch from "../../assets/icons/Search"
import SvgSlides from "../../assets/icons/Slides"
import { cn } from "../../lib/utils"
import { Link, useRouterState } from "@tanstack/react-router"

const navItems = [
  { id: "More", Icon: SvgNewSet, text: "More", link: "/more" },
  { id: "Subscribe", Icon: SvgDollar, text: "Subscribe", link: "/subscribe" },
  { id: "Search", Icon: SvgSearch, text: "Search", link: "/search" },
  { id: "Slides", Icon: SvgSlides, text: "Slides", link: "/slides" },
  { id: "Profile", Icon: SvgProfile, text: "Profile", link: "/profile" },
]

const NavBar = ({ className }: { className: string }) => {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <nav
      className={cn(
        "fixed w-full bottom-0 flex justify-between items-center h-[80px] rounded-tr-[28px] rounded-tl-[28px] px-7 bg-blur-bg",
        className
      )}
    >
      {navItems.map(({ id, Icon, text, link }) => {
        const isActive = currentPath === link
        return (
          <Link
            key={id}
            to={link}
            className="flex flex-col items-center justify-between h-[68px] cursor-pointer"
          >
            <Icon
              className={cn(
                isActive ? "text-main-pink" : "text-white",
                "transition-all"
              )}
            />
            <p
              className={cn(
                isActive ? "text-main-pink" : "text-white",
                "font-ManropeM"
              )}
            >
              {text}
            </p>
          </Link>
        )
      })}
    </nav>
  )
}

export default NavBar
