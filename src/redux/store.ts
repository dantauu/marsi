import { configureStore } from "@reduxjs/toolkit"
import modalReducer from "./slices/modal-slice"
import sliderReducer from "./slices/slider-slice.ts"
import { userApi } from "@/redux/api/user.ts"
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    slider: sliderReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
