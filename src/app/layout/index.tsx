import NavBar from "../../widgets/nav-bar/ui"
import type { PropsWithChildren } from "react"
import { Header } from "../components/Header"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1>Layout Header</h1>
      <Header />
      {children}
      <NavBar />
    </div>
  )
}

export default Layout
