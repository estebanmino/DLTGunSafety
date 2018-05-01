import React, { Component } from 'react';
import './App.css';
import { gunABI, safetyContract, web3 } from './EthereumSetup';
import Safety from './components/Safety';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coinbase: null,
      checkedGunAddress: null,
      gunContract: null,
      gunOwnersHistory: null,
    }

    this.getCoinbase = this.getCoinbase.bind(this);
    this.createGun = this.createGun.bind(this);
    this.checkGun = this.checkGun.bind(this);
    this.retrievegunOwnersHistory = this.retrievegunOwnersHistory.bind(this)
    this.modifyGunOwner=this.modifyGunOwner.bind(this)
    this.modifyGunOwnerFromAddress=this.modifyGunOwnerFromAddress.bind(this)
  }


  componentWillMount() {
    this.getCoinbase()
  }
  

  getCoinbase() {
    web3.eth.getCoinbase(function(error, result) {
      this.setState({ coinbase: result });
    }.bind(this))
  }

  checkGun(_make, _model, _serialNumber) {
    safetyContract.checkGun(
      _make, _model, _serialNumber,
      {from: this.state.coinbase},
      function(error, result) {
        this.setState({
          checkedGunAddress: result,
          gunContract: web3.eth.contract(gunABI).at(String(result))        
          
        })
        console.log("checkGun", result)        
      }.bind(this)
    ) 
  }

  createGun(_make, _model, _serialNumber) {
    safetyContract.createGun(
      _make, _model, _serialNumber,
      {from: this.state.coinbase},
      function(error, result) {
        console.log("createGun", result)        
      }.bind(this)
    ) 
  }

  retrievegunOwnersHistory() {
    console.log("retrievegunOwnersHistory", this.state.checkedGunAddress)
    this.state.gunContract.getOwnersHistory(
      {from: this.state.coinbase},
      function(error, result) {
        this.setState({
          gunOwnersHistory: result
        })
        console.log("retrievegunOwnersHistory", result)        
      }.bind(this)
    ) 
  }

  modifyGunOwnerFromAddress(_gunAddress, _newOwnerAddress) {
    this.state.gunContract.modifyGunOwnerFromAddress(
      _gunAddress, _newOwnerAddress,
      {from: this.state.coinbase},
      function(error, result) {
        console.log("modifyGunOwnerFromAddress", result)        
      }.bind(this)
    ) 
  }

  modifyGunOwner(_make, _model, _serialNumber, _newOwnerAddress) {
    safetyContract.modifyGunOwner(
      _make, _model, _serialNumber, _newOwnerAddress,
      {from: this.state.coinbase},
      function(error, result) {
        console.log("modifyGunOwner", result)        
      }.bind(this)
    )    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DLT Gun Safety</h1>
        </header>
        <p className="App-intro">
          
        </p>
        <Safety 
          checkGun={this.checkGun}
          createGun={this.createGun}
          checkedGunAddress={this.state.checkedGunAddress}
          retrievegunOwnersHistory={this.retrievegunOwnersHistory}
          gunOwnersHistory={this.state.gunOwnersHistory}
          modifyGunOwnerFromAddress={this.modifyGunOwnerFromAddress}
          modifyGunOwner={this.modifyGunOwner}
          />
      </div>
    );
  }
}

export default App;
