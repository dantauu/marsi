import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type AuthState = {
  token: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem("jwt"),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
      if (action.payload) {
        localStorage.setItem("jwt", action.payload)
      } else {
        localStorage.removeItem("jwt")
      }
    },
  },
})

export const { setToken } = authSlice.actions
export default authSlice.reducer
