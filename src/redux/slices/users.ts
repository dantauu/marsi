import type { User } from "@/app/types/user"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type UsersState = {
  users: User[]
}

const initialState: UsersState = {
  users: []
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    appendUsers: (state, action: PayloadAction<User[]>) => {
      state.users.push(...action.payload)
    },
    removedUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u.id !== action.payload)
    },
    resetUsers: (state) => {
      state.users = []
    }
  }
})

export default userSlice.reducer
export const { setUsers, appendUsers, removedUser, resetUsers } = userSlice.actions