import { configureStore } from "@reduxjs/toolkit"
import modalReducer from "./slices/modal-slice"
import sliderReducer from "./slices/slider-slice.ts"
import filtersReducer from "./slices/filer-store.ts"
import authReducer from "./slices/auth.ts"
import { setupListeners } from "@reduxjs/toolkit/query"
import { locationsApi } from "@/redux/api/locations.ts"
import { layoutSlice } from "@/redux/slices/layout-switch.ts"
import { baseApi } from "@/redux/api/base-api.ts"

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    slider: sliderReducer,
    filters: filtersReducer,
    auth: authReducer,
    layout_switch: layoutSlice.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(locationsApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
