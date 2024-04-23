import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthProvider.jsx'
import Loader from './Loader.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </AuthProvider>
  </React.StrictMode>,
)
