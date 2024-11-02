import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RadioButton from './RadioButton'

describe('RadioButton', () => {
  it('renders radio button', () => {
    render(<RadioButton />)
    expect(screen.getByRole('radio')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<RadioButton />)
    const radio = screen.getByRole('radio')
    expect(radio).toHaveClass('radioOuter')
    expect(radio).not.toHaveClass('radioOuterSelected')
  })

  it('shows selected state styles', () => {
    render(<RadioButton isSelected={true} />)
    const radio = screen.getByRole('radio')
    expect(radio).toHaveClass('radioOuter', 'radioOuterSelected')
    expect(screen.getByTestId('radio-inner')).toBeInTheDocument()
  })

  it('does not show inner circle when not selected', () => {
    render(<RadioButton isSelected={false} />)
    expect(screen.queryByTestId('radio-inner')).not.toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    render(<RadioButton onClick={handleClick} />)

    await userEvent.click(screen.getByRole('radio'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('has correct accessibility attributes', () => {
    render(<RadioButton isSelected={true} />)
    const radio = screen.getByRole('radio')
    expect(radio).toHaveAttribute('type', 'button')
    expect(radio).toBeChecked()
  })

  it('spreads additional props to button element', () => {
    render(<RadioButton data-testid="test-radio" />)
    expect(screen.getByRole('radio')).toHaveAttribute('data-testid', 'test-radio')
  })
})
