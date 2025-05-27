import { useState } from "react"
import SvgLayout1 from "../../../../assets/icons/Layout1"
import SvgLayout2 from "../../../../assets/icons/Layout2"
import Button from "../../../../shared/ui/button"
import { motion } from "framer-motion"

const LayoutSwitch = () => {
  const [active, setActive] = useState<"layout1" | "layout2">("layout1")
  const activeVariants = {
    layout1: { x: 0 },
    layout2: { x: 50 },
  }
  return (
    <div className="relative flex items-center justify-between w-[96px] h-[42px] bg-black rounded-[10px]">
      <motion.div
        animate={active}
        variants={activeVariants}
        transition={{ duration: 0.15, ease: "linear" }}
        className="absolute top-0 left-0 w-[46px] h-[42px] bg-main-green rounded-[10px] z-0"
      />
      <Button
        onClick={() => setActive("layout1")}
        className="relative z-1 w-[46px] h-[42px] transition-all duration-100 rounded-[10px]"
        variant="default"
      >
        <SvgLayout1 />
      </Button>
      <Button
        onClick={() => setActive("layout2")}
        variant="default"
        className="relative z-1 w-[46px] h-[42px] transition-all duration-100 rounded-[10px]"
      >
        <SvgLayout2 />
      </Button>
    </div>
  )
}

export default LayoutSwitch
