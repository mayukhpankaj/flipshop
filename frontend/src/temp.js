import React, { useEffect, useState } from 'react';
import './App.css';
import { useMoralis } from 'react-moralis';
import { useMoralisWeb3Api } from "react-moralis";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from "react-bootstrap";

function App() {

    const Web3Api = useMoralisWeb3Api();

    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    const [addr, setAddr] = useState("");

    const [mdata, setmdata] = useState([]);

    useEffect(() => {

    if (isAuthenticated) {
          // add your logic here
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isAuthenticated]);




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

            console.log(element)
            
            if(element.symbol === "FSNFT"){

              console.log(JSON.parse(element.metadata));

              var mdata = JSON.parse(element.metadata);

              data.push(mdata);
              
            }

            setmdata(data);
        
      });




    };
   






  return (
    <div>
      <h1>Moralis Hello World!</h1>
      <button onClick={login}>Moralis Metamask Login</button>
      <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
      
      <h2>Your address is {addr}</h2>

      <button onClick={fetchNFTs} > Get NFT data </button>

      <h2> Your NFT on OPENSTORE </h2>

      <Container>
            <Row>
                {mdata.map((metadata, k) => (
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card >
                            <Card.Img src={metadata.image} />

                            <Card.Body>
                                <Card.Title>{metadata.name}</Card.Title>
                                {/* <Card.Text>{metadata.description}</Card.Text> */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
     
    </div>
  );


}

export default App;