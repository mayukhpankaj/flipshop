# flipshop
A decentralised E-commerce platform with NFT based warranty

[demo- video](https://www.youtube.com/watch?v=UqyTMuUQdnE)

### Currently, the validity of the warranty is determined by some physical receipt or warranty card. This poses several issues:

- The warranty document is easily falsifiable.
- The warranty document is not necessarily standard among different sellers.
A bad acting authorized dealer could issue warranty cards for expired products "under the table".

### Why NFT ?

-   NFTs cannot be falsified.
-   A user can buy a product whose warranty will be issued as a standard NFT to his wallet address. This NFT can later be claimed from the claim page of the website.
- No thirdparty Verifier / Processor

## Solution 
-   For Issuing warranty, We can use a NFT with Product details like product_id , purchase date, for User’s wallet address.

-   For this, we made a API which saves Image & json files to IPFS and call smart contract’s Mint function.

-   We call our Mint function after user has purchased the product.

-   For Claiming Warranty, we list all the NFT in user’s wallet which were minted with our Contract address , for example if Token symbol === “FSNFT”

- Warranty can be claimed for the listed NFT on claim page , If the warranty period has not expired. for example, difference in Purchase Date  -  Current Date < Warranty period

##  Architecture
**![](https://lh5.googleusercontent.com/uyGT0soTOP8RxN25twXJYy8XOtlaUryEeywdVGXW47FKB6hbKx4ll4w3NM4hh15W0DLFB8b-pxVpkChmWGQVh9IbQoI-9g3a_1Du6gs6Vi5g5q40VK1uAb-8UevHYEdgUofkhq5elO7Hyc1rvSi19wWMXQ)**

<img src="https://lh5.googleusercontent.com/7nC-rd4PCfVdFOWhu9sqcZFSiy55EHuqwaBuyHG-LdV8K93QVxPbDkqp001llwxCWsTc5VdlXWdC7qw9moIHuq0wUqpRqPWMB0XVONNigXp5t94YMJ7NNLkHmbZ30-jOoo4_Jbr8WCzhBkNlGTbJ9w" height="500px "> 


## Techstack 

- Frontend
	- ReactJS
	- React Bootstrap
- Backend 
	-  NodeJS
	-  Netlify
	- Mongo DB
- Blockchain
	-  IPFS
	- Moralis
	- Solidity
	- Polygon Chain
  
 
 ![techstack](https://user-images.githubusercontent.com/40158577/182040993-90ec45d7-3a66-482c-8e3f-55635ac6202d.png)
 
 ## Screenshots
 
 ![image](https://user-images.githubusercontent.com/40158577/182041085-bec8615a-5f82-4c96-9410-3fcd1b13ba5e.png)
 ![image](https://user-images.githubusercontent.com/40158577/182041102-4d60dc8c-4850-496c-9f21-70ff71c724d1.png)
 ![image](https://user-images.githubusercontent.com/40158577/182041122-4851597a-c317-4334-8930-6c7ba0346e7a.png)




 
 
 
 


	
