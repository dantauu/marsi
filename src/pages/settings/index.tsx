import { DeleteAccount } from "@/features/settings/ui/delete-account"
import { ToggleSwitch } from "@/shared/ui/checkboxes/toggle"

export const Settings = () => {
  return (
    <div className="flex flex-col min-h-screen px-[4px]">
      <p className="text-center">Настройки Аккаунта</p>
      <div className="flex items-center justify-between">
        <p>Темная тема</p>
        <ToggleSwitch />
      </div>
      <div className="flex-1" />
      <DeleteAccount className="mb-40" />
    </div>
  )
}
