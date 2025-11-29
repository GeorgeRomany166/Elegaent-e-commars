import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the application without crashing', () => {
  render(<App />);
  // Check if the app renders by looking for the brand name
  const brandElement = screen.getByText(/Elegant/i);
  expect(brandElement).toBeInTheDocument();
});

test('renders home page with products section', () => {
  render(<App />);
  // Check if New Arrivals section is present
  const newArrivalsElement = screen.getByText(/New Arrivals/i);
  expect(newArrivalsElement).toBeInTheDocument();
});
