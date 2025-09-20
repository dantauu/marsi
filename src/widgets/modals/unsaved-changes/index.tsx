import Button from "@/shared/ui/buttons/button.tsx"

type UnsavedChangesModalProps = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  confirmLeave: () => void
}

export const UnsavedChangesModal = ({
  showModal,
  setShowModal,
  confirmLeave,
}: UnsavedChangesModalProps) => {
  if (!showModal) return null
  return (
    <div className="fixed max-w-[610px] z-10 bg-white top-0 flex flex-col justify-center items-center gap-5 w-full h-full">
      <div className="flex flex-col items-center">
        <p className="font-ManropeM text-[17px]">Внимание!</p>
        <p className="font-ManropeM text-[17px]">Вы не сохранили изменения.</p>
      </div>
      <div className="flex gap-5">
        <Button
          className="w-[112px] h-[32px] text-[18px]"
          variant="red"
          type="button"
          onClick={confirmLeave}
        >
          Уйти
        </Button>
        <Button
          className="w-[112px] h-[32px] text-[18px]"
          variant="green"
          type="button"
          onClick={() => setShowModal(false)}
        >
          Остаться
        </Button>
      </div>
    </div>
  )
}
