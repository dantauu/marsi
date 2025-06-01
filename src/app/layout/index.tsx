import { NavBar } from "@/widgets/nav-bar"
import type { PropsWithChildren } from "react"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="pt-[80px]">
      {children}
      <NavBar />
    </div>
  )
}

export default Layout
