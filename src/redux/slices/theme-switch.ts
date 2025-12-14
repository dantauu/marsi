import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type ThemeSwitchType = "light" | "dark"

type ThemeState = {
  theme: ThemeSwitchType
}

const getInitialTheme = (): ThemeSwitchType => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme
  }
  return "dark"
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
}

export const themeSwitch = createSlice({
  name: "themeSwitch",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<ThemeSwitchType>) => {
      state.theme = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark"
    },
  },
})

export const { toggleTheme } = themeSwitch.actions
export default themeSwitch.reducer
