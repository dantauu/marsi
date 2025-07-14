import { configureStore } from "@reduxjs/toolkit"
import modalReducer from "./slices/modal-slice"
import sliderReducer from "./slices/slider-slice.ts"
import { userApi } from "@/shared/api/user.ts"
import { setupListeners } from "@reduxjs/toolkit/query"
import { locationsApi } from "@/redux/api/locations.ts"

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    slider: sliderReducer,
    [userApi.reducerPath]: userApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(locationsApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
