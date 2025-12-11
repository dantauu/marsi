import Button from "@/shared/ui/buttons/button.tsx"

export const DeletedPage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen">
      <div className="text-[var(--color-text-black)]">
        <p>Аккаунт удален, жаль что Вы уходите</p>
        <p>Но в любой момент вы можете вернуться :)</p>
      </div>
      <Button className="text-[var(--color-text-black)]" variant={"default"}>
        Закрыть
      </Button>
    </div>
  )
}
