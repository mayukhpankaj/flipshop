import React, { StrictMode, Suspense,useEffect } from 'react'
import './App.css'
import Navbar from './Navigation/navbar'
import AllItems from './Item/allItems'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import LoadingSpinner from './Loader/Loader'
import { useAuth } from './hooks/auth-hook'
import { AuthContext } from './context/auth'
// import UserItems from "./Item/userItems";
// import Form from "./sellingForm/form";
// import Wishlist from "./wishlist/wishlistData";
// import ItemPage from "./Item/itemId";
// import Checkout from "./Checkout/checkout";
import MetamskLogo from './icons/metamask.png'
import PinataLogo from './icons/pinata1.png'
import IpfsLogo from './icons/ipfs.png'

const Wishlist = React.lazy(() => import('./wishlist/wishlistData'))
const ItemPage = React.lazy(() => import('./Item/itemId'))
const UserItems = React.lazy(() => import('./Item/userItems'))
const Form = React.lazy(() => import('./sellingForm/form'))
const Checkout = React.lazy(() => import('./Checkout/checkout'))
const Claim = React.lazy(() => import('./Claim/Claim'))

function App () {
  const {
    wishlist,
    userId,
    item,
    setitem,
    isLoggedIn,
    login,
    SetWishlist,
    logout
  } = useAuth()
  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          wishlist: wishlist,
          items: item,
          isLoggedIn: isLoggedIn,
          userId: userId,
          SetWishlist: SetWishlist,
          login: login,
          logout: logout,
          setitem: setitem
        }}
      >
        <Router>
          <main>
            <Navbar />
            <Switch>
              <Route path='/' exact>
                <AllItems />
              </Route>
              <Suspense
                fallback={
                  <div className='center'>
                    <LoadingSpinner />
                  </div>
                }
              >
              <Route path='/:uid/item'>
                <ItemPage />
              </Route>
                {isLoggedIn && (
                  <Route path='/sell'>
                    <Form />
                  </Route>
                )}
                {isLoggedIn && (
                  <Route path='/wishlist'>
                    <Wishlist />
                  </Route>
                )}
                {isLoggedIn && (
                  <Route path='/myitem'>
                    <UserItems />
                  </Route>
                )}
                {isLoggedIn && (
                  <Route path='/Checkout'>
                    <StrictMode>
                      <Checkout />
                    </StrictMode>
                  </Route>
                  )}
                {(
                  <Route path='/Claim'>
                    <StrictMode>
                      < Claim />
                    </StrictMode>
                  </Route>
                )}

              </Suspense>
              <Redirect to='/' />
            </Switch>
          </main>
        </Router>
        <footer className='footer'>
          <div>
            <h3>Flipshop &copy;2022</h3>
          </div>
          <div className='footer-icons'>
            <a href='#'>
              <img src={MetamskLogo} alt="" width={40} height={40}/>
            </a>
            <a href='#'>
              <img src={PinataLogo} alt="" width={40} height={40}/>
            </a>
            <a href='#'>
              <img src={IpfsLogo} alt="" width={40} height={40}/>
            </a>
          </div>
        </footer>
      </AuthContext.Provider>
    </React.Fragment>
  )
}

export default App
