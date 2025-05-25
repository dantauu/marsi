import NavBar from "../../widgets/nav-bar/ui"
import type { PropsWithChildren } from "react"
import { CustomHeader } from "../components/CustomHeader"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1>Layout Header</h1>
      <CustomHeader title="Marsi" />
      {children}
      <NavBar />
    </div>
  )
}

export default Layout
