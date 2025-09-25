import SvgNewSet from "@/assets/icons/NewSet"
import SvgProfile from "@/assets/icons/Profile"
import SvgSearch from "@/assets/icons/Search"
import SvgSlides from "@/assets/icons/Slides"
import { cn } from "@/lib/utils/cn.tsx"
import { Link, useRouterState } from "@tanstack/react-router"
import SvgHeartNav from "@/assets/icons/HeartNav.tsx"

const navItems = [
  { id: "More", Icon: SvgNewSet, text: "Ещё", link: "/more" },
  // { id: "Subscribe", Icon: SvgDollar, text: "Подписка", link: "/subscribe" },
  { id: "Likes", Icon: SvgHeartNav, text: "Лайки", link: "/likes" },
  { id: "Search", Icon: SvgSearch, text: "Поиск", link: "/search" },
  { id: "Slides", Icon: SvgSlides, text: "Слайды", link: "/slides" },
  { id: "Profile", Icon: SvgProfile, text: "Профиль", link: "/profile" },
]

export const NavBar = ({ activePath = "/profile" }: { activePath: string }) => {
  const { location } = useRouterState()
  const path = location.pathname
  if (path.startsWith("/profile-edit")) return
  return (
    <div className="flex justify-center">
      <div className="fixed flex items-center justify-between z-5 bottom-0 w-[95%] max-w-[610px] rounded-[28px] h-[85px] bg-[#252323f7] mb-5">
        <nav className="flex justify-between w-full px-4 mini-mobile:px-7">
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
                    "transition-all stroke-current w-[30px] h-[34px] mini-mobile:w-[35px] mini-mobile:h-[38px]"
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
    </div>
  )
}
