import { useState } from "react"
import SvgDollar from "../../assets/icons/Dollar"
import SvgNewSet from "../../assets/icons/NewSet"
import SvgProfile from "../../assets/icons/Profile"
import SvgSearch from "../../assets/icons/Search"
import SvgSlides from "../../assets/icons/Slides"
import { cn } from "../../lib/utils"

const navItems = [
  { id: "More", Icon: SvgNewSet, text: "More" },
  { id: "Subscribe", Icon: SvgDollar, text: "Subscribe" },
  { id: "Search", Icon: SvgSearch, text: "Search" },
  { id: "Slides", Icon: SvgSlides, text: "Slides" },
  { id: "Profile", Icon: SvgProfile, text: "Profile" },
]

const NavBar = ({ className }: { className: string }) => {
  const [activeId, setActiveId] = useState<string>("")

  return (
    <nav
      className={cn(
        "fixed w-full bottom-0 flex justify-between items-center h-[80px] rounded-tr-[28px] rounded-tl-[28px] px-7 bg-blur-bg",
        className
      )}
    >
      {navItems.map(({ id, Icon, text }) => (
        <div
          key={id}
          onClick={() => setActiveId(id)}
          className="flex flex-col items-center justify-between cursor-pointer h-[68px]"
        >
          <Icon className={activeId === id ? "text-blue-500" : "text-white"} />
          <p className={activeId === id ? "text-blue-500" : "text-white"}>
            {text}
          </p>
        </div>
      ))}
    </nav>
  )
}

export default NavBar
