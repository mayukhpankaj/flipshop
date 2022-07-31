//Descriptionn Page for Items.
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/auth'
import Checkout from '../Checkout/checkout'
import ErrorModal from '../Modal/ErrorModal'
import { useHttpClient } from '../hooks/http-hook'
import MessageModal from '../Modal/MessageModal'
import Mint from '../warranty/mint'
import './itemPage.css'
import { useMoralis } from "react-moralis";
import Moralis from "moralis";
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider);


const Page = props => {
  console.log(props)
  const { authenticate, isAuthenticated, user } = useMoralis();
  const { isLoggedIn, userId } = useContext(AuthContext)
  const [isError, setIsError] = useState(null)
  const [Message, setIsMessage] = useState(null)
  const { sendRequest } = useHttpClient()
  const [itemImage, setItemImage] = useState()
  const [doAuth, setDoAuth] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const warrantyGenerator = async() => {
    // e.preventDefault()
    // console.log(userId, props.items.title, props.items._id, props.items.warranty_period);
    // if (!window.ethereum) {
    //   setIsError('No crypto wallet detected!')
    //   return
    // }
    if (!isAuthenticated) {
      authenticate();
      return
    }
    
    const mintingInfo = {
      // user: userId,
      prodId: props.items._id,
      prodName: props.items.title,
      warrantyPeriod: props.items.warranty_period,
      imgUrl:`${process.env.REACT_APP_BACKEND_URL}/items/image/${props.items.image}` ,
      user: user
    }
    try{
      Mint(mintingInfo);
      setIsMessage('Please allow transaction to mint your warranty: ');
    }
    catch(err){
      console.log(err);
      setIsMessage(err.message)
    }
  }
  //Handles Processing of CryptoPayment.
  const checkoutHandler = async e => {
    e.preventDefault()
    
    if (!window.ethereum) {
      setIsError('No crypto wallet detected!')
      return
    }
    if (!isLoggedIn) {
      setIsMessage('Please login first')
      return
    }
    try {
      const tx = await Checkout({
        ether: props.items.lPrice,
        addr: props.items.Metamask_add
      })
      if (tx) {
        const date = new Date()
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/transaction`,
            'POST',
            JSON.stringify({
              creator: userId,
              hash: tx.hash,
              PurchaseDate: date
            }),
            {
              'Content-Type': 'application/json'
            }
          )
        } catch (err) {
          setIsError(err)
        }
      }
      // setIsMessage('Transaction hash: ' + tx.hash)
      warrantyGenerator();
    } catch (err) {
      setIsMessage(err.message)
    }
  }
  useEffect(() => {
    const getImage = async () => {
      try {
        const responseData = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/items/image/${props.items.image}`
        )
        setItemImage(responseData.url)
      } catch (err) {}
    }
    getImage()
  }, [])
  const ClearError = () => {
    setIsError(null)
  }
  const ClearMessage = () => {
    setIsMessage(null)
  }
  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={ClearError} />
      <MessageModal message={Message} onClear={ClearMessage} />
      <div className='details'>
        <div className='big-img'>
          <img src={itemImage} alt={props.items.title} />
          <hr />
        </div>
        <div className='box'>
          <div className='row'>
            <h2>{props.items.title}</h2>
            <hr />
            <span>{props.items.lPrice} Flip Coins</span>
          </div>
          <p>{props.items.description}</p>
          <p>Seller : {props.creator} </p>
          {props.items.warranty_period >= 1 && (
            <p>
              Warranty period: {props.items.warranty_period}{' '}
              {(props.items.warranty_period === 1 && 'month') || 'months'}
            </p>
          )}
          <button className='cart' type='submit' onClick={checkoutHandler}>
            Buy Now
          </button>
          <br/>
          {/* <button className='cart' type='submit' onClick={warrantyGenerator}>
            Mint NFT
          </button> */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Page
