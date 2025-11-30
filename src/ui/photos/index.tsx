import type { User } from "@/app/types/user"
type HavePhotoProps = {
  colors: string
  percent: number
  currentUser: User | null
}
type DoesntHavePhotoProps = Omit<HavePhotoProps, "currentUser">

export const HavePhoto = ({ colors, percent, currentUser }: HavePhotoProps) => {
  const getAvatar = () => {
    if (!currentUser?.photo_url) return ""
    if (!currentUser?.photo_url?.default && currentUser?.photo_url?.items[0].small) {
      return currentUser?.photo_url?.items[0].small
    } else {
      return currentUser?.photo_url?.default
    }
  }
  return (
    <div className="relative w-[87px] h-[87px] mini-mobile:w-[93px] mini-mobile:h-[93px]">
      <img
        className="w-[70px] h-[70px] absolute inset-[10%] mini-mobile:inset-[9%] rounded-full object-cover mini-mobile:w-[76px] mini-mobile:h-[76px]"
        src={getAvatar()}
        alt=""
      />
      <svg
        className="absolute top-0 left-0 w-full h-full rotate-[-90deg]"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="#e0e0e0"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke={colors}
          strokeWidth="4"
          strokeDasharray={Math.PI * 2 * 46}
          strokeDashoffset={Math.PI * 2 * 46 * (1 - percent / 100)}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

export const DoesntHavePhoto = ({ colors, percent }: DoesntHavePhotoProps) => {
  return (
    <div className="relative w-[80px] h-[80px] mini-mobile:w-[86px] mini-mobile:h-[86px]">
      <div className="absolute inset-[8%] bg-[#e0e0e0] rounded-full" />
      <svg
        className="absolute top-0 left-0 w-full h-full rotate-[-90deg]"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="#e0e0e0"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke={colors}
          strokeWidth="4"
          strokeDasharray={Math.PI * 2 * 46}
          strokeDashoffset={Math.PI * 2 * 46 * (1 - percent / 100)}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}
