import { EditMainInfo, PictureEdit, EditAbout } from "@/features/profile-edit"

const EditProfile = () => {
  return (
    <div className="pb-[150px]">
      <PictureEdit />
      <EditMainInfo className="mb-[20px]" />
      <EditAbout />
    </div>
  )
}

export default EditProfile
