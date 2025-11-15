import { createSlice } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const initial = loadFromLocalStorage('questions') || [];

const slice = createSlice({
  name: 'questions',
  initialState: {
    items: initial,
  },
  reducers: {
    addQuiz(state, action) {
      state.items.push(action.payload);
      saveToLocalStorage('questions', state.items);
    },
    updateQuiz(state, action) {
      const idx = state.items.findIndex(q => q.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      saveToLocalStorage('questions', state.items);
    },
    deleteQuiz(state, action) {
      state.items = state.items.filter(q => q.id !== action.payload);
      saveToLocalStorage('questions', state.items);
    },
    toggleActive(state, action) {
      const idx = state.items.findIndex(q => q.id === action.payload);
      if (idx !== -1) {
        state.items[idx].active = !state.items[idx].active;
        saveToLocalStorage('questions', state.items);
      }
    }
  }
});

export const { addQuiz, updateQuiz, deleteQuiz, toggleActive } = slice.actions;
export default slice.reducer;
