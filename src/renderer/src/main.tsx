import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { App } from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { External } from './pages/External'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/external',
    element: <External />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
