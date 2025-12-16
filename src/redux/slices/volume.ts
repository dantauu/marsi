import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type VolumeState = {
  volume: number
  muted: boolean
}

const initialState: VolumeState = {
  volume: 100,
  muted: false,
}

export const volumeSlice = createSlice({
  name: "volume",
  initialState,
  reducers: {
    setVolume(state, action: PayloadAction<number>) {
      state.volume = Math.min(100, Math.max(0, action.payload))
      if (state.volume > 0) {
        state.muted = false
      }
    },
    mute(state) {
      state.muted = true
    },
    unmute(state) {
      state.muted = false
    },
    toggleMute(state) {
      state.muted = !state.muted
    },
  },
})

export const {
  setVolume, // for other cases dispatch(setVolume(50))
  mute, // for other cases dispatch(mute())
  unmute, // for other cases dispatch(unmute())
  toggleMute,
} = volumeSlice.actions

export default volumeSlice.reducer
