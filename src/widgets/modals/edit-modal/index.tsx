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
      className="fixed flex flex-col px-2 w-full max-w-[610px] h-[70%] bg-[var(--color-bg-surface)] bottom-0 z-10 rounded-tl-[60px] rounded-tr-[60px]"
    >
      <h3 className="text-center text-[23px] font-HelveticaB pb-5 pt-2 text-[var(--color-text-black)]">
        {title}
      </h3>
      <div className="overflow-y-auto">{children}</div>
      <div className=" flex flex-col gap-5 mt-3 mb-10">
        <Button
          className="w-full h-[40px]"
          variant="green"
          type="button"
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
    </motion.div>
  )
}
