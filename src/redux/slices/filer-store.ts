import { type FilterFormSchema, formEmptyValues } from "@/app/providers/filter-form"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: FilterFormSchema = { ...formEmptyValues }

export const filterStore  = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FilterFormSchema>>) {
      return { ...state, ...action.payload }
    },
    resetFilter: () => initialState
  }
})

export const { setFilters, resetFilter } = filterStore.actions
export default filterStore.reducer