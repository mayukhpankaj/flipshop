import {
  BrowserRouter as useRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Moralis from "moralis";
import { contractABI, contractAddress } from "./contract";
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider);

function mint(props) {
  // const { isAuthenticated, logout, user } = useMoralis();
    // const isAuthenticated = props.isAuthenticated;
    const user = props.user;
    console.log(user);
    const prodId = props.prodId;
    const prodName = props.prodName;
    const warrentyPeriod = props.warrantyPeriod;
    const imgUrl = props.imgUrl;
  (async function startMint() {
    // e.preventDefault();
    try {
      // Generate metadata and save to IPFS
      const metadata = {
        prodId,
        name: prodName,
        warrentyPeriod,
        purchase_date: new Date().toISOString(),
        image: imgUrl,
      };
      const file2 = new Moralis.File(`${prodName}metadata.json`, {
        base64: Buffer.from(JSON.stringify(metadata)).toString("base64"),
      });
      await file2.saveIPFS();
      const metadataurl = file2.ipfs();
      // Interact with smart contract
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const response = await contract.methods
        .mint(metadataurl)
        .send({ from: user.get("ethAddress") });
      // Get token id
      const tokenId = response.events.Transfer.returnValues.tokenId;
      // Display alert
      alert(
        `Warrenty successfully minted. Contract address - ${contractAddress} and Token ID - ${tokenId}`
      );
    } catch (err) {
      console.error(err);
      alert("An error occured!");
    }
  })();
}
export default mint;