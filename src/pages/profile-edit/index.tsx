import {
  EditMainInfo,
  PictureEdit,
  EditAbout,
  Hobbies,
} from "@/features/profile-edit"

const EditProfile = () => {
  return (
    <div className="pb-[150px]">
      <PictureEdit />
      <EditMainInfo className="mb-[30px]" />
      <EditAbout />
      <Hobbies className="mt-[30px]" />
    </div>
  )
}

export default EditProfile
