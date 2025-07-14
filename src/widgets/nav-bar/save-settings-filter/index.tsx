import Button from "@/shared/ui/buttons/button.tsx"

const SaveSettingsFilter = ({ reset }: { reset: () => void }) => {
  return (
    <div className="flex justify-between items-center h-[93px] pb-[12px] fixed bottom-0 left-0 w-full px-[20px] rounded-tr-[28px] rounded-tl-[28px] bg-[#cecece87] z-50">
      <Button
        type="button"
        className="w-[155px] h-[55px] font-ManropeM text-[18px]"
        variant="red"
        onClick={() => reset()}
      >
        Сбросить
      </Button>
      <Button
        type="submit"
        className="w-[155px] h-[55px] font-ManropeM text-[18px]"
        variant="green"
      >
        Сохранить
      </Button>
    </div>
  )
}

export default SaveSettingsFilter
