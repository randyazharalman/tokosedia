import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductDetailPage from './pages/product-detail-page.tsx'
import ProductsPage from './pages/products-page.tsx'
import { CartProvider } from './context/cart-context.tsx'
import CartPage from './pages/cart-page.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/products',
    element: <ProductsPage />
  },
  {
    path:'/product/:productId',
    element: <ProductDetailPage />
  },
  {
    path: '/cart',
    element: <CartPage />
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
    <RouterProvider router={router}/>
    </CartProvider>
  </StrictMode>,
)
