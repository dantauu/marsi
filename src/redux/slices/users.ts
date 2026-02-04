import type { User } from "@/app/types/user.ts"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type UsersState = {
  users: User[]
}

const initialState: UsersState = {
  users: [],
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    appendUsers: (state, action: PayloadAction<User[]>) => {
      state.users.push(...action.payload)
    },
    resetUsers: (state) => {
      state.users = []
    },
  },
})

export default userSlice.reducer
export const { appendUsers, resetUsers } = userSlice.actions
