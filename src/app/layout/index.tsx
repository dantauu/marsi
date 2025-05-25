import NavBar from "../../widgets/nav-bar/ui"
import type { PropsWithChildren } from "react"
import { AppControls } from "../components/AppControls"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1>Layout Header</h1>
      <AppControls />
      {children}
      <NavBar />
    </div>
  )
}

export default Layout
