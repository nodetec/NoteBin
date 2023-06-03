import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface TextState {
  text: string
  setText: (value: string) => void
}

export const useTextStore = create<TextState>()(
  devtools((set) => ({
    text: '',
    setText: (value: string) => set({ text: value }),
  }))
)
