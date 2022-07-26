import { useState, useCallback } from 'react'
import { useWallet } from 'use-wallet'

export const useAuth = () => {
  const wallet = useWallet()
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem('userData'))
      ? JSON.parse(localStorage.getItem('userData')).userId
      : null
  )
  const [isLoggedIn, setIsLoggedIn] = useState(userId ? true : false)
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('userData'))
      ? JSON.parse(localStorage.getItem('userData')).wishlist
      : []
  )
  const [item, SetItem] = useState(
    JSON.parse(localStorage.getItem('userData'))
      ? JSON.parse(localStorage.getItem('userData')).item
      : []
  )
  const login = useCallback(({ uid, item, wishlist }) => {
    {wallet.status !== 'connected' && wallet.connect()}
    setIsLoggedIn(true)
    setUserId(uid)
    SetItem(item)
    setWishlist(wishlist)
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        item: item,
        wishlist: wishlist
      })
    )
  }, [])
  const setitem = useCallback(
    items => {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          item: items
        })
      )
      SetItem(items)
    },
    [login]
  )
  const SetWishlist = useCallback(wishlist => {
    setWishlist(wishlist)
    localStorage.setItem(
      'userData',
      JSON.stringify({
        wishlist: wishlist
      })
    )
  })
  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])
  return {
    wishlist,
    isLoggedIn,
    item,
    SetWishlist,
    setitem,
    login,
    logout,
    userId
  }
}
