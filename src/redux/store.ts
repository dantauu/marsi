import { configureStore } from "@reduxjs/toolkit"
import modalReducer from "./slices/modals.ts"
import sliderReducer from "./slices/slider.ts"
import filtersReducer from "./slices/filters.ts"
import authReducer from "./slices/auth.ts"
import usersReducer from "./slices/users.ts"
import { setupListeners } from "@reduxjs/toolkit/query"
import { layoutSlice } from "@/redux/slices/layout-switch.ts"
import { baseApi } from "@/redux/api/base-api.ts"
import { themeSwitch } from "@/redux/slices/theme-switch.ts"
import { volumeSlice } from "@/redux/slices/volume.ts"

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    slider: sliderReducer,
    filters: filtersReducer,
    auth: authReducer,
    users: usersReducer,
    layout_switch: layoutSlice.reducer,
    theme_switch: themeSwitch.reducer,
    volume: volumeSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
