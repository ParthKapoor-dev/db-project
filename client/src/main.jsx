import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./global.css"

import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from './context/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
