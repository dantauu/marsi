import NavBar from "../../widgets/nav-bar/ui"
import type { PropsWithChildren } from "react"

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
