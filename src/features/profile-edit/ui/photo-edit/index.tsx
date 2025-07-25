import plusIcon from "@/assets/icons-source/plus.svg"
import React from "react"
import SvgPlus from "@/assets/icons/Plus.tsx"
import { useEditProfileForm } from "@/app/providers/profile-edit-form/profile-edit-context.tsx"
import { useWatch } from "react-hook-form"
import { useUploadPhotoMutation } from "@/shared/api/user.ts"
import SvgCross from "@/assets/icons/Cross.tsx"
import Button from "@/shared/ui/buttons/button.tsx"
import heic2any from "heic2any"
import LoadingBalls from "@/shared/ui/loading"

const pictureItems = [
  { id: 1, plusIcon: plusIcon },
  { id: 2, plusIcon: plusIcon },
  { id: 3, plusIcon: plusIcon },
]

export const PhotoEdit = () => {
  const { setValue, control } = useEditProfileForm()
  const photo_url = useWatch({ control, name: "photo_url" })
  const deletedPhotos = useWatch({ control, name: "deleted_photos" })
  const [uploadPhoto, { isLoading }] = useUploadPhotoMutation()

  const handlePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      let processedFile: File | Blob = file
      const fileExt = file.name.split(".").pop()?.toLowerCase()
      if (fileExt === "heic" || fileExt === "heif") {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        })
        processedFile = new File(
          [convertedBlob as BlobPart],
          file.name.replace(/\.[^/.]+$/, ".jpg"),
          {
            type: "image/jpeg",
          }
        )
      }

      const uploadedUrls = await uploadPhoto(processedFile).unwrap()
      const updated = [...photo_url]
      updated[index] = uploadedUrls
      setValue("photo_url", updated, { shouldDirty: true })
    } catch (error) {
      console.log("error photo upload", error)
    }
  }

  const handleRemove = async (index: number) => {
    const updated = [...photo_url]
    const deleted = deletedPhotos ?? []
    const deleteToFileName = updated[index]?.split("/").pop()
    if (deleteToFileName) {
      setValue("deleted_photos", [...deleted, deleteToFileName], {
        shouldDirty: true,
      })
      updated[index] = ""
      setValue("photo_url", updated, { shouldDirty: true })
    }
  }

  return (
    <div className="flex justify-between mb-[20px] px-2">
      {pictureItems.map((item, index) => {
        const imageSrc = photo_url[index]

        return (
          <div
            key={item.id}
            className="relative w-[95px] h-[185px] mini-mobile:w-[123px] mini-mobile:h-[218px] overflow-hidden rounded-[10px] bg-[#D9D9D9]"
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
                {isLoading ? (<LoadingBalls />) : (<SvgPlus className="text-main-pink w-[50px] h-[50px]" />)}
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
