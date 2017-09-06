import React, { Component } from 'react';
import { Form, Header, Segment, Dropdown, TextArea, Button } from 'semantic-ui-react'
import './App.css';
import Eth from 'ethjs'
import { Connect } from 'uport-connect'
import { invoiceContractAddress } from '../../invoice-contract/invoiceContractDetails'
import { invoiceABI } from '../../invoice-contract/invoiceABI'

const spaceAboveRows = '20px'

const currencyOptions = [
  {
    text: 'USD',
    value: 'USD',
    key: 'USD'
  },
  {
    text: 'EUR',
    value: 'EUR',
    key: 'EUR'
  }
]

const invoiceTypeOptions = [
  {
    text: 'Wage',
    value: 'Wage',
    key: 'Wage'
  },
  {
    text: 'Supplies',
    value: 'Supplies',
    key: 'Supplies'
  },
  {
    text: 'Service',
    value: 'Service',
    key: 'Service'
  },
  {
    text: 'Rent',
    value: 'Rent',
    key: 'Rent'
  }
]

const dateInputDescription = (
  <span style={{fontStyle: 'italic'}}>
    (mm/dd/yyyy OR mm/dd/yyyy - mm/dd/yyyy)
  </span>
)

// INVOICE REQUEST FORM
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      quantity: '',
      rate: '',
      currency: '',
      invoiceType: '',
      descriptionOfRequest: '',
      auditProof: '',
      uportId: '',
      complete: false,
      userName: ''
    }

  }

  componentDidMount() {
    const uport = new Connect('MyDApp')
    const web3 = uport.getWeb3()
    const setUserName = (name) => this.setState({ userName: name })
    const setUPortId = (address) => this.setState({ uportId: address })
    uport.requestCredentials().then((credentials) => {
      console.log(credentials)
      setUserName(credentials.name)
      setUPortId(credentials.address)
  }, console.err)
  }

  
  render() {

    const uport = new Connect('MyDApp')
    const web3 = uport.getWeb3()
    const invContractUPort = web3.eth.contract(invoiceABI.abi).at(invoiceContractAddress)
    // web3.eth.getCoinbase((error, address) => {
    //     if (error) { throw error }
    //     console.log(address)
        
    // })
  
    // const auditProofs = [{}] // consider enabling multiple proofs in future
    
    const handleDateChange = (e) => this.setState({ date: e.target.value })
    const handleQuantityChange = (e) => this.setState({ quantity: e.target.value })
    const handleRateChange = (e) => this.setState({ rate: e.target.value })
    const handleCurrencyChange = (e, elm) => this.setState({ currency: elm.value })
    const handleInvoiceTypeChange = (e, elm) => this.setState({ invoiceType: elm.value })
    const handleDescriptionOfRequestChange = (e) => this.setState({ descriptionOfRequest: e.target.value })
    const handleAuditProofChange = (e) => this.setState({ auditProof: e.target.value })

    const handleSetComplete = () => this.setState({ complete: true })

    let finalJSONToStoreOffChain = {}
    let finalJSONHashToSendOnChain = ''

    const handleSubmit = () => {      
      finalJSONToStoreOffChain = this.state
      finalJSONHashToSendOnChain = Eth.keccak256(JSON.stringify(this.state))      
      console.log(finalJSONToStoreOffChain)
      console.log(finalJSONHashToSendOnChain)
      // uportConnect()

      invContractUPort.sendPaymentRequest(finalJSONHashToSendOnChain, function(error, txHash) {
        if (error) return
        console.log(txHash)    
        handleSetComplete()
      })
      
    }


    return (
      <div className="App-header">
        <Header as='h2' attached='top'>
          Invoice
        </Header>
        { !this.state.complete 
        ? <Segment attached>
          <h3 style={{ color: 'black' }}>Bill To: ConsenSys</h3>
          <h3 style={{ color: 'black' }}>From: {this.state.userName}</h3>      
        
          <Form>
            <Form.Field>
                 
              <label>Invoice Type</label>
              <Dropdown
                placeholder='Select an Invoice Type'
                selection
                options={invoiceTypeOptions} 
                onChange={handleInvoiceTypeChange}
              />

              <label style={{ paddingTop: spaceAboveRows }}>Date(s) Service or Good Delivered {dateInputDescription}</label>
              <input
                placeholder='Insert a date or date range'
                onChange={handleDateChange}
              />

              <label style={{ paddingTop: spaceAboveRows }}>Currency</label>
              <Dropdown
                placeholder='Select a currency' 
                selection
                options={currencyOptions}
                onChange={handleCurrencyChange}
              />  
            
              {/* consider just a label that says quantity with info icon that explains it for each invoice type */}
              <label style={{ paddingTop: spaceAboveRows }}>Quantity of Goods Delivered or Hours of Service</label>
              <input
                placeholder='Enter Quantity'
                onChange={handleQuantityChange}
              /> 
              
              {/* consider just a label that says rate with info icon that explains it for each invoice type*/}
              <label style={{ paddingTop: spaceAboveRows }}>Cost per Good Delivered or Hourly Rate of Service Provided</label>
              <input
                placeholder='Enter Rate'
                onChange={handleRateChange}
              />   

              <label style={{ paddingTop: spaceAboveRows }}>Description</label>
              <TextArea
                placeholder='Insert a description'
                onChange={handleDescriptionOfRequestChange} 
              />

              {/* provide an info icon with description for this */}
              <label style={{ paddingTop: spaceAboveRows }}>Audit Proof</label>
              <input
                placeholder='Provide proof of this transaction' 
                onChange={handleAuditProofChange}
              />  
              
              <div style={{ paddingTop: spaceAboveRows}}>
                <Button 
                  primary 
                  style={{ justifyContent: 'center'}}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>

            </Form.Field>
          </Form>
        </Segment>
        : <div> 
            <h1 style={{paddingTop: '300px'}}>Done!</h1>
            <Button 
                  secondary 
                >
                  Cancel the Payment Request
                </Button>
          </div>
        }
        
      </div>
    )
  }
}

export default App;