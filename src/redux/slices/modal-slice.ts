import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isFilterOpen: false,
  isLocationsOpen: false,
  isEditOpen: false,
  isDeleteOpen: false,
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
    openEditModal(state) {
      state.isEditOpen = true
    },
    closeEditModal(state) {
      state.isEditOpen = false
    },
    openDeleteModal(state) {
      state.isDeleteOpen = true
    },
    closeDeleteModal(state) {
      state.isDeleteOpen = false
    },
  },
})

export const {
  openFilterModal,
  closeFilterModal,
  openLocationsModal,
  closeLocationsModal,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
} = modalSlice.actions
export default modalSlice.reducer
