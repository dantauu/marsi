import type { User } from "@/app/types/user"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type UsersState = {
  users: User[]
  interactedIds: string[]
}

const initialState: UsersState = {
  users: [],
  interactedIds: []
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    appendUsers: (state, action: PayloadAction<User[]>) => {
      const filtered = action.payload.filter((u) => !state.interactedIds.includes(u.id))
      state.users.push(...filtered)
    },
    removedUser: (state, action: PayloadAction<string>) => {
      if (!state.interactedIds.includes(action.payload)) {
        state.interactedIds.push(action.payload)
      }
      state.users = state.users.filter((u) => u.id !== action.payload)
    },
    resetUsers: (state) => {
      state.users = []
      state.interactedIds = []
    }
  }
})

export default userSlice.reducer
export const { appendUsers, removedUser, resetUsers } = userSlice.actions