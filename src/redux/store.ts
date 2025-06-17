import { configureStore } from "@reduxjs/toolkit"
import modalReducer from "./slices/modal-slice"
import sliderReducer from "./slices/slider-slice.ts"

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    slider: sliderReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
