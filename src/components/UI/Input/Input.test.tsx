import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Test input" />)
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument()
  })

  it('applies correct type', () => {
    render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
  })

  it('applies custom class name', () => {
    render(<Input classStyle="custom" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('handles value changes', async () => {
    const onChange = jest.fn()
    render(<Input onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'test')

    expect(onChange).toHaveBeenCalled()
    expect(input).toHaveValue('test')
  })

  it('applies focus styles', async () => {
    render(<Input />)
    const input = screen.getByRole('textbox')

    await userEvent.click(input)
    expect(input).toHaveFocus()
  })

  it('renders placeholder text', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })
})
