import { DeleteAccount } from "@/features/settings/ui/delete-account"
import { ToggleSwitch } from "@/shared/ui/checkboxes/toggle"
import SvgArrowPath from "@/assets/icons/ArrowPath.tsx"
import { usePlatform } from "@/shared/lib/hooks/use-platform.ts"
import { useNavigate } from "@tanstack/react-router"
import { DeleteAccountModal } from "@/widgets/modals/delete-account"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import {
  closeDeleteModal,
  openDeleteModal,
} from "@/redux/slices/modal-slice.ts"
import { Overlay } from "@/widgets/overlay"
import { AnimatePresence } from "framer-motion"

export const Settings = () => {
  const { isMobile } = usePlatform()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isDeleteOpen } = useAppSelector((state) => state.modal)
  const handleModalOpen = () => {
    dispatch(openDeleteModal())
  }
  const handleCloseModal = () => {
    dispatch(closeDeleteModal())
  }
  return (
    <div
      className={`flex flex-col min-h-screen px-[4px] ${isMobile ? "pt-[75px]" : "pt-[65px]"}`}
    >
      {isDeleteOpen && <Overlay className="max-w-[610px] left-0" />}
      <div
        className={`fixed pb-[4.5px] px-4 z-5 bg-[var(--color-bg-surface)] w-full max-w-[610px] top-0 flex items-center  justify-between shadow-easy ${isMobile ? "pt-[97px]" : "pt-[30px]"}`}
      >
        <SvgArrowPath
          className="w-[15px] h-[27px] text-[var(--color-text-black)]"
          onClick={() => navigate({ to: "/profile" })}
        />
        <p className="text-center text-[17.5px] mx-auto text-[var(--color-text-black)]">
          Настройки
        </p>
      </div>
      <div className="flex items-center justify-between shadow-easy rounded-[10px] px-2 py-2 bg-[var(--color-bg-surface)]">
        <p className="text-[var(--color-text-black)] text-[17px]">
          Темная тема
        </p>
        <ToggleSwitch />
      </div>
      <div className="flex-1" />
      <DeleteAccount onClick={handleModalOpen} className="mb-55" />
      <AnimatePresence>
        {isDeleteOpen && (
          <DeleteAccountModal onSave={() => {}} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  )
}
