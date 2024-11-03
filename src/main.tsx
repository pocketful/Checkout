import ReactDOM from 'react-dom/client'
import CheckoutPage from './components/pages/CheckoutPage/CheckoutPage'
import '@/styles/global.scss'
import { OrderProvider } from './context/OrderContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <OrderProvider>
    <CheckoutPage />
  </OrderProvider>,
  // </React.StrictMode>,
)
