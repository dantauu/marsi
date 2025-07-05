import { useTelegram } from "@/app/providers/telegram"
import plusIcon from "@/assets/icons-source/plus.svg"
import React from "react"
import SvgPlus from "@/assets/icons/Plus.tsx"
import { useEditProfileForm } from "@/app/providers/profile-edit-form/profile-edit-context.tsx"
import { useWatch } from "react-hook-form"

const pictureItems = [
  { id: 1, plusIcon: plusIcon },
  { id: 2, plusIcon: plusIcon },
  { id: 3, plusIcon: plusIcon },
]

export const PictureEdit = () => {
  const { user } = useTelegram()
  const { setValue, control } = useEditProfileForm()
  const photo_url = useWatch({ control, name: "photo_url" })
  const handlePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      const updated = [...photo_url]
      updated[index] = url
      setValue("photo_url", updated, { shouldDirty: true })
    }
  }

  let userHavePhoto = false
  return (
    <div className="flex justify-between mb-[20px] px-2">
      {pictureItems.map((item, index) => {
        let imageSrc = photo_url[index]

        if (!imageSrc && user?.photo_url && !userHavePhoto) {
          imageSrc = user?.photo_url
          userHavePhoto = true
        }

        return (
          <div
            key={item.id}
            className="relative w-[123px] h-[218px] overflow-hidden rounded-[10px] bg-[#D9D9D9]"
          >
            <img className="w-full h-full object-cover" src={imageSrc} />
            {!imageSrc && (
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
