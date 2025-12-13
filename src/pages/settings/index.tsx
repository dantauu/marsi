import { DeleteAccount, useDeleteAccount } from "@/features/settings"
import { ToggleSwitch } from "@/shared/ui/checkboxes/toggle"
import SvgArrowPath from "@/assets/icons/ArrowPath.tsx"
import { usePlatform } from "@/shared/lib/hooks/use-platform.ts"
import { useNavigate } from "@tanstack/react-router"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { openDeleteModal } from "@/redux/slices/modals.ts"
import { Overlay } from "@/widgets/overlay"
import { LoadingCircleBase } from "@/shared/ui/loading/circle.tsx"
import { DeleteAccountWrapper } from "@/widgets/modals/wrappers/delete-account"
import { useBlockScroll } from "@/shared/lib/hooks/use-block-scroll.ts"

export const Settings = () => {
  const { isMobile } = usePlatform()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isDeleteOpen } = useAppSelector((state) => state.modal)
  const handleModalOpen = () => {
    dispatch(openDeleteModal())
  }
  const { isLoading, handleDeleteUser } = useDeleteAccount()
  useBlockScroll()

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
        <p className="text-[var(--color-text-black)] text-[16px]">
          Темная тема
        </p>
        <ToggleSwitch />
      </div>
      <div className="flex-1" />
      {isLoading && (
        <LoadingCircleBase className="fixed top-1/2 left-1/2 -translate-x-1/2 z-20 bg-[#0004] w-[75px] h-[75px] rounded-xl" />
      )}
      <DeleteAccount onClick={handleModalOpen} className="mb-50" />
      <DeleteAccountWrapper
        handleDeleteUser={handleDeleteUser}
        isLoading={isLoading}
      />
    </div>
  )
}
