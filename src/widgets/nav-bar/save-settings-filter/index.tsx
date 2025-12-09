import Button from "@/shared/ui/buttons/button.tsx"

type SaveSettingsFilter = {
  onClick?: () => void,
  onHandleSubmit?: () => void,
  type?: "submit" | "reset" | "button"
  cancelText: string
  approveText: string
}

//TODO create to component for DeleteAccountModal
const SaveSettingsFilter = ({ onClick, onHandleSubmit, type, approveText, cancelText}: SaveSettingsFilter) => {
  return (
    <div className="flex justify-between items-center h-[93px] pb-[12px] fixed bottom-0 left-0 w-full px-[20px] rounded-tr-[28px] rounded-tl-[28px] bg-[var(--color-bg-nav-filters)] z-50">
      <Button
        type="button"
        className="w-[140px] h-[50px] mini-mobile:w-[155px] mini-mobile:h-[55px] mini-mobile:text-[18px] font-ManropeM text-[16px]"
        variant="red"
        onClick={() => onClick}
      >
        {cancelText}
      </Button>
      <Button
        type={type}
        className="w-[140px] h-[50px] mini-mobile:w-[155px] mini-mobile:h-[55px] mini-mobile:text-[18px] font-ManropeM text-[16px]"
        variant="green"
        onClick={() => onHandleSubmit}
      >
        {approveText}
      </Button>
    </div>
  )
}

export default SaveSettingsFilter
