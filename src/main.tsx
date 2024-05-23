import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { SidebarProvider } from './context/SidebarContext.tsx'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  

  <Provider store={store}>
    <App/>
  
   
  </Provider>,
  
)
