import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('renders the default starter page', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })
})
