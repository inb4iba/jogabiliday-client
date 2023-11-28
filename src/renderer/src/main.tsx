import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { App } from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Orelo } from './pages/Orelo'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/orelo',
    element: <Orelo />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
