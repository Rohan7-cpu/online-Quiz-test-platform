export const ADD_QUIZZES = 'ADD_QUIZZES';
export const SET_QUIZZES = 'SET_QUIZZES';
export const UPDATE_QUIZ = 'UPDATE_QUIZ';
export const DELETE_QUIZ = 'DELETE_QUIZ';
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';
export const CLEAR_ALL = 'CLEAR_ALL';

export function addQuizzes(payload) {
  return { type: ADD_QUIZZES, payload };
}
export function setQuizzes(payload) {
  return { type: SET_QUIZZES, payload };
}
export function updateQuiz(payload) {
  return { type: UPDATE_QUIZ, payload };
}
export function deleteQuiz(id) {
  return { type: DELETE_QUIZ, payload: id };
}
export function toggleActive(id) {
  return { type: TOGGLE_ACTIVE, payload: id };
}
export function clearAll() {
  return { type: CLEAR_ALL };
}
//2nd step to initialize the state