import { PictureEdit, EditAbout, Hobbies } from "@/features/profile-edit"
import { ProfileEditForm } from "@/shared/lib/profile-edit-form"

const EditProfile = () => {
  return (
    <div data-testid="profile-edit" className="pb-[150px]">
      <PictureEdit />
      <ProfileEditForm />
      <EditAbout />
      <Hobbies className="mt-[30px]" />
    </div>
  )
}

export default EditProfile
