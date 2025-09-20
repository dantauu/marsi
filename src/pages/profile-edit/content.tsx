import { SaveNavBar } from "@/widgets/nav-bar/save-edit-profile"
import { EditMainInfo, PhotoEdit } from "@/features/profile-edit"
import { useAppSelector } from "@/redux/hooks.ts"
import { Overlay } from "@/widgets/overlay"
import { useUnsavedChanges } from "@/lib/hooks/use-unsaved-changes.ts"
import { useEditProfileForm } from "@/app/context/profile-edit-context.tsx"
import { UnsavedChangesModal } from "@/widgets/modals/unsaved-changes"
import { ButtonBack } from "@/shared/ui/buttons/button-back"
import { usePlatform } from "@/shared/lib/hooks/use-platform.ts"

export const EditProfileContent = () => {
  const { isDirty } = useEditProfileForm()
  const { isMobile } = usePlatform()
  const { showModal, setShowModal, confirmLeave, navigate } =
    useUnsavedChanges(isDirty)
  const { isEditOpen } = useAppSelector((state) => state.modal)
  return (
    <>
      {isEditOpen && <Overlay className="max-w-[610px]" />}
      <div
        data-testid="profile-edit"
        className={`pb-[120px] ${isMobile ? "pt-[120px]" : "pt-[160px]"}`}
      >
        <SaveNavBar className="pt-[80px]" />
        <ButtonBack onClick={() => navigate("/profile")} />
        <PhotoEdit />
        <EditMainInfo className="mt-10" />
      </div>

      <UnsavedChangesModal
        showModal={showModal}
        setShowModal={setShowModal}
        confirmLeave={confirmLeave}
      />
    </>
  )
}
