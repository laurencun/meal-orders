import { render, screen } from '@testing-library/react';
import App from './App';

//smoke test
test('renders learn react link', () => {
  render(<App />);
  const header = screen.getByText(/Let's Eat!/i);
  expect(header).toBeInTheDocument();
});