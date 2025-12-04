import { useEditProfileForm } from "@/app/context/profile-edit-context.tsx"
import { useWatch } from "react-hook-form"
import { useUploadPhotoMutation } from "@/shared/api/user.ts"
import { getPhotoVariant } from "@/lib/utils/photo-variant"
import SvgCross from "@/assets/icons/Cross.tsx"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import SvgPlus from "@/assets/icons/Plus.tsx"
import heic2any from "heic2any"
import { useEffect, useRef } from "react"
import { createSwapy } from "swapy"

export const PhotoEdit = () => {
  const { setValue, control } = useEditProfileForm()
  const photos = useWatch({ control, name: "photo_url.items" }) ?? []
  const deletedPhotos = useWatch({ control, name: "deleted_photos" })
  const [uploadPhoto, { isLoading }] = useUploadPhotoMutation()

  const swapy = useRef(null)
  const container = useRef(null)

  // On mounted
  useEffect(() => {
    // If container element is loaded
    if (container.current) {
      swapy.current = createSwapy(container.current)

      // Your event listeners
      swapy.current.onSwap((event) => {
        console.log("swap", event)
      })
    }

    return () => {
      // Destroy the swapy instance on component destroy
      swapy.current?.destroy()
    }
  }, [])

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0]
    console.log("file:", file)
    if (!file) return

    const processed = await processFileMaybeHeic(file)
    const uploaded = await uploadPhoto(processed).unwrap()

    const newItems = [...photos]
    newItems[index] = uploaded

    setValue("photo_url.items", newItems, { shouldDirty: true })
  }

  const handleRemove = (index: number) => {
    const newItems = [...photos]

    const target = newItems[index]
    if (target && typeof target === "object") {
      setValue("deleted_photos", [...(deletedPhotos ?? []), target.large], {
        shouldDirty: true,
      })
    }
    newItems.splice(index, 1)
    setValue("photo_url.items", newItems, { shouldDirty: true })
  }

  return (
    <div ref={container} className="flex justify-between mb-[20px] px-2">
      {[0, 1, 2].map((index) => {
        console.log("index:", index)
        const item = photos[index] ?? null
        const src = getPhotoVariant(item, "small")

        return (
          <div
            data-swapy-slot={index}
            key={index}
            className="relative w-[95px] h-[185px] rounded-[10px] bg-[var(--color-bg-photo-edit)]"
          >
            <div data-swapy-item={index} className="w-full h-full">
              {src ? (
                <>
                  <img
                    className="w-full h-full object-cover rounded-[10px]"
                    src={src}
                  />
                  <button
                    onClick={() => handleRemove(index)}
                    type="button"
                    className="absolute top-1 right-1 rounded-full p-1"
                  >
                    <SvgCross className="text-white w-[40px] h-[40px]" />
                  </button>
                </>
              ) : (
                <label className="flex items-center justify-center w-full h-full cursor-pointer">
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
          </div>
        )
      })}
    </div>
  )
}

async function processFileMaybeHeic(file: File): Promise<File | Blob> {
  const ext = file.name.split(".").pop()?.toLowerCase()

  if (ext === "heic" || ext === "heif") {
    const converted = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.9,
    })
    return new File(
      [converted as BlobPart],
      file.name.replace(/\.[^/.]+$/, ".jpg"),
      {
        type: "image/jpeg",
      }
    )
  }

  return file
}
