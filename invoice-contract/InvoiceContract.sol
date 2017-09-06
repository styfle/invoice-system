pragma solidity ^0.4.11;

/* 

Party A has performed a service or provided a product for/to
Party B and Party A wants to get paid for that service or product. 
Party B sends Party A a link to utilize this smart contract.

After creation, this contract can handle all interactions
that flow one-directionally in the following pattern: 
Party B sending payment to Party A for some good/service.

Assumptions:

    1. Party B is using an accounting platform and has technical
    knowledge of Ethereum to know what a public address is
    2. Party A and B are ok with using uPort  
    3. Party A knows nothing about Ethereum or what a public address is
    4. Party A and Party B have ported each other and so
    Party B knows what Party A's public address is

*/

contract InvoiceContract {
    
    address private partyA;
    address private partyB = msg.sender;

    struct Invoice {
        bytes32 invoiceHash;
        bool paymentRequestSent;
        bool paymentSent;
    }

    Invoice[] private invoices;
    uint private transactionNum;

    // Party A has sent the request for payment to Party B
    event sentPaymentRequest (
        uint transactionNum,
        bytes32 invoiceHash
    );

    // Party B has paid Party A
    event sentPayment (
        uint transactionNum,
        bytes32 invoiceHash
    );

    // Either Party A or B can cancel a payment request before
    // payment has been sent, but not after
    event paymentRequestCancelled (
        uint transactionNum
    );

    // sets modifiers for who can perform certain actions.
    // party B is the one deploying the contract via party B's
    // accounting platform. party B knows party A's public address
    // because of assumption that both have ported each other
    function InvoiceContract(address _partyA) {
        partyA = _partyA;
    }

    // only party A can send payment request
    modifier onlyByPartyA(address _partyA) {
        require(msg.sender == _partyA);
        _;
    }

    // only party B can send payment
    modifier onlyByPartyB(address _partyB) {
        require(msg.sender == _partyB);
        _;
    }

    // only party A or B can revert back payment request
    modifier onlyByPartyAOrB(address _partyA, address _partyB) {
        require(msg.sender == _partyA || msg.sender == _partyB);
        _;
    }

    // Party A sends a request for payment to Party B
    function sendPaymentRequest(bytes32 _invoiceHash) onlyByPartyA(partyA) {
        invoices.push(Invoice({
			invoiceHash: _invoiceHash,
			paymentRequestSent: true,
            paymentSent: false
		}));
        sentPaymentRequest(transactionNum, _invoiceHash);
        transactionNum++; // only goes up after payment request sent; never goes down
    }

    // Party B sends the log confirming payment to Party A
    // does not currently provide functionality to send an actual payment
    function sendPaymentLog(uint _transactionNum, bytes32 _invoiceHash) onlyByPartyB(partyB) {
        invoices[_transactionNum].invoiceHash = _invoiceHash;
        invoices[_transactionNum].paymentSent = true;
        sentPayment(_transactionNum, _invoiceHash);
    }

    // only Party A or B can cancel the payment request BEFORE the payment
    // has actually been sent
    function cancelPaymentRequest(uint _transactionNum) onlyByPartyAOrB(partyA, partyB) {
        require(invoices[_transactionNum].paymentSent == false);
        invoices[_transactionNum].paymentRequestSent = false;
        paymentRequestCancelled(_transactionNum);
    }

}