# Overview
This is a user-friendly invoicing system created for the ConsenSys internship hackathon. Two businesses can use this invoicing system to create an audit trail of complex transactions between them that occur in the real world today (i.e. not crypto-related transactions e.g. wiring cash to a contractor). This system requires minimal technical knowledge to utilize properly and sensitive information is kept private.

#Assumptions
In the current implementation, both businesses are assumed to be comfortable downloading and using uPort, an iOS application that uses Ethereum to enable users to maintain their own identity. Only one business would actually be expected to use a separate accounting application to initially create the invoice. The counter-party would not need to use an accounting application at all to use this invoice system; the counter-party would only need a web browser, internet connection and uPort.

# Why this is useful
Businesses can use this invoice system to maintain a provably tamper-proof record of all their transactions, without actually revealing any sensitive information contained within their transactions (e.g. amount of payment, what payment was for, date of payment, etc.). Thus, at a later date, two businesses that transacted with each other can prove two things: 

1) Together both businesses can prove that what they each recorded in their books regarding all transactions between them matched.
2) Individually each business can prove that nothing contained within their own books related to their transactions with other businesses had been altered.

Note: this is not particularly useful in preventing fraud entirely since fraudulent businesses can still log fake information, can transact with fake accounts, and can selectively reveal some information and not all. This system’s main use case is to enable honest businesses to prove fair play.

# High level overview
Party A performed some service or delivered some good to Party B. Party B creates an invoice for Party A to fill out. Party A fills out the invoice and requests payment from Party B for some good/service. Party B then reviews and accepts the payment request, confirming payment was sent to Party A.

# High level technical overview
In this system, the actual transactions are done off-chain (e.g. paying rent in USD), but this invoice system enables both parties to log an audit-able record of all contextual data associated with each transaction on-chain. Functionally, Party B sends Party A a link to request payment for some good/service provided by Party A. Party A sends the request for payment, then Party B confirms payment. All data associated with each of these steps is hashed and stored on the Ethereum blockchain -- both parties use uPort to scan QR codes to do this.

Tools used for this project included:
uPort, node.js/npm, React, Create React App, Semantic-React, ethjs, Truffle, and Metamask.

Frontend: Two React apps

Backend: Ethereum smart contract

Steps required to recreate:

	1. Party B (the user of an accounting platform) deploys the smart contract initializing the smart contract with Party A’s uPort address as a parameter.

	2. Party A interacts with the smart contract via the application in invoice-request-ui.

	3. Party B interacts with the smart contract via the application in pay-invoice-ui.

More detailed steps on how to get this working in a local host are coming soon.