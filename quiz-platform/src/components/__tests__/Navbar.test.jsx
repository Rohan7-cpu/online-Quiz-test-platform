// src/components/__tests__/Navbar.test.jsx
import React from 'react';
import '@testing-library/jest-dom'; // ensures toBeInTheDocument works
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar'; // make sure this path matches your project

describe('Navbar Component', () => {
  test('renders navbar with full name and menu items', () => {
    render(
      <BrowserRouter>
        <Navbar fullName="Rohan" role="admin" />
      </BrowserRouter>
    );

    // Check for the brand/logo text
    expect(screen.getByText(/Quizzy/i)).toBeInTheDocument();

    // Check if full name is displayed
    expect(screen.getByText(/Rohan/i)).toBeInTheDocument();

    // Check menu buttons based on admin role
    expect(screen.getByText(/Create Quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/My Quizzes/i)).toBeInTheDocument();
    expect(screen.getByText(/Play Quiz/i)).toBeInTheDocument();
  });
});
