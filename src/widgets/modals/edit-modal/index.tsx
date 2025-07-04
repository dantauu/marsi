import Button from "@/shared/ui/buttons/button.tsx"
import { useAppSelector } from "@/redux/hooks.ts"
import { useEffect } from "react"
import { motion } from "framer-motion"

type EditModalProps = {
  title: string
  children: React.ReactNode
  onSave: () => void
  onClose: () => void
}

export const EditModal = ({
  title,
  children,
  onSave,
  onClose,
}: EditModalProps) => {
  const { isEditOpen } = useAppSelector((state) => state.modal)
  useEffect(() => {
    if (isEditOpen) {
      document.body.style.overflow = "hidden"

      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [isEditOpen])
  return (
    <motion.div
      transition={{
        type: "tween",
        stiffness: 300,
      }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      className="absolute w-full h-full inset-0 bg-[#00000087]"
    >
      <div className="absolute px-2 w-full h-[60%] bg-white bottom-0 z-10">
        <h3 className="text-center text-[21px] font-HelveticaB">{title}</h3>
        <div>{children}</div>
        <div className="flex flex-col gap-5">
          <Button
            className="w-full h-[40px]"
            variant="green"
            type="submit"
            onClick={onSave}
          >
            Сохранить
          </Button>
          <Button
            className="w-full h-[40px]"
            type="button"
            variant="red"
            onClick={onClose}
          >
            Отмена
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
