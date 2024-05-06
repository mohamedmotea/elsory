import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import TokenContextProvider from './Context/Token.jsx'
import CartContextProvider from './Context/Cart.jsx'
import WishlistContextProvider from './Context/Wishlist.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
    <App />
          </WishlistContextProvider>
        </CartContextProvider>
      </TokenContextProvider>
    </QueryClientProvider>
  </React.StrictMode>, 
)
