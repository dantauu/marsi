import { DeleteAccount } from "@/features/settings/ui/delete-account"
import { ToggleSwitch } from "@/shared/ui/checkboxes/toggle"

export const Settings = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <p className="text-center">Настройки Аккаунта</p>
      <div>
        <p>Темная тема</p>
        <ToggleSwitch />
      </div>
      <div className="flex-1" />
      <DeleteAccount className="mb-40" />
    </div>
  )
}
