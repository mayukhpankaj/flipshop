//Positioning Items to Front Page.
import React, { useEffect, useState } from 'react'
import RenderItems from './renderItems'
import LoadingSpinner from '../Loader/Loader'
import ErrorModal from '../Modal/ErrorModal'
import Styles from './allitems.css'
import { useHttpClient } from '../hooks/http-hook'

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedItems, setLoadedItems] = useState()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/all`
        )
        setLoadedItems(responseData.items)
      } catch (err) {}
    }
    fetchUsers()
  }, [sendRequest])
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div class='Homepageheader'>
        <img
          src='https://rukminim1.flixcart.com/www/816/816/promos/23/03/2021/284eae1b-53c0-4648-8e75-3fc127e3a9cc.png?q=90'
          alt='sale'
        />
        <a href='#'>
          <img
            src='https://rukminim1.flixcart.com/www/200/200/promos/22/03/2021/28ca1a38-bb47-4707-8593-06be457dda0d.png?q=90'
            alt='mobile'
          />
          <div className="header_name">Mobiles</div>
        </a>
        <a href='#'>
          <img
            src='https://rukminim1.flixcart.com/www/200/200/promos/22/03/2021/6e46e87f-ba66-4bc9-b8a9-1c94ee1d1ac5.png?q=90'
            alt='electronic'
          />
          <div className="header_name">Electronics</div>
        </a>
        <a href='#'>
          <img
            src='https://rukminim1.flixcart.com/www/200/200/promos/22/03/2021/f378f75c-e953-423c-b43c-ba2c14d31968.png?q=90'
            alt='fashion'
          />
          <div className="header_name">Fashion</div>
        </a>
        <a href='#'>
          {' '}
          <img
            src='https://rukminim1.flixcart.com/www/200/200/promos/22/03/2021/a09bdcf1-6af0-4252-8156-cdae77f6a73a.png?q=90'
            alt='appliances'
          />
          <div className="header_name">Fashion &amp; TV appliances</div>
        </a>
      </div>
      {!isLoading && loadedItems && (
        <RenderItems items={loadedItems} show={false} />
      )}
    </React.Fragment>
  )
}

export default Users
