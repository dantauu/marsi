import React from "react"
import SvgPlus from "@/assets/icons/Plus.tsx"
import { useEditProfileForm } from "@/app/context/profile-edit-context.tsx"
import { useWatch } from "react-hook-form"
import { useUploadPhotoMutation } from "@/shared/api/user.ts"
import SvgCross from "@/assets/icons/Cross.tsx"
import Button from "@/shared/ui/buttons/button.tsx"
import heic2any from "heic2any"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import { getPhotoVariant } from "@/lib/utils/photo-variant"
import type { UserPhotos, UserPhotoVariants } from "@/app/types/user"

export const PhotoEdit = () => {
  const { setValue, getValues, control } = useEditProfileForm()
  const photos = useWatch({ control, name: "photo_url" })
  const deletedPhotos = useWatch({ control, name: "deleted_photos" })
  const [uploadPhoto, { isLoading }] = useUploadPhotoMutation()

  const slots = toSlots(photos)

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    let processedFile: File | Blob = file
    const ext = file.name.split(".").pop()?.toLowerCase()

    if (ext == "heic" || ext == "heif") {
      const converted = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.9,
      })

      processedFile = new File(
        [converted as BlobPart],
        file.name.replace(/\.[^/.]+$/, ".jpg"),
        {
          type: "image/jpeg",
        }
      )
    }
    const uploaded = await uploadPhoto(processedFile).unwrap()
    const newSlots = [...slots]
    newSlots[index] = uploaded
    setValue("photo_url", fromSlots(newSlots), { shouldDirty: true })
  }

  const handleRemove = (index: number) => {
    const newSlots = [...slots]
    const target = newSlots[index]

    if (index === 0) {
      // удаляем default навсегда → ""
      newSlots[0] = ""
    } else {
      // удаляем item в items[]
      if (typeof target === "string" && target.startsWith("http")) {
        setValue("deleted_photos", [...(deletedPhotos ?? []), target], {
          shouldDirty: true,
        })
      }
      newSlots[index] = null
    }

    setValue("photo_url", fromSlots(newSlots), { shouldDirty: true })
  }
  const pictureSlots = [0, 1, 2]

  return (
    <div className="flex justify-between mb-[20px] px-2">
      {pictureSlots.map((index) => {
        const slot = slots[index]
        const src = getPhotoVariant(slot, "medium")
        return (
          <div
            key={index}
            className="relative w-[95px] h-[185px] mini-mobile:w-[123px] mini-mobile:h-[218px] overflow-hidden rounded-[10px] bg-[var(--color-bg-photo-edit)]"
          >
            {src ? (
              <>
                <img className="w-full h-full object-cover" src={src} />
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
                {isLoading ? (
                  <LoadingBalls />
                ) : (
                  <SvgPlus className="text-main-pink stroke-3 w-[50px] h-[50px]" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e, index)}
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

const toSlots = (photo: UserPhotos | undefined) => {
  if (!photo) {
    return ["", null, null] as const
  }

  return [
    photo.default ?? "",
    photo.items?.[0] ?? null,
    photo.items?.[1] ?? null,
  ] as const
}

const fromSlots = (slots: (string | UserPhotoVariants | null)[]): UserPhotoVariants => {
  const [defaultSlot, item1, item2] = slots

  return {
    default: defaultSlot ?? "",
    items: [item1, item2].filter(Boolean) as UserPhotoVariants[],
  }
}
