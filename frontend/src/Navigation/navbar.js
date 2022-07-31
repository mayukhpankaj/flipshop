import React, { useState, useContext } from 'react'
import UserIcon from '@material-ui/icons/AccountCircle'
import { Fade } from 'reactstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'
import Icon from '../icon-1.png'
import Button from '../FormElements/Button'
import Auth from '../Auth/Auth'
import '../App.css'
import './navbar.css'

function Navbar () {
  const [showLogin, setShowLogin] = useState(false)
  const { isLoggedIn, logout, wishlist } = useContext(AuthContext)
  const wishitems = wishlist.length
  //LogoutHandler
  const logoutHandler = e => {
    e.preventDefault()
    logout()
  }
  //LoginHandler
  const loginHandler = e => {
    e.preventDefault()
    setShowLogin(true)
  }
  return (
    <React.Fragment>
      {showLogin && (
        <Auth show={showLogin} onClear={() => setShowLogin(false)} />
      )}
      <div className='Navbar'>
        <div className='leftSide'>
          <div className='links'>
            <Link to='/' style={{ textDecoration: 'none', display: 'inline' }}>
              Flipshop<img src={Icon} style={{ height: '50px' , 'margin-left':'-0.15em'}} alt='Ethshop' />
            </Link>
          </div>
        </div>
        <div className='rightSide'>
          {!isLoggedIn && (
            <h3>
              <Button onClick={loginHandler} id='login'>
                Login
              </Button>
            </h3>
          )}
          {isLoggedIn && (
            <Fade in={true}>
              <Dropdown className='d-inline mx-2'>
                <Dropdown.Toggle id='dropdown'>
                  <UserIcon />
                </Dropdown.Toggle>

                <Dropdown.Menu id='menu'>
                  <Dropdown.Item>
                    <Link to='/wishlist' className='listitem'>
                      Wishlist
                      {wishitems ? ": " + wishitems : ""}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to='/Claim' className='listitem'>
                      Claim Warranty
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to='/sell' className='listitem'>
                      {' '}
                      Sell Item{' '}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to='/myitem' className='listitem'>
                      {' '}
                      My Items{' '}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <div onClick={logoutHandler}>
                      <Link to='/' className='listitem'>
                        Logout
                      </Link>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Fade>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Navbar
