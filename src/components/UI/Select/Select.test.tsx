import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Select from './Select'

describe('Select', () => {
  const mockOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
  ]

  const renderSelect = (props = {}) => {
    return render(<Select label="Test Label" options={mockOptions} {...props} />)
  }

  it('renders select with label', () => {
    renderSelect()
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders all provided options', () => {
    renderSelect()
    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('applies custom class style', () => {
    renderSelect({ classStyle: 'custom' })
    expect(screen.getByRole('combobox')).toHaveClass('select')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    renderSelect({ ref })
    expect(ref).toHaveBeenCalled()
  })

  it('handles value changes', async () => {
    const onChange = jest.fn()
    renderSelect({ onChange })

    const select = screen.getByRole('combobox')
    await userEvent.selectOptions(select, 'CA')

    expect(onChange).toHaveBeenCalled()
    expect(select).toHaveValue('CA')
  })

  it('renders without label when not provided', () => {
    render(<Select options={mockOptions} />)
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument()
  })

  it('renders empty select when no options provided', () => {
    render(<Select label="Test Label" />)
    expect(screen.queryAllByRole('option')).toHaveLength(0)
  })

  it('has correct accessibility attributes', () => {
    renderSelect({ 'aria-label': 'Select country' })
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Select country')
  })
})