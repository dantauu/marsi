import { createSlice } from "@reduxjs/toolkit"

type VolumeState = {
  muted: boolean
}

const getInitialVolumeState = (): VolumeState => {
  if (typeof window === "undefined") {
    return { muted: false }
  }
  const saved = localStorage.getItem("volume")

  if (!saved) {
    return { muted: false }
  }
  try {
    const parsed = JSON.parse(saved) as VolumeState

    return {
      muted: Boolean(parsed.muted),
    }
  } catch {
    return { muted: false }
  }
}
const initialState: VolumeState = getInitialVolumeState()

export const volumeSlice = createSlice({
  name: "volume",
  initialState,
  reducers: {
    mute(state) {
      state.muted = true
      localStorage.setItem("volume", JSON.stringify({ muted: true }))
    },
    unmute(state) {
      state.muted = false
      localStorage.setItem("volume", JSON.stringify({ muted: false }))
    },
    toggleMute(state) {
      state.muted = !state.muted
      localStorage.setItem("volume", JSON.stringify({ muted: state.muted }))
    },
  },
})

export const {
  mute, // for other cases dispatch(mute())
  unmute, // for other cases dispatch(unmute())
  toggleMute,
} = volumeSlice.actions

export default volumeSlice.reducer
