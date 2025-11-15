import { render, screen, fireEvent } from '@testing-library/react';
import PlayQuiz from '../PlayQuiz'; // same folder logic
import { Provider } from 'react-redux';
import { store } from '../store'; // your redux store

test('renders full name input before starting quiz', () => {
  render(
    <Provider store={store}>
      <PlayQuiz setFullName={jest.fn()} />
    </Provider>
  );

  expect(screen.getByLabelText(/Full name/i)).toBeInTheDocument();
  expect(screen.getByText(/Start Quiz/i)).toBeInTheDocument();
});
