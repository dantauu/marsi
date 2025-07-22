import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SliderState {
  currentIndex: number
  position: { x: number }
  isDragging: boolean
  startPosition: { x: number }
  lastDirection: string
  exitDirection: "left" | "right" | null
}

const initialState: SliderState = {
  currentIndex: 0,
  position: { x: 0 },
  isDragging: false,
  startPosition: { x: 0 },
  lastDirection: "",
  exitDirection: null,
}

const SWIPE_THRESHOLD = 190

export const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    startDragging: (state, action: PayloadAction<{ x: number }>) => {
      state.isDragging = true
      state.startPosition = action.payload
      state.exitDirection = null
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload
    },
    updatePosition: (state, action: PayloadAction<number>) => {
      if (!state.isDragging) return
      const dx = action.payload - state.startPosition.x
      const resistance = 1.2
      state.position = { x: dx * resistance }
    },
    endDragging: (state, action: PayloadAction<number>) => {
      if (!state.isDragging) return

      const direction =
        action.payload > state.startPosition.x ? "right" : "left"
      state.lastDirection = direction

      if (Math.abs(state.position.x) > SWIPE_THRESHOLD) {
          state.exitDirection = direction
          state.currentIndex += 1
      }

      state.position = { x: 0 }
      state.isDragging = false
    },
    handleLike: (state) => {
        state.lastDirection = "right"
        state.exitDirection = "right"
        state.currentIndex += 1
        state.position = { x: 0 }
    },
    handleDislike: (state) => {
        state.lastDirection = "left"
        state.exitDirection = "left"
        state.currentIndex += 1
        state.position = { x: 0 }
    },
  },
})

export const {
  startDragging,
  setCurrentIndex,
  updatePosition,
  endDragging,
  handleLike,
  handleDislike,
} = sliderSlice.actions

export default sliderSlice.reducer
