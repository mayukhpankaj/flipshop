import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Heart from 'react-heart'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import ErrorModal from '../Modal/ErrorModal'
import { useHttpClient } from '../hooks/http-hook'
import LoadingSpinner from "../PageLoader/PageLoader"
import Button from '../FormElements/Button'
import './Item.css'

const Item = props => {
  const history = useHistory()
  const [wishstate, setWishstate] = useState(props.wishlist || false)
  const { error, sendRequest,isLoading, clearError } = useHttpClient()
  const { isLoggedIn, SetWishlist, userId } = useContext(AuthContext)

  //Handles Deletion of items.
  const deleteHandler = async () => {
    if (window.confirm(`Are you sure you want to delete ${props.name}`)) {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/item`,
          'DELETE',
          JSON.stringify({
            creator: userId,
            id: props.id
          }),
          {
            'Content-Type': 'application/json'
          }
        )
        history.push('/')
      } catch (err) {}
    }
  }

  //Handles Addition of items to Wishlist.
  const wishListHandler = async () => {
    if (!wishstate) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/wishlist`,
          'POST',
          JSON.stringify({
            creator: userId,
            wishlistid: props.id
          }),
          {
            'Content-Type': 'application/json'
          }
        )
        SetWishlist(responseData.wishlist)
        setWishstate(prev => !prev)
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/wishlist`,
          'PATCH',
          JSON.stringify({
            creator: userId,
            wishlistid: props.id
          }),
          {
            'Content-Type': 'application/json'
          }
        )
        SetWishlist(responseData.wishlist)
        setWishstate(prev => !prev)
      } catch (err) {}
    }
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner/>}
      <li>
       <div style={{"flex":"wrap","marginRight":"10%"}}>
        {
          <img
          src={`${process.env.REACT_APP_BACKEND_URL}/items/image/${props.image}`}
          alt={props.name}
          />
        }
         {isLoggedIn && (
          <Heart
            className='heart'
            isActive={wishstate}
            onClick={wishListHandler}
          />
        )}
        </div>
        <br />
        <div className='Title'>{props.name}</div>
        <div className='Price'>{props.lprice} Flip Coins</div>
        <br />
        <Link to={`${props.id}/item`} style={{ 'text-decoration': 'none' }}>
          <Button>View</Button>
        </Link>
        {props.show && props.creator === userId && (
          <Button onClick={deleteHandler} style={{ 'margin-left': '20rem' }}>
            DELETE
          </Button>
        )}
      </li>
    </React.Fragment>
  )
}

export default Item
