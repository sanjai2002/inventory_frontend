import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signin from '../Components/Signin';

// Test to check if the login form renders correctly

test('renders login form', () => {
  render(<Signin />);
  expect(screen.getByTestId('Heading')).toHaveTextContent('Login');
  expect(screen.getByTestId('inputEmail')).toBeInTheDocument();
  expect(screen.getByTestId('inputPassword')).toBeInTheDocument();
  expect(screen.getByTestId('Loginbtn')).toBeInTheDocument();
});

// // Test to check if input fields accept text
// test('allows text input', () => {
//   render(<LoginForm />);
//   fireEvent.change(screen.getByTestId('inputEmail'), { target: { value: 'test@example.com' } });
//   fireEvent.change(screen.getByTestId('inputPassword'), { target: { value: 'password123' } });
//   expect(screen.getByTestId('inputEmail').value).toBe('test@example.com');
//   expect(screen.getByTestId('inputPassword').value).toBe('password123');
// });

// // Test to check form submission
// test('submits the form', () => {
//   const handleSubmit = jest.fn();
//   render(<LoginForm onSubmit={handleSubmit} />);
//   fireEvent.click(screen.getByTestId('Loginbtn'));
//   expect(handleSubmit).toHaveBeenCalled();
// });

// // Test to check form validation messages
// test('displays validation messages', () => {
//   render(<LoginForm />);
//   fireEvent.submit(screen.getByTestId('Loginbtn'));
//   expect(screen.getByText(/enter email/i)).toBeInTheDocument();
//   expect(screen.getByText(/enter the password/i)).toBeInTheDocument();
// });

