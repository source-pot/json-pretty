import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Input and Pretty tabs', () => {
  render(<App />);
  expect(screen.getByRole('tab', { name: /input/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /pretty/i })).toBeInTheDocument();
});

test('parses pasted JSON and renders it on the Pretty tab', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText(/Paste JSON here/i), {
    target: { value: '{"hello":"world"}' },
  });
  fireEvent.click(screen.getByRole('tab', { name: /pretty/i }));
  expect(screen.getByText(/"hello"/)).toBeInTheDocument();
  expect(screen.getByText(/"world"/)).toBeInTheDocument();
});
