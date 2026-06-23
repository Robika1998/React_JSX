import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'shopio_favorites'

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // ignore storage errors
  }
}

const initialState = {
  items: loadFromStorage(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      const exists = state.items.some((item) => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
        saveToStorage(state.items)
      }
    },
    removeFavorite(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveToStorage(state.items)
    },
    toggleFavorite(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload.id)
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push(action.payload)
      }
      saveToStorage(state.items)
    },
  },
})

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions

export const selectIsFavorite = (id) => (state) =>
  state.favorites.items.some((item) => item.id === id)

export default favoritesSlice.reducer
