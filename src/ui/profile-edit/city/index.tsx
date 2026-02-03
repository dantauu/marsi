import { useState } from "react"
import { useDebounce } from "@/lib/hooks/use-debounce.ts"
import { useGetLocationsQuery } from "@/redux/api/locations.ts"
import type { Locations } from "@/app/types/global.ts"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"

export const CityEdit = ({
  value,
  onChange,
}: {
  value: string | string[] | number | undefined | null
  onChange: (v: string) => void
}) => {
  const [inputValue, setInputValue] = useState(
    typeof value === "string" ? value : ""
  )
  const debouncedSearch = useDebounce(inputValue, 700)
  const {
    data: locations,
    isLoading,
    isFetching,
  } = useGetLocationsQuery({
    search: debouncedSearch,
    limit: 10,
  })

  const handleSelect = (location: Locations) => {
    onChange(location.name)
    setInputValue(location.name)
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Выберите местоположение"
        value={inputValue}
        onChange={(e) => {
          const raw = e.target.value
          const capitalized = raw.charAt(0).toUpperCase() + raw.slice(1)
          setInputValue(capitalized)
        }}
        className="border p-2 rounded-xl w-full text-[var(--color-text-black)] placeholder:text-[var(--color-text-black)]"
      />

      <div className="pt-7 flex flex-col gap-4">
        {isLoading || isFetching ? (
          <LoadingBalls className="mb-5" />
        ) : locations && locations.length > 0 ? (
          <>
            {locations?.map((item) => (
              <p
                className="font-ManropeM text-[var(--color-text-black)] cursor-pointer"
                onClick={() => handleSelect(item)}
                key={item.id}
              >
                {item.name}, {item.region}
              </p>
            ))}
          </>
        ) : (
          <p className="text-[20px] text-center text-[var(--color-text-black)]">
            Ничего не найдено
          </p>
        )}
      </div>
    </div>
  )
}
