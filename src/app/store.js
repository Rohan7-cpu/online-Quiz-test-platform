import { configureStore } from '@reduxjs/toolkit';
import quizzesReducer from '../features/quizzes/reducer';

const store = configureStore({
  reducer: {
    quizzes: quizzesReducer
  }
});

export default store;
// store .js it will create redux store for me so it uis the 1st step