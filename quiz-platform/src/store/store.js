import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import questionsReducer from './questionsSlice';

const store = configureStore({
  reducer: {
    questions: questionsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
