import { useAppSelector } from "@/redux/hooks.ts"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { DeleteAccountBar } from "@/widgets/nav-bar/delete-account"

type EditModalProps = {
  onSave: () => void
  onClose: () => void
  disabled: boolean
}

export const DeleteAccountModal = ({
  onSave,
  onClose,
  disabled,
}: EditModalProps) => {
  const { isDeleteOpen } = useAppSelector((state) => state.modal)
  useEffect(() => {
    if (isDeleteOpen) {
      document.body.style.overflow = "hidden"

      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [isDeleteOpen])
  return (
    <motion.div
      transition={{
        type: "tween",
        stiffness: 300,
      }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      className="fixed flex flex-col px-2 w-full max-w-[610px] h-[70%] bg-[var(--color-bg-surface)] left-1/2 -translate-x-1/2 bottom-0 z-10 rounded-tl-[60px] rounded-tr-[60px]"
    >
      <p className="text-center text-[19px] font-HelveticaB pb-5 pt-2 text-[var(--color-text-black)]">
        Вы хотите удалить аккаунт?
      </p>
      <p className="text-left text-[17px] text-[#656565] pt-[70px]">
        Если вы удалите аккаунт вашу анкету не будут видеть пользователи и вся
        введённая вами информация сотрётся.
      </p>
      <DeleteAccountBar
        disabled={disabled}
        onApprove={() => onSave()}
        onCancel={() => onClose()}
      />
    </motion.div>
  )
}
