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
//   const { isAuthenticated, logout, user } = useMoralis();
    const isAuthenticated = props.isAuthenticated;
    const setIsMinted = props.setIsMinted;
    const user = props.user;
    const prodId = props.prodId;
    const prodName = props.prodName;
    const warrentyPeriod = props.warrantyPeriod;
    const imgUrl = props.imgUrl;
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate metadata and save to IPFS
      const metadata = {
        prodId,
        prodName,
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
  };
//   useEffect(() => {
//     if (!isAuthenticated) router.replace("/");
//   }, [isAuthenticated]);
//   return (
//     <div className="flex w-screen h-screen items-center justify-center">
//       <form onSubmit={onSubmit}>
//         <div>
//           <input
//             type="text"
//             className="border-[1px] p-2 text-lg border-black w-full"
//             value={prodId}
//             placeholder="Product Id"
//             onChange={(e) => setProdId(e.target.value)}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             className="border-[1px] p-2 text-lg border-black w-full"
//             value={prodName}
//             placeholder="Product Name"
//             onChange={(e) => setProdName(e.target.value)}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             className="border-[1px] p-2 text-lg border-black w-full"
//             value={prodType}
//             placeholder="Product Type"
//             onChange={(e) => setProdType(e.target.value)}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             className="border-[1px] p-2 text-lg border-black w-full"
//             value={warrentyPeriod}
//             placeholder="Warrenty Period"
//             onChange={(e) => setWarrentyPeriod(e.target.value)}
//           />
//         </div>
//         <div className="mt-3">
//           <input
//             type="file"
//             className="border-[1px] p-2 text-lg border-black"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//         </div>
//         <button
//           type="submit"
//           className="mt-5 w-full p-5 bg-green-700 text-white text-lg rounded-xl animate-pulse"
//         >
//           Mint now!
//         </button>
//         <button
//           onClick={logout}
//           className="mt-5 w-full p-5 bg-red-700 text-white text-lg rounded-xl"
//         >
//           Logout
//         </button>
//       </form>
//     </div>
//   );
}
export default mint;