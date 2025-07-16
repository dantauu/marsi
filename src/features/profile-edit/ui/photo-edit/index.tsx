import plusIcon from "@/assets/icons-source/plus.svg"
import React from "react"
import SvgPlus from "@/assets/icons/Plus.tsx"
import { useEditProfileForm } from "@/app/providers/profile-edit-form/profile-edit-context.tsx"
import { useWatch } from "react-hook-form"
import {
  useDeletePhotoMutation,
  useUploadPhotoMutation,
} from "@/shared/api/user.ts"
import SvgCross from "@/assets/icons/Cross.tsx"
import Button from "@/shared/ui/buttons/button.tsx"

const pictureItems = [
  { id: 1, plusIcon: plusIcon },
  { id: 2, plusIcon: plusIcon },
  { id: 3, plusIcon: plusIcon },
]

export const PhotoEdit = () => {
  const { setValue, control } = useEditProfileForm()
  const photo_url = useWatch({ control, name: "photo_url" })
  const [uploadPhoto] = useUploadPhotoMutation()
  const [deletePhoto] = useDeletePhotoMutation()

  const handlePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files
    if (!file?.length) return

    try {
      const uploadedUrls = await uploadPhoto(file[0]).unwrap()
      const updated = [...photo_url]
      updated[index] = uploadedUrls
      setValue("photo_url", updated, { shouldDirty: true })
    } catch (error) {
      console.log("error photo upload", error)
    }
  }

  const handleRemove = async (index: number) => {
    const updated = [...photo_url]
    const deleteToFileName = updated[index]?.split("/").pop()
    if (deleteToFileName) {
      try {
        await deletePhoto(deleteToFileName).unwrap()
      } catch (err) {
        console.log("Ошибка удаления", err)
      }
    }
    updated[index] = ""
    setValue("photo_url", updated, { shouldDirty: true })
  }

  return (
    <div className="flex justify-between mb-[20px] px-2">
      {pictureItems.map((item, index) => {
        const imageSrc = photo_url[index]

        return (
          <div
            key={item.id}
            className="relative w-[123px] h-[218px] overflow-hidden rounded-[10px] bg-[#D9D9D9]"
          >
            {imageSrc ? (
              <>
                <img className="w-full h-full object-cover" src={imageSrc} />
                <Button
                  onClick={() => handleRemove(index)}
                  type="button"
                  variant="default"
                  className="absolute top-1 right-1 rounded-full p-1"
                >
                  <SvgCross className="text-white w-[40px] h-[40px]" />
                </Button>
              </>
            ) : (
              <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                <SvgPlus className="text-main-pink" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePictureChange(e, index)}
                  className="hidden"
                />
              </label>
            )}
          </div>
        )
      })}
    </div>
  )
}
