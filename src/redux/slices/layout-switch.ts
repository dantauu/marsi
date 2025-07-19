import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type LayoutType = "grid" | "expanded"

type LayoutState = {
  layout: LayoutType
}

const initialState: LayoutState = {
  layout: "grid"
}

export const layoutSlice = createSlice({
  name: "layout-switch",
  initialState,
  reducers: {
    setLayout(state, action: PayloadAction<LayoutType>) {
      state.layout = action.payload
    },
    toggleLayout(state) {
      state.layout = state.layout === "grid" ? "expanded" : "grid"
    },
  },
})

export const {
  setLayout,
  toggleLayout,
} = layoutSlice.actions
export default layoutSlice.reducer
