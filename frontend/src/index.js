import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
import { useWallet, UseWalletProvider } from 'use-wallet'
import { MoralisProvider } from 'react-moralis';


ReactDOM.render(
  <UseWalletProvider>
    <React.StrictMode>
    <MoralisProvider serverUrl="https://atoh5dm710we.usemoralis.com:2053/server" appId="3lMD5UQzJkYjlz4nt3m6jdEUZImsGfdIcKuz3x6b">
      <App />
      </MoralisProvider>
    </React.StrictMode>
  </UseWalletProvider>
  ,
  document.getElementById('root')
)
