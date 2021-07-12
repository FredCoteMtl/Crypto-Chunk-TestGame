# |   CRYPTO CHUNK    |
--------------------------
### Welcome to this sample project!

The goal of this project was to test some ways to store a bunch of information directly on the blockchain instead of using a p2p storage.

### Observations:
By using a mapping(blockLocation => BlockColor) it is easy to store all the information. The problem with this storage method, there is no way to extract all the modified blocks in a single shot without using a loop or making multiple calls to a get method.

### The conclusion is:
It is probably possible to store the information of a game map on the chain but it would need a way faster method to extract the information.

 ### How to start and test
-start by connecting to metamask on the Bsc Testnet
-click load chunk to see the blocks
-Add some blocks to the chunk
-Once a few blocks have been placed, click save progress to send the changes to the blockchain
-To start over click reset chunk

