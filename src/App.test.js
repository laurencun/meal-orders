import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

//smoke test
test('renders heading', () => {
  render(<App />);
  const heading = screen.getByText(/Let's Eat!/i);
  expect(heading).toBeInTheDocument();
});


describe('App', () => {
  test('renders drop down menu options', () => {
    render(<App />);
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
  });
})

describe('App', () => {
  test('renders breakfast menu when breakfast is selected', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: {value: 'breakfast'}
    })
    const menuLabel = screen.getByText(/breakfast menu/)
    expect(menuLabel).toBeInTheDocument()
  });
})

describe('App', () => {
  test('renders lunch menu when lunch is selected', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: {value: 'lunch'}
    })
    const menuLabel = screen.getByText(/lunch menu/)
    expect(menuLabel).toBeInTheDocument()
  });
})

describe('App', () => {
  test('renders dinner menu when dinner is selected', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: {value: 'dinner'}
    })
    const menuLabel = screen.getByText(/dinner menu/)
    expect(menuLabel).toBeInTheDocument()
  });
})

describe('App', () => {
  test('renders order, order buttons and order items when items are added', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: {value: 'dinner'}
    })
    const addButtons = screen.getAllByRole('button')
    fireEvent.click(addButtons[0])
    expect(screen.getByText(/current order/)).toBeInTheDocument()
    expect(screen.getByText(/Start Over/)).toBeInTheDocument()
    expect(screen.getByText(/Submit!/)).toBeInTheDocument()

    const listItems = screen.getAllByRole('listitem')
    expect(listItems[4]).toContainHTML(`<li class='order-item'>1. Steak</li>`)
  });
})


describe('App', () => {
  test('clears the current order when start over is clicked', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: {value: 'dinner'}
    })
    const addButtons = screen.getAllByRole('button')
    fireEvent.click(addButtons[0])

    const startOverButton = screen.getByText(/Start Over/)
    expect(startOverButton).toBeInTheDocument()

    fireEvent.click(startOverButton)
    expect(screen.queryByText(/current order/)).toBeNull()
  });
})

describe('App', () => {
  test('clears order and submits the current order', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: {value: 'breakfast'}
    })

    const addButtons = screen.getAllByRole('button')
    fireEvent.click(addButtons[0])
    fireEvent.click(addButtons[1])
    fireEvent.click(addButtons[2])


    const submitButton = screen.getByText(/Submit!/)
    expect(submitButton).toBeInTheDocument()

    window.alert = jest.fn()

    fireEvent.click(submitButton)
    expect(window.alert.mock.calls.length).toBe(1)
    expect(screen.queryByText(/current order/)).toBeNull()
  });
})