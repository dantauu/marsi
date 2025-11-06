import Button from "@/shared/ui/buttons/button.tsx"

const SaveSettingsFilter = ({ reset }: { reset: () => void }) => {
  return (
    <div className="flex justify-between items-center h-[93px] pb-[12px] fixed bottom-0 left-0 w-full px-[20px] rounded-tr-[28px] rounded-tl-[28px] bg-[var(--color-bg-nav-filters)] z-50">
      <Button
        type="button"
        className="w-[140px] h-[50px] mini-mobile:w-[155px] mini-mobile:h-[55px] mini-mobile:text-[18px] font-ManropeM text-[16px]"
        variant="red"
        onClick={() => reset()}
      >
        Сбросить
      </Button>
      <Button
        type="submit"
        className="w-[140px] h-[50px] mini-mobile:w-[155px] mini-mobile:h-[55px] mini-mobile:text-[18px] font-ManropeM text-[16px]"
        variant="green"
      >
        Сохранить
      </Button>
    </div>
  )
}

export default SaveSettingsFilter
