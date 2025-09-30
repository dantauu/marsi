import { SaveNavBar } from "@/widgets/nav-bar/save-edit-profile"
import { EditMainInfo, PhotoEdit } from "@/features/profile-edit"
import { useAppSelector } from "@/redux/hooks.ts"
import { Overlay } from "@/widgets/overlay"
import { useUnsavedChanges } from "@/lib/hooks/use-unsaved-changes.ts"
import { useEditProfileForm } from "@/app/context/profile-edit-context.tsx"
import { UnsavedChangesModal } from "@/widgets/modals/unsaved-changes"
import { usePlatform } from "@/shared/lib/hooks/use-platform.ts"
import SvgArrowPath from "@/assets/icons/ArrowPath.tsx"

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
        className={`pb-[130px] ${isMobile ? "pt-[65px]" : "pt-[50px]"}`}
      >
        <div
          className={`fixed pb-[4.5px] px-4 z-5 bg-white w-full max-w-[610px] top-0 flex items-center  justify-between ${isMobile ? "pt-[97px]" : "pt-[30px]"}`}
        >
          <SvgArrowPath
            className="w-[17px] h-[29px]"
            onClick={() => navigate("/profile")}
          />
          <p className="text-center text-[17.5px] mx-auto">Редактирование</p>
        </div>
        <SaveNavBar className="fixed max-w-[610px] bottom-4" />
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
