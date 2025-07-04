import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isFilterOpen: false,
  isLocationsOpen: false,
  isEditOpen: false,
  editFieldKey: null,
  editFieldTitle: null,
  editFieldValue: null,
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
    openEditModal(state, action) {
      const { key, title, value } = action.payload
      state.isEditOpen = true
      state.editFieldKey = key
      state.editFieldTitle = title
      state.editFieldValue = value
    },
    closeEditModal(state) {
      state.isEditOpen = false
      state.editFieldKey = null
      state.editFieldTitle = null
      state.editFieldValue = null
    },
    setEditFieldValue(state, action) {
      state.editFieldValue = action.payload
    }
  },
})

export const {
  openFilterModal,
  closeFilterModal,
  openLocationsModal,
  closeLocationsModal,
  openEditModal,
  closeEditModal,
  setEditFieldValue
} = modalSlice.actions
export default modalSlice.reducer
