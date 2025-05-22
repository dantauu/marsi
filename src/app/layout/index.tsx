import type { PropsWithChildren } from "react"
import NavBar from "../../widgets/nav-bar/ui"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1>Layout Header</h1>
      {children}
      <NavBar />
    </div>
  )
}

export default Layout
