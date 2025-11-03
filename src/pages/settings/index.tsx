import { DeleteAccount } from "@/features/settings/ui/delete-account"
import { ToggleSwitch } from "@/shared/ui/checkboxes/toggle"

export const Settings = () => {
  return (
    <div className="flex flex-col min-h-screen px-[4px]">
      <p className="text-center text-[var(--color-text-black)]">
        Настройки Аккаунта
      </p>
      <div className="flex items-center justify-between shadow-easy rounded-[10px] px-2 py-2 bg-[var(--color-bg-surface)]">
        <p className="text-[var(--color-text-black)] text-[17px]">
          Темная тема
        </p>
        <ToggleSwitch />
      </div>
      <div className="flex-1" />
      <DeleteAccount className="mb-40" />
    </div>
  )
}
