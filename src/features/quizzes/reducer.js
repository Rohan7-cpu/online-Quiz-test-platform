import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import { ADD_QUIZZES, SET_QUIZZES, UPDATE_QUIZ, DELETE_QUIZ, TOGGLE_ACTIVE, CLEAR_ALL } from './actions';

const initialState = {
  items: loadFromLocalStorage('question') || []
};

export default function quizzesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUIZZES: {
      const items = state.items.concat(action.payload);
      saveToLocalStorage('question', items);
      return { ...state, items };
    }
    case SET_QUIZZES: {
      saveToLocalStorage('question', action.payload);
      return { ...state, items: action.payload };
    }
    case UPDATE_QUIZ: {
      const idx = state.items.findIndex(q => q.id === action.payload.id);
      if (idx === -1) return state;
      const items = [...state.items];
      items[idx] = action.payload;
      saveToLocalStorage('question', items);
      return { ...state, items };
    }
    case DELETE_QUIZ: {
      const items = state.items.filter(q => q.id !== action.payload);
      saveToLocalStorage('question', items);
      return { ...state, items };
    }
    case TOGGLE_ACTIVE: {
      const items = state.items.map(q => q.id === action.payload ? { ...q, active: !q.active } : q);
      saveToLocalStorage('question', items);
      return { ...state, items };
    }
    case CLEAR_ALL: {
      saveToLocalStorage('question', []);
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}
//3rd step it will dispatch the action it is reducer and it will change the state