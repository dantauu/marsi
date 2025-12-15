import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type VolumeState = {
  volume: number
  muted: boolean
}

const getInitialVolumeState = (): VolumeState => {
  if (typeof window === "undefined") {
    return { volume: 100, muted: false }
  }

  const saved = localStorage.getItem("volume")

  if (!saved) {
    return { volume: 100, muted: false }
  }
  try {
    const parsed = JSON.parse(saved) as VolumeState

    return {
      volume: parsed.volume ? Math.min(100, Math.max(0, parsed.volume)) : 100,
      muted: Boolean(parsed.muted),
    }
  } catch {
    return { volume: 100, muted: false }
  }
}
const initialState: VolumeState = getInitialVolumeState()

export const volumeSlice = createSlice({
  name: "volume",
  initialState,
  reducers: {
    setVolume(state, action: PayloadAction<number>) {
      state.volume = Math.min(100, Math.max(0, action.payload))
      if (state.volume > 0) {
        state.muted = false
      }
      localStorage.setItem(
        "volume",
        JSON.stringify({ volume: state.volume, muted: state.muted })
      )
    },
    mute(state) {
      state.muted = true
      localStorage.setItem(
        "volume",
        JSON.stringify({ volume: state.volume, muted: true })
      )
    },
    unmute(state) {
      state.muted = false
      localStorage.setItem(
        "volume",
        JSON.stringify({ volume: state.volume, muted: false })
      )
    },
    toggleMute(state) {
      state.muted = !state.muted
      localStorage.setItem(
        "volume",
        JSON.stringify({ volume: state.volume, muted: state.muted })
      )
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
