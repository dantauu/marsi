import { formEmptyValues } from "@/app/providers/filter-form"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FilterFormSchema } from "@/lib/schemes/filter"

const initialState: FilterFormSchema = { ...formEmptyValues }

export const filterStore = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FilterFormSchema>>) {
      return { ...state, ...action.payload }
    },
    resetFilters: () => initialState,
  },
})

export const { setFilters, resetFilters } = filterStore.actions
export default filterStore.reducer
