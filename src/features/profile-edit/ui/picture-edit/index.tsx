import { useTelegram } from "@/app/providers/telegram"
import plusIcon from "@/assets/icons-source/plus.svg"
import mockHuman from "@/assets/images/men-two.png"
import React, { useState } from "react"

const pictureItems = [
  { id: 1, plusIcon: plusIcon },
  { id: 2, plusIcon: plusIcon, mock: mockHuman },
  { id: 3, plusIcon: plusIcon },
]

export const PictureEdit = () => {
  const { user } = useTelegram()
  const [preview, setPreview] = useState<(string | null)[]>([null, null, null])
  const handlePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      const updated = [...preview]
      updated[index] = url
      setPreview(updated)
    }
  }
  return (
    <div className="flex justify-between">
      {pictureItems.map((item, index) => {
        const imageSrc = preview[index] || item.mock || user?.photo_url

        return (
          <div
            key={item.id}
            className="relative w-[123px] h-[218px] overflow-hidden rounded-[10px] bg-[#D9D9D9]"
          >
            <img className="w-full h-full object-cover" src={imageSrc} />
            {!imageSrc && (
              <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                <img src={plusIcon} alt="add" />
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
