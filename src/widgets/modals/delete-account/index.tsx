import { useAppSelector } from "@/redux/hooks.ts"
import { useEffect } from "react"
import { motion } from "framer-motion"
import SaveSettingsFilter from "@/widgets/nav-bar/save-settings-filter"

type EditModalProps = {
  onSave: () => void
  onClose: () => void
}

export const DeleteAccountModal = ({
  onSave,
  onClose,
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
      className="fixed left-0 flex flex-col px-2 w-full max-w-[610px] h-[70%] bg-[var(--color-bg-surface)] bottom-0 z-10 rounded-tl-[60px] rounded-tr-[60px]"
    >
      <p className="text-center text-[19px] font-HelveticaB pb-5 pt-2 text-[var(--color-text-black)]">
        Вы хотите удалить аккаунт?
      </p>
      <p className="text-center text-[17px] text-[#656565]">Если вы удалите аккаунт вашу анкету не будут видеть пользователи и вся введённая вами информация сотрётся.</p>
      <SaveSettingsFilter type={"button"} onClick={onClose} onHandleSubmit={onSave} cancelText={"Удалить"} approveText={"Отмена"} />
    </motion.div>
  )
}
