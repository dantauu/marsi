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
import { useDeleteUserMutation } from "@/shared/api/user.ts"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import { LoadingCirclev2 } from "@/shared/ui/loading/circle.tsx"
import { useNotify } from "@/shared/lib/hooks/use-notify.tsx"

export const Settings = () => {
  const { isMobile } = usePlatform()
  const navigate = useNavigate()
  const { notify } = useNotify()
  const dispatch = useAppDispatch()
  const { isDeleteOpen } = useAppSelector((state) => state.modal)
  const handleModalOpen = () => {
    dispatch(openDeleteModal())
  }
  const handleCloseModal = () => {
    dispatch(closeDeleteModal())
    console.log("close")
  }
  const [deleteUser, { isLoading }] = useDeleteUserMutation()
  const { userToken } = useCurrentUser()
  const handleDeleteUser = async () => {
    if (!userToken) return
    try {
      await notify(deleteUser(userToken.userId).unwrap(), {
        success: "Аккаунт удалён",
        error: "Что-то пошло не так",
      })

      navigate({ to: "/deleted" })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div
      className={`flex flex-col min-h-screen max-w-[610px] px-[4px] ${isMobile ? "pt-[75px]" : "pt-[65px]"}`}
    >
      {isDeleteOpen && (
        <Overlay className="max-w-[610px] left-1/2 -translate-x-1/2" />
      )}
      <div
        className={`fixed pb-[4.5px] px-4 z-5 bg-[var(--color-bg-surface)] left-1/2 -translate-x-1/2 w-full max-w-[610px] top-0 flex items-center  justify-between shadow-easy ${isMobile ? "pt-[97px]" : "pt-[30px]"}`}
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
      {!isLoading && (
        <LoadingCirclev2 className="fixed top-1/2 left-1/2 -translate-x-1/2 z-20 bg-[#0004] w-[75px] h-[75px] rounded-xl" />
      )}
      <DeleteAccount onClick={handleModalOpen} className="mb-40" />
      <AnimatePresence>
        {isDeleteOpen && (
          <DeleteAccountModal
            disabled={isLoading}
            onSave={handleDeleteUser}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
