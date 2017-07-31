# invoice-system
User-friendly smart contract invoicing system created for the ConsenSys internship hackathon. This invoicing system can be used to create an audit trail of complex transactions between two parties. In this system, actual transactions are done off-chain, but this invoice system enables both parties to log an audit-able record of all data associated with the transaction on-chain. Functionally, Party A sends Party B a link to request payment for some good/service provided by Party A. Party B sends the request for payment, then Party A confirms payment. All data associated with each of these steps is hashed and stored on the Ethereum blockchain -- both parties use uPort to scan QR codes to do this.

I'll include detailed instructions on how to get this working on a local host in the middle of August.

Tools used for this project included:
Truffle, uPort, node.js/yarn/npm, React, Create React App, Semantic-React, and ethjs.
