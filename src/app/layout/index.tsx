import { NavBar } from "../../widgets/nav-bar/ui"
import type { PropsWithChildren } from "react"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      {children}
      <NavBar />
    </div>
  )
}

export default Layout
