import { FunctionComponent, ComponentChildren } from "preact"
import Header from "./header"

const Layout: FunctionComponent<{
  freeze: boolean
  children: ComponentChildren
}> = ({ freeze, children }) => {
  return (
    <div
      className={
        freeze
          ? "mx-auto w-full max-w-[600px] h-screen flex flex-col text-textLight bg-primary overflow-hidden"
          : "mx-auto w-full max-w-[600px] h-screen flex flex-col text-textLight bg-primary overflow-auto"
      }
    >
      <div className="flex-1 flex flex-col select-none relative">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout
