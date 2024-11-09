import { render, renderHook, act, screen } from '@testing-library/react'
import { useOrderContext, OrderProvider } from './OrderContext'

describe('OrderContext', () => {
  it('should render children inside OrderProvider', () => {
    render(
      <OrderProvider>
        <div>Test Child</div>
      </OrderProvider>,
    )
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('should provide initial currency state as "$"', () => {
    const { result } = renderHook(() => useOrderContext(), {
      wrapper: OrderProvider,
    })
    expect(result.current.currency).toBe('$')
  })

  it('should update currency state', () => {
    const { result } = renderHook(() => useOrderContext(), {
      wrapper: OrderProvider,
    })

    act(() => {
      result.current.setCurrency('€')
    })

    expect(result.current.currency).toBe('€')
  })

  it('should provide initial warranty state as false', () => {
    const { result } = renderHook(() => useOrderContext(), {
      wrapper: OrderProvider,
    })
    expect(result.current.warranty).toBe(false)
  })

  it('should update warranty state', () => {
    const { result } = renderHook(() => useOrderContext(), {
      wrapper: OrderProvider,
    })

    act(() => {
      result.current.setWarranty(true)
    })

    expect(result.current.warranty).toBe(true)
  })

  it('should throw error when useOrderContext used outside OrderProvider', () => {
    expect(() => {
      renderHook(() => useOrderContext())
    }).toThrow('useOrderContext must be used within OrderProvider')
  })
})
