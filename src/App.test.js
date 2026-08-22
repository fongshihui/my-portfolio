import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
}));

jest.mock('canvas-confetti', () => () => ({}));

test('renders portfolio section navigation', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /skills/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
});

test('switches from about content to skills content in the skills tab', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /skills/i }));

  expect(screen.getByRole('heading', { name: /technical skills/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /about me/i })).not.toBeInTheDocument();
});
