import React, { Component } from 'react';
import { Form, Header, Segment, Dropdown, TextArea, Button } from 'semantic-ui-react'
import './App.css';
import Eth from 'ethjs'
import { Connect } from 'uport-connect'
import { invoiceContractAddress } from '../../invoice-contract/invoiceContractDetails'
import { invoiceABI } from '../../invoice-contract/invoiceABI'

const spaceAboveRows = '20px'

var uportAdd = '0xa9a2849e7930faac3d81a7ded461df6527fdd604' // ropsten
var partyAAddress = '0x639cfc513041e4f8fdcd41a38f7c38f85108aa70'

// var ETHEREUM_CLIENT = new Eth(new Eth.HttpProvider('http://localhost:8545'))
// var ETHEREUM_CLIENT = new Eth(new Eth.HttpProvider('https://ropsten.infura.io'))
// var invoiceContractAddres = '0x65b76ca91f6ec94b3eb8f2e750065e2a9cad712f'
// var invoiceContractAddres = '0xaa4f722cfdb1099ef2550e71fbc1d2cc868683d1'
// var invoiceContractAddres ='0x692a70d2e424a56d2c6c27aa97d1a86395877b3a'
// var invoiceContractAddress = '0x9109223260a05ed3e2bdb85d307527c7bb393977' // on ropsten
var invoiceContractAddress = '0xad6a4c4e997bf9dff0879ee5907a2a572090d6cd' // IMPORTANT

// var invoiceContract = ETHEREUM_CLIENT.contract(invoiceABI.abi).at(invoiceContractAddress)

// INVOICE REQUEST FORM
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uportId: '',
      complete: false,
      transactionNumber: '',
      enteredTransactionNumber: false,
      auditProof: ''
    }

  }

  
  render() {

    const uport = new Connect('MyDApp')
    const web3 = uport.getWeb3()
    const invContractUPort = web3.eth.contract(invoiceABI.abi).at(invoiceContractAddress)
    // web3.eth.getCoinbase((error, address) => {
    //     if (error) { throw error }
    //     console.log(address)
        
    // })
    

    const handleTransactionNumberChange = (e) => {this.setState({ transactionNumber: e.target.value }) }
    const handleTransactionNumberSubmit = (e) => { this.setState({ enteredTransactionNumber: true })} // then get transaction info from private data store
    const handleAuditProofChange = (e) => this.setState({ auditProof: e.target.value })

    let finalJSONToStoreOffChain = {}
    let finalJSONHashToSendOnChain = ''

    const handleSubmit = () => {
      finalJSONToStoreOffChain = this.state.auditProof
      finalJSONHashToSendOnChain = Eth.keccak256(JSON.stringify(finalJSONToStoreOffChain))
      const transactionNumberToSend = this.state.transactionNumber

      invContractUPort.sendPaymentLog(transactionNumberToSend, finalJSONHashToSendOnChain).then(txHash => {
        console.log(txHash)
      })
      
    }


    return (
      <div className="App-header">
        <Header as='h2' attached='top'>
          Record Invoice Payment
        </Header>
        { !this.state.complete
        ? <Segment attached>
          { !this.state.enteredTransactionNumber
          ? <Form>
              
              <Form.Field>
              
               <label>Transaction Number</label>
                <input
                  placeholder='Input the transaction number'
                  onChange={handleTransactionNumberChange}
                />      
                <span style={{paddingTop: '50px'}}>
                <Button 
                  primary 
                  style={{ justifyContent: 'center'}}
                  onClick={handleTransactionNumberSubmit}
                >
                  Submit
                </Button>
                </span>

                   
                
              </Form.Field>            
          
            </Form>

          : <div>            
              <h2 style={{ color: 'black' }}> Review Transaction Details </h2>
              <h4 style={{ fontStyle: 'italic', color: 'black' }}>...Transaction Details From Off-Chain Data-Store...</h4>            
              
              <Form>
              <Form.Field>
              <label style={{ paddingTop: spaceAboveRows }}>Audit Proof</label>
                <input
                  placeholder='Provide proof of this transaction' 
                  onChange={handleAuditProofChange}
                />  
              </Form.Field>
                </Form>
              
              <span>
                <Button 
                  primary                   
                >
                  Confirm Payment Was Sent
                </Button>

                <Button 
                  secondary 
                >
                  Cancel the Payment Request
                </Button>

              </span>

            </div>
          }
          </Segment>
        : <h2 style={{paddingTop: '500px'}}>Done!</h2>
        }        
      </div>
    )
  }
}


export default App;