import { useEditProfileForm } from "@/app/context/profile-edit-context.tsx"
import { useWatch } from "react-hook-form"
import { useUploadPhotoMutation } from "@/shared/api/user.ts"
import { getPhotoVariant } from "@/lib/utils/photo-variant"
import SvgCross from "@/assets/icons/Cross.tsx"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import SvgPlus from "@/assets/icons/Plus.tsx"
import heic2any from "heic2any"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export const PhotoEdit = () => {
  const { setValue, control } = useEditProfileForm()
  const photos = useWatch({ control, name: "photo_url.items" }) ?? []
  const deletedPhotos = useWatch({ control, name: "deleted_photos" })
  const [uploadPhoto, { isLoading }] = useUploadPhotoMutation()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10, delay: 150 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = photos.findIndex(p => p.large === active.id)
    const newIndex = photos.findIndex(p => p.large === over.id)

    const newPhotos = arrayMove(photos, oldIndex, newIndex)
    setValue("photo_url.items", newPhotos, { shouldDirty: true })
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
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
    if (target) {
      setValue("deleted_photos", [...(deletedPhotos ?? []), target.large], { shouldDirty: true })
    }
    newItems.splice(index, 1)
    setValue("photo_url.items", newItems, { shouldDirty: true })
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={photos.map(p => p.large)} strategy={horizontalListSortingStrategy}>
        <div className="flex justify-between mb-[20px] px-2">
          {photos.map((item, index) => (
            <SortablePhoto
              key={item.large}
              photo={item}
              index={index}
              onUpload={handleUpload}
              onRemove={handleRemove}
              isLoading={isLoading}
            />
          ))}
          {Array.from({ length: 3 - photos.length }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="relative w-[95px] h-[185px] rounded-[10px] bg-[var(--color-bg-photo-edit)] flex items-center justify-center"
            >
              <label className="flex items-center justify-center w-full h-full cursor-pointer">
                {isLoading ? <LoadingBalls /> : <SvgPlus className="text-main-pink stroke-3 w-[50px] h-[50px]" />}
                <input type="file" accept="image/*" onChange={(e) => handleUpload(e, photos.length + idx)} className="hidden" />
              </label>
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>

  )
}

const SortablePhoto = ({ photo, index, onUpload, onRemove, isLoading }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: photo.large })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  const src = getPhotoVariant(photo, "small")

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-[95px] h-[185px] rounded-[10px] bg-[var(--color-bg-photo-edit)]"
    >
      {src ? (
        <>
          <img className="w-full h-full object-cover rounded-[10px]" src={src} />
          <button
            onClick={() => onRemove(index)}
            type="button"
            className="absolute top-1 right-1 rounded-full p-1"
          >
            <SvgCross className="text-white w-[40px] h-[40px]" />
          </button>
        </>
      ) : (
        <label className="flex items-center justify-center w-full h-full cursor-pointer">
          {isLoading ? <LoadingBalls /> : <SvgPlus className="text-main-pink stroke-3 w-[50px] h-[50px]" />}
          <input type="file" accept="image/*" onChange={(e) => onUpload(e, index)} className="hidden" />
        </label>
      )}
    </div>
  )
}

async function processFileMaybeHeic(file: File): Promise<File | Blob> {
  const ext = file.name.split(".").pop()?.toLowerCase()
  if (ext === "heic" || ext === "heif") {
    const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 })
    return new File([converted as BlobPart], file.name.replace(/\.[^/.]+$/, ".jpg"), { type: "image/jpeg" })
  }
  return file
}
