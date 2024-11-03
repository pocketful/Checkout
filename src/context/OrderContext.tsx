import { createContext, useContext, ReactNode, useState } from 'react'

interface OrderContextProps {
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
  const [warranty, setWarranty] = useState<boolean>(false)

  return <OrderContext.Provider value={{ warranty, setWarranty }}>{children}</OrderContext.Provider>
}
