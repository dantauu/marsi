import Button from "@/shared/ui/buttons/button.tsx"

export const UnsavedChangesModal = ({ showModal, setShowModal, confirmLeave }) => {
  if (!showModal) return null
  return (
    <div className="fixed bg-white top-0 flex justify-center items-center h-full">
      <p>Внимание! Вы не сохранили изменения.</p>
      <Button variant="default" type="button" onClick={confirmLeave}>Уйти</Button>
      <Button variant="default" type="button" onClick={() => setShowModal(false)}>Остаться</Button>
    </div>
  )
}
