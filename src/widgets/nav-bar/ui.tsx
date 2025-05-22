import SvgDollar from "../../assets/icons/Dollar"
import SvgNewSet from "../../assets/icons/NewSet"
import SvgProfile from "../../assets/icons/Profile"
import SvgSearch from "../../assets/icons/Search"
import SvgSlides from "../../assets/icons/Slides"

const NavBar = () => {
  return (
    <div className="flex">
      <SvgNewSet />
      <SvgDollar />
      <SvgSearch />
      <SvgSlides />
      <SvgProfile />
    </div>
  )
}

export default NavBar
