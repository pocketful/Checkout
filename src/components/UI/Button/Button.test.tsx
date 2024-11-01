import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button>Submit</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Submit')
  })

  it('renders primary variant by default', () => {
    render(<Button>Submit</Button>)
    expect(screen.getByRole('button')).toHaveClass('primary')
  })

  it('renders secondary variant when specified', () => {
    render(<Button variant="secondary">Submit</Button>)
    expect(screen.getByRole('button')).toHaveClass('secondary')
  })

  it('has button type by default', () => {
    render(<Button>Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('can change button type', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Submit</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('forwards ref to button element', () => {
    const ref = jest.fn()
    render(<Button ref={ref}>Submit</Button>)
    expect(ref).toHaveBeenCalled()
  })
})
