import { createContext, useContext, ReactNode, useState } from 'react'

interface OrderContextProps {
  currency: string
  setCurrency: (value: string) => void
  warranty: boolean
  setWarranty: (value: boolean) => void
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined)

export const useOrderContext = () => {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrderContext must be used within OrderProvider')
  return context
}

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<string>('$')
  const [warranty, setWarranty] = useState<boolean>(false)

  return (
    <OrderContext.Provider value={{ currency, setCurrency, warranty, setWarranty }}>
      {children}
    </OrderContext.Provider>
  )
}
