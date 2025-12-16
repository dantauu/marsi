import { ToggleSwitch } from "@/shared/ui/checkboxes/toggle"
import { ToggleNotifyVolume } from "@/shared/ui/checkboxes/toggle-volume"

export const SettingsItems = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between shadow-easy rounded-[10px] px-2 py-2 bg-[var(--color-bg-surface)]">
        <p className="text-[var(--color-text-black)] text-[16px]">
          Темная тема
        </p>
        <ToggleSwitch />
      </div>
      <div className="flex items-center justify-between shadow-easy rounded-[10px] px-2 py-2 bg-[var(--color-bg-surface)]">
        <p className="text-[var(--color-text-black)] text-[16px]">
          Звук уведомления лайков
        </p>
        <ToggleNotifyVolume />
      </div>
    </div>
  )
}