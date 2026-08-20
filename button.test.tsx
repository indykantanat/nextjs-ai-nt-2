import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './src/components/ui/button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeDefined()
  })

  it('applies correct variant attribute', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button.getAttribute('data-variant')).toBe('destructive')
  })
})
