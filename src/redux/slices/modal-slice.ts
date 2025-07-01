import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isFilterOpen: false,
  isLocationsOpen: false,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openFilterModal(state) {
      state.isFilterOpen = true
    },
    closeFilterModal(state) {
      state.isFilterOpen = false
    },
    openLocationsModal(state) {
      state.isLocationsOpen = true
    },
    closeLocationsModal(state) {
      state.isLocationsOpen = false
    },
  },
})

export const {
  openFilterModal,
  closeFilterModal,
  openLocationsModal,
  closeLocationsModal,
} = modalSlice.actions
export default modalSlice.reducer
