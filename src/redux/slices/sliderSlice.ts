import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { MockCardData } from "@/lib/data/cards"

interface SliderState {
  currentIndex: number
  position: { x: number }
  isDragging: boolean
  startPosition: { x: number }
  lastDirection: string
}

const initialState: SliderState = {
  currentIndex: 0,
  position: { x: 0 },
  isDragging: false,
  startPosition: { x: 0 },
  lastDirection: "",
}

const SWIPE_THRESHOLD = 50

export const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    startDragging: (state, action: PayloadAction<{ x: number }>) => {
      state.isDragging = true
      state.startPosition = action.payload
    },
    updatePosition: (state, action: PayloadAction<number>) => {
      if (!state.isDragging) return
      const dx = action.payload - state.startPosition.x
      const resistance = 0.35
      state.position = { x: dx * resistance }
    },
    endDragging: (state, action: PayloadAction<number>) => {
      if (!state.isDragging) return

      const direction =
        action.payload > state.startPosition.x ? "right" : "left"
      state.lastDirection = direction

      if (Math.abs(state.position.x) > SWIPE_THRESHOLD) {
        if (state.currentIndex < MockCardData.length - 1) {
          state.currentIndex += 1
        }
      }

      state.position = { x: 0 }
      state.isDragging = false
    },
    handleLike: (state) => {
      if (state.currentIndex < MockCardData.length - 1) {
        state.lastDirection = "right"
        state.currentIndex += 1
        state.position = { x: 0 }
      }
    },
    handleDislike: (state) => {
      if (state.currentIndex < MockCardData.length - 1) {
        state.lastDirection = "left"
        state.currentIndex += 1
        state.position = { x: 0 }
      }
    },
  },
})

export const {
  startDragging,
  updatePosition,
  endDragging,
  handleLike,
  handleDislike,
} = sliderSlice.actions

export default sliderSlice.reducer
