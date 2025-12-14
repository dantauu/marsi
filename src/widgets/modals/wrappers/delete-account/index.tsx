import { AnimatePresence } from "framer-motion"
import { DeleteAccountModal } from "@/widgets/modals/delete-account"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { closeDeleteModal } from "@/redux/slices/modals.ts"

type DeleteAccountWrapperProps = {
  isLoading: boolean
  handleDeleteUser: () => void
}

export const DeleteAccountWrapper = ({
  isLoading,
  handleDeleteUser,
}: DeleteAccountWrapperProps) => {
  const dispatch = useAppDispatch()
  const { isDeleteOpen } = useAppSelector((state) => state.modal)
  const handleCloseModal = () => {
    dispatch(closeDeleteModal())
  }
  return (
    <AnimatePresence>
      {isDeleteOpen && (
        <DeleteAccountModal
          disabled={isLoading}
          onAccept={handleDeleteUser}
          onCancel={handleCloseModal}
        />
      )}
    </AnimatePresence>
  )
}
