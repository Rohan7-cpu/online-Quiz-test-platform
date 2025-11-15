import { render, screen } from '@testing-library/react';
import MyQuizzes from '../../pages/MyQuizzes';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { BrowserRouter } from 'react-router-dom';

test('renders My Quizzes page', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MyQuizzes role="admin" />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText(/Create New Quiz/i)).toBeInTheDocument();
});
