import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useMoralisWeb3Api } from "react-moralis";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from "react-bootstrap";
import './Claim.css'

import Button from '../FormElements/Button'

function Claim() {

    const Web3Api = useMoralisWeb3Api();

    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    const [addr, setAddr] = useState("");

    const [mdata, setmdata] = useState([]);

    const login = async () => {
      if (!isAuthenticated) {

        await authenticate({signingMessage: "Log in using Moralis" })
          .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));

            setAddr(user.get("ethAddress"));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }



    const logOut = async () => {
      await logout();
      console.log("logged out");
    }



    const fetchNFTs = async () => {
      // get NFTs for current user on Mainnet
      // const userEthNFTs = await Web3Api.account.getNFTs();
      // console.log(userEthNFTs);
      // // get testnet NFTs for user
      // const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
      //   chain: "goerli",
      // });
      // console.log(testnetNFTs);
    
      // get polygon NFTs for address

      // mumbai, matic testnet, polygon testnet

      const options = {
        chain: "mumbai",
        address: "0xA619Ca72EE64003ce4d7Fc7fb0f5eC99574D60c8",
      };
      const polygonNFTs = await Web3Api.account.getNFTs(options);
      console.log(polygonNFTs);

      const data = [];

      polygonNFTs.result.forEach(element => {

            // console.log(element.symbol);  

            // console.log(element)
            
            if(element.symbol === "FSNFT"){

              console.log(JSON.parse(element.metadata));

              const mdata = JSON.parse(element.metadata);
              // console.log(1);

              const mjson = {...element, ...mdata};

              data.push(mjson);
            }

            console.log(data.length);

            // console.log(4);
            // console.log(mdata.length)
      });

      setmdata(data);


    };
   

  




  return (
    <div>
      <h1>Moralis Hello World!</h1>
      <button className='btn' onClick={login}>Moralis Metamask Login</button>
      <button className='btn' onClick={logOut} disabled={isAuthenticating}>Logout</button>
      
      <h2>Your address is {addr}</h2>

      <button className='btn' onClick={fetchNFTs} > Get NFT data </button>

      <h2> Your NFT on OPENSTORE </h2>

      <Container>
            <ul>
                {mdata.map((metadata, k) => (
                    <li key={k} className="card">
                        <div className="img-div">
                          <img src={metadata.image} className="img"/>
                        </div>
                        <div className='card-body'>
                          <h5 className='card-title'>{metadata.name}</h5>
                          <a href={`https://testnets.opensea.io/assets/mumbai/${metadata.token_address}/${metadata.token_id}`} style={{ 'text-decoration': 'none' }}>
                            <Button onClick={()=>console.log("hello world")}> Claim </Button>
                          </a>
                        </div>
                        {/* <Card border="light" id="cards">
                            <Card.Img  variant="top"  src={metadata.image} className="img-fluid img"/>
                            <Card.Body>
                                <Card.Title>{metadata.name}</Card.Title>
                                <a href={`https://testnets.opensea.io/assets/mumbai/${metadata.token_address}/${metadata.token_id}`} style={{ 'text-decoration': 'none' }}>
                                 <Button onClick={()=>console.log("hello world")}> Claim </Button>
                               </a>
                            </Card.Body>
                        </Card> */}
                    </li>
                ))}
            </ul>
        </Container>
     
    </div>
  );


}

export default Claim;