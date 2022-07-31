# flipshop
A decentralised E-commerce platform with NFT based warranty

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

<img src="https://lh5.googleusercontent.com/7nC-rd4PCfVdFOWhu9sqcZFSiy55EHuqwaBuyHG-LdV8K93QVxPbDkqp001llwxCWsTc5VdlXWdC7qw9moIHuq0wUqpRqPWMB0XVONNigXp5t94YMJ7NNLkHmbZ30-jOoo4_Jbr8WCzhBkNlGTbJ9w" height="500px "> 
