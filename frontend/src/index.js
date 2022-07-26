import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
import { useWallet, UseWalletProvider } from 'use-wallet'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <UseWalletProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UseWalletProvider>,
  document.getElementById('root')
)

reportWebVitals()
