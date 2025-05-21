import type { PropsWithChildren } from "react"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1>Layout Header</h1>
      {children}
      <h1>Layout Footer</h1>
    </div>
  )
}

export default Layout
