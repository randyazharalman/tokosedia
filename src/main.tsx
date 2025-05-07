import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProfilePage from './pages/profile/ProfilePage.tsx'
import MulyonoPage from './pages/profile/MulyonoPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'profile',
    element: <ProfilePage />,
    children: [
      {path: 'mulyono', element: <MulyonoPage />}
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
